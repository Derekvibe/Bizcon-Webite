import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(var(--background))" }}>
      <div
        className="rounded-2xl p-10 max-w-md w-full text-center"
        style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-elevated)" }}
      >
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
          Your payment was successful and your seat at BIZCON 2026 is confirmed.
          Check your email for your ticket, receipt, and full event details from Tix Africa.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
        >
          Back to Home <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}