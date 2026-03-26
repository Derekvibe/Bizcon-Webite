// Code.gs — Google Apps Script Web App
// Deploy as: Execute as "Me", Access "Anyone"
// Copy the Web App URL into your server .env as SHEETS_WEBAPP_URL

const SHEET_NAME = "Registrations";
const CONFIG_SHEET_NAME = "Config";
const SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_TOKEN"; // Must match SHEETS_SECRET in .env
const TOTAL_SEATS = 250;

// ─── Entry point ──────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");

    if (body.secret !== SHARED_SECRET) {
      return respond({ ok: false, error: "Unauthorized" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateRegistrationsSheet(ss);
    const configSheet = getOrCreateConfigSheet(ss);

    const action = body.action;

    // ── ACTION: Get current seats left ───────────────────────────────────────
    if (action === "getSeatsLeft") {
      const seatsLeft = configSheet.getRange("B1").getValue();
      return respond({ ok: true, seatsLeft: Number(seatsLeft) });
    }

    // ── ACTION: Append new registration ──────────────────────────────────────
    if (action === "appendRegistration") {
      sheet.appendRow([
        new Date().toISOString(),
        body.name || "",
        body.email || "",
        body.phone || "",
        body.business || "",
        body.reference || "",
        "",         // package — filled on markPaid
        "",         // amount  — filled on markPaid
        body.status || "PENDING",
        ""          // paidAt
      ]);
      return respond({ ok: true });
    }

    // ── ACTION: Mark row as PAID + decrement seat count ───────────────────────
    if (action === "markPaid") {
      const reference = body.reference;
      if (!reference) return respond({ ok: false, error: "Missing reference" });

      const data = sheet.getDataRange().getValues();

      // Column indexes (0-based):
      // 0=Timestamp, 1=Name, 2=Email, 3=Phone, 4=Business
      // 5=Reference, 6=Package, 7=Amount, 8=Status, 9=PaidAt

      for (let i = 1; i < data.length; i++) {
        if (data[i][5] === reference) {

          // Guard: skip if already PAID — prevents double-decrement
          // (webhook fires AND user lands on success page — both call markPaid)
          if (data[i][8] === "PAID") {
            return respond({ ok: true, alreadyPaid: true });
          }

          const row = i + 1; // sheet rows are 1-based
          sheet.getRange(row, 7).setValue(body.pkg || "");
          sheet.getRange(row, 8).setValue(body.amountNaira || "");
          sheet.getRange(row, 9).setValue("PAID");
          sheet.getRange(row, 10).setValue(body.paidAt || new Date().toISOString());

          // Decrement seats — never go below 0
          const currentSeats = Number(configSheet.getRange("B1").getValue());
          const newSeats = Math.max(0, currentSeats - 1);
          configSheet.getRange("B1").setValue(newSeats);

          return respond({ ok: true, seatsLeft: newSeats });
        }
      }

      return respond({ ok: false, error: "Reference not found in sheet" });
    }

    return respond({ ok: false, error: "Unknown action" });

  } catch (err) {
    return respond({ ok: false, error: String(err) });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getOrCreateRegistrationsSheet(ss) {
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Timestamp", "Name", "Email", "Phone", "Business",
      "Reference", "Package", "Amount (₦)", "Status", "Paid At"
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateConfigSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG_SHEET_NAME);
    sheet.getRange("A1").setValue("seatsLeft");
    sheet.getRange("B1").setValue(TOTAL_SEATS); // Start at 250
  }
  return sheet;
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}