import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";

type VerifyStatus = "loading" | "success" | "failed" | "error";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("loading");
  const [details, setDetails] = useState<{ package?: string; amount?: number } | null>(null);

  useEffect(() => {
    if (!reference) {
      setVerifyStatus("error");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/paystack/verify?reference=${reference}`
        );
        const data = await res.json();

        if (data.ok && data.paid) {
          setVerifyStatus("success");
          setDetails({ package: data.package, amount: data.amount });
        } else {
          setVerifyStatus("failed");
        }
      } catch {
        setVerifyStatus("error");
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(var(--background))" }}>
      <div
        className="rounded-2xl p-10 max-w-md w-full text-center"
        style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-elevated)" }}
      >
        {verifyStatus === "loading" && (
          <>
            <Loader2 size={48} className="text-gold animate-spin mx-auto mb-5" />
            <h2 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: "'Poppins', serif" }}>
              Verifying Payment...
            </h2>
            <p className="text-muted-foreground text-sm">Please wait while we confirm your payment.</p>
          </>
        )}

        {verifyStatus === "success" && (
          <>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "hsl(var(--gold)/0.12)" }}
            >
              <CheckCircle2 size={40} className="text-gold" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: "'Poppins', serif" }}>
              You're In! 🎉
            </h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Your payment was successful and your seat at BIZCON 2025 is confirmed.
              Check your email for a confirmation and full event details.
            </p>
            {details?.amount && (
              <div
                className="rounded-xl p-4 mb-6 text-sm"
                style={{ background: "hsl(var(--gold)/0.07)", border: "1px solid hsl(var(--gold)/0.2)" }}
              >
                <p className="text-muted-foreground">Reference: <span className="font-mono text-xs text-foreground">{reference}</span></p>
              </div>
            )}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
            >
              Back to Home <ArrowRight size={14} />
            </Link>
          </>
        )}

        {verifyStatus === "failed" && (
          <>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "hsl(var(--destructive)/0.1)" }}
            >
              <XCircle size={40} className="text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: "'Poppins', serif" }}>
              Payment Not Confirmed
            </h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              We could not confirm your payment. If you were charged, please contact us with
              your reference number below.
            </p>
            <p className="font-mono text-xs text-foreground mb-6 break-all">{reference}</p>
            <Link
              to="/#register"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
            >
              Try Again <ArrowRight size={14} />
            </Link>
          </>
        )}

        {verifyStatus === "error" && (
          <>
            <XCircle size={48} className="text-destructive mx-auto mb-5" />
            <h2 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: "'Poppins', serif" }}>
              Something Went Wrong
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              No payment reference found. Please go back and try again.
            </p>
            <Link to="/#register" className="text-gold text-sm font-semibold hover:underline">
              Back to Registration
            </Link>
          </>
        )}
      </div>
    </div>
  );
}