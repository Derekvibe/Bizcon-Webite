// server/index.js
import express from "express";
import axios from "axios";
import cors from "cors";
import crypto from "crypto";
import "dotenv/config";

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// ─── Constants ────────────────────────────────────────────────────────────────
const PRICES = {
  REGULAR: 15000,
  VIP: 50000,
};

// Store references in memory so we can validate amounts on initialization
// In production, replace this with a real DB (e.g. Supabase, PlanetScale, MongoDB)
const pendingRegistrations = new Map();

function generateReference() {
  return `REG_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

function toKobo(naira) {
  return naira * 100;
}

// ─── Helper: call Google Apps Script ─────────────────────────────────────────
async function callSheet(action, payload) {
  const res = await axios.post(process.env.SHEETS_WEBAPP_URL, {
    secret: process.env.SHEETS_SECRET,
    action,
    ...payload,
  });
  return res.data;
}

// ─── ROUTE 0: Live seat count ─────────────────────────────────────────────────
// Called by React on component mount to show live remaining seats.
app.get("/api/seats", async (req, res) => {
  try {
    const result = await callSheet("getSeatsLeft", {});
    return res.json({ ok: true, seatsLeft: result.seatsLeft ?? 250 });
  } catch (err) {
    return res.json({ ok: true, seatsLeft: 250 });
  }
});

// ─── ROUTE 1: Register ────────────────────────────────────────────────────────
// Called by the registration form.
// Saves the user to Google Sheets with status=PENDING and returns a reference.
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, phone, business } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({
          ok: false,
          error: "Missing required fields: name, email, phone",
        });
    }

    const reference = generateReference();

    // Save to Google Sheet as PENDING
    await callSheet("appendRegistration", {
      name,
      email,
      phone,
      business: business || "",
      reference,
      status: "PENDING",
    });

    // Store in memory for validation later
    pendingRegistrations.set(reference, { name, email, phone, business });

    return res.json({ ok: true, reference });
  } catch (err) {
    console.error("Register error:", err?.response?.data ?? err.message);
    return res
      .status(500)
      .json({ ok: false, error: "Registration failed. Please try again." });
  }
});

// ─── ROUTE 2: Initialize Paystack ─────────────────────────────────────────────
// Called from the Payment page when user clicks "Pay".
// Returns a Paystack authorization_url to redirect the user to.
app.post("/api/paystack/initialize", async (req, res) => {
  try {
    const { reference, email, pkg, amountNaira } = req.body;

    if (!reference || !email || !pkg) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing reference, email, or pkg" });
    }

    // Validate the package + amount on the server (never trust client-side amounts)
    const expectedAmount = PRICES[pkg];
    if (!expectedAmount) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid package. Use REGULAR or VIP." });
    }
    if (amountNaira !== expectedAmount) {
      return res.status(400).json({ ok: false, error: "Amount mismatch." });
    }

    const registration = pendingRegistrations.get(reference);
    // NOTE: If server restarts, the in-memory map is cleared.
    // If you need resilience across restarts, store in a DB instead.

    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: toKobo(expectedAmount),
        reference,
        callback_url: `${process.env.FRONTEND_URL}/payment-success`,
        metadata: {
          pkg,
          amountNaira: expectedAmount,
          name: registration?.name ?? "",
          phone: registration?.phone ?? "",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const { authorization_url } = paystackRes.data.data;
    return res.json({ ok: true, authorization_url });
  } catch (err) {
    console.error("Initialize error:", err?.response?.data ?? err.message);
    return res
      .status(500)
      .json({ ok: false, error: "Could not initialize Paystack transaction." });
  }
});

// ─── ROUTE 3: Verify Payment ───────────────────────────────────────────────────
// Called by the success page after Paystack redirects back.
app.get("/api/paystack/verify", async (req, res) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ ok: false, error: "Missing reference" });
    }

    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      },
    );

    const data = verifyRes.data.data;
    const paid = data.status === "success";

    // Always verify the amount matches expected package (in kobo)
    const expectedKobo = toKobo(PRICES[data.metadata?.pkg]);
    if (data.amount !== expectedKobo) {
      return res.json({ ok: true, paid: false, error: "Amount mismatch" });
    }

    if (paid) {
      // Update sheet row to PAID
      await callSheet("markPaid", {
        reference,
        paidAt: new Date().toISOString(),
      });
      pendingRegistrations.delete(reference);
    }

    return res.json({
      ok: true,
      paid,
      package: data.metadata?.pkg,
      amount: data.amount / 100,
    });
  } catch (err) {
    console.error("Verify error:", err?.response?.data ?? err.message);
    return res.status(500).json({ ok: false, error: "Verification failed." });
  }
});

// ─── ROUTE 4: Paystack Webhook ────────────────────────────────────────────────
// Paystack will call this automatically when payment succeeds.
app.post(
  "/api/paystack/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-paystack-signature"];
      const hash = crypto
        .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
        .update(req.body)
        .digest("hex");

      if (hash !== signature) {
        return res.sendStatus(401);
      }

      const event = JSON.parse(req.body.toString("utf-8"));

      if (event.event === "charge.success") {
        const reference = event.data.reference;
        await callSheet("markPaid", {
          reference,
          paidAt: new Date().toISOString(),
        });
      }

      return res.sendStatus(200);
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.sendStatus(200);
    }
  },
);

// ─── ROUTE 5: Tix Africa Webhook ────────────────────────────────────────────────
// Tix Africa will call this when a ticket purchase is complete.
app.post("/api/tix/webhook", async (req, res) => {
  try {
    const payload = req.body;
    console.log("Tix Webhook Received:", JSON.stringify(payload, null, 2));

    const customerName = 
      payload?.data?.customer?.name || payload?.customer?.name || 
      payload?.data?.buyer?.name || payload?.buyer?.name || 
      payload?.name || 
      (payload?.data?.first_name ? `${payload?.data?.first_name} ${payload?.data?.last_name || ''}`.trim() : "Tix Attendee");
      
    const customerEmail = 
      payload?.data?.customer?.email || payload?.customer?.email || 
      payload?.data?.buyer?.email || payload?.buyer?.email || 
      payload?.email || "no-email@tix.africa";

    const customerPhone = 
      payload?.data?.customer?.phone || payload?.customer?.phone || 
      payload?.data?.buyer?.phone || payload?.buyer?.phone || 
      payload?.phone || "N/A";

    const ticketName = 
      payload?.data?.ticket?.name || payload?.ticket?.name || 
      payload?.data?.ticket_type || payload?.ticket_type || "Tix Ticket";

    const amount = 
      payload?.data?.amount || payload?.amount || 
      payload?.data?.total_paid || payload?.total_paid || 0;

    const reference = 
      payload?.data?.reference || payload?.reference || `TIX_${Date.now()}`;

    // Push straight to Google Sheets as PAID since Tix only sends webhook for successful orders
    await callSheet("appendRegistration", {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      business: `[Tix] ${ticketName}`,
      reference,
      pkg: ticketName,           // Explicitly send ticket name as package
      amountNaira: amount,      // Explicitly send amount
      status: "PAID",
      paidAt: new Date().toISOString()
    });

    return res.status(200).send("Tix webhook processed");
  } catch (err) {
    console.error("Tix Webhook Error:", err.message);
    return res.status(200).send("Error processed");
  }
});

// ─── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
