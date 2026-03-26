import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Crown, Loader2, ArrowRight, User, Mail, Phone, Briefcase } from "lucide-react";
import { siteConfig } from "@/data/config";

type Package = "REGULAR" | "VIP";

const PACKAGES = {
  REGULAR: { 
    label: siteConfig.pricing.regular.label, 
    price: siteConfig.pricing.regular.price, 
    perks: ["Full-day access", "Resource kit", "Certificate", "Alumni community"] 
  },
  VIP: { 
    label: siteConfig.pricing.vip.label, 
    price: siteConfig.pricing.vip.price, 
    perks: ["Everything in Regular", "Priority seating", "1-on-1 strategy session", "VIP networking dinner", "Exclusive speaker access"] 
  },
};

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    reference: string;
    name: string;
    email: string;
    phone: string;
    business?: string;
  } | null;

  const [selectedPkg, setSelectedPkg] = useState<Package>("REGULAR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Guard: if user lands here directly without form state, redirect back
  if (!state?.reference) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No registration found. Please fill the form first.</p>
          <button
            onClick={() => navigate("/#register")}
            className="text-gold font-semibold hover:underline"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  const handlePay = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: state.reference,
          email: state.email,
          pkg: selectedPkg,
          amountNaira: PACKAGES[selectedPkg].price,
        }),
      });

      const data = await res.json();

      if (data.ok && data.authorization_url) {
        // Redirect user to Paystack checkout
        window.location.href = data.authorization_url;
      } else {
        setError(data.error || "Could not initialize payment. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-2">Almost There</p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Poppins', serif" }}>
            Choose Your <span className="gradient-gold-text">Package</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-3">
            Select a package and complete your payment to confirm your seat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: Package Selection */}
          <div className="lg:col-span-3 space-y-4">
            {(Object.keys(PACKAGES) as Package[]).map((pkg) => {
              const info = PACKAGES[pkg];
              const isSelected = selectedPkg === pkg;
              return (
                <button
                  key={pkg}
                  onClick={() => setSelectedPkg(pkg)}
                  className="w-full text-left rounded-2xl p-6 transition-all duration-200 border-2"
                  style={{
                    background: isSelected ? "hsl(var(--gold)/0.07)" : "hsl(var(--card))",
                    borderColor: isSelected ? "hsl(var(--gold))" : "hsl(var(--border))",
                    boxShadow: isSelected ? "0 0 0 4px hsl(var(--gold)/0.1)" : "var(--shadow-elevated)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {pkg === "VIP" ? (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(var(--gold)/0.15)" }}
                        >
                          <Crown size={18} className="text-gold" />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(var(--gold)/0.1)" }}
                        >
                          <CheckCircle2 size={18} className="text-gold" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-navy text-base" style={{ fontFamily: "'Poppins', serif" }}>
                          {info.label}
                        </p>
                        {pkg === "VIP" && (
                          <span className="text-xs text-gold font-semibold tracking-wide">RECOMMENDED</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-navy" style={{ fontFamily: "'Poppins', serif" }}>
                        {formatNaira(info.price)}
                      </p>
                      <p className="text-xs text-muted-foreground">one-time</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {info.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={13} className="text-gold shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          {/* Right: Summary + Pay */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-6 sticky top-6"
              style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-elevated)" }}
            >
              <h3 className="font-bold text-navy mb-5 text-base" style={{ fontFamily: "'Poppins', serif" }}>
                Your Details
              </h3>

              {/* User info from form */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <User size={14} className="text-gold shrink-0" />
                  <span className="text-foreground font-medium">{state.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={14} className="text-gold shrink-0" />
                  <span className="text-muted-foreground break-all">{state.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={14} className="text-gold shrink-0" />
                  <span className="text-muted-foreground">{state.phone}</span>
                </div>
                {state.business && (
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase size={14} className="text-gold shrink-0" />
                    <span className="text-muted-foreground">{state.business}</span>
                  </div>
                )}
              </div>

              <div
                className="h-px mb-5"
                style={{ background: "hsl(var(--border))" }}
              />

              {/* Order summary */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-semibold text-foreground">{PACKAGES[selectedPkg].label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-navy text-base">{formatNaira(PACKAGES[selectedPkg].price)}</span>
                </div>
              </div>

              {error && (
                <p className="text-destructive text-xs mb-4">{error}</p>
              )}

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                  color: "hsl(var(--navy))",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Redirecting to Paystack...
                  </>
                ) : (
                  <>
                    Pay {formatNaira(PACKAGES[selectedPkg].price)} <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                Secured by Paystack. Your payment is encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}