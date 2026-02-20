import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/config";

type Status = "idle" | "loading" | "success" | "error";

export default function RegistrationSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  return (
    <section id="register" className="section-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Left: Copy */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">Register Now</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-navy mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reserve Your
              <br />
              <span className="gradient-gold-text">Seat Today</span>
            </h2>
            <span className="gold-line mb-8 block" />

            <ul className="space-y-4 mb-10">
              {[
                "Full-day access to all sessions & workshops",
                "Premium networking opportunities",
                "BIZCON 2025 resource kit & workbook",
                "Access to exclusive alumni community",
                "Post-event strategy call (first 50 registrants)",
                "Certificate of participation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* Urgency */}
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: "hsl(var(--gold)/0.08)", border: "1px solid hsl(var(--gold)/0.25)" }}
            >
              <span className="pulse-dot shrink-0" />
              <p className="text-sm text-foreground/80">
                Only <strong className="text-gold">{siteConfig.currentEvent.seatsLeft} seats</strong> left.
                Registration closes 2 weeks before the event.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-elevated)" }}
          >
            {status === "success" ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "hsl(var(--gold)/0.12)" }}
                >
                  <CheckCircle2 size={32} className="text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  You're Registered!
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Welcome to BIZCON 2025. Check your email for confirmation details. We'll be in touch soon.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
                >
                  Back to Home <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-navy mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Registration Form
                </h3>
                <p className="text-muted-foreground text-sm mb-7">
                  Fill in your details to secure your spot.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Chioma Eze"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="chioma@yourbusiness.com"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Business Name</label>
                    <input
                      type="text"
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle size={15} />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.01] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                      color: "hsl(var(--navy))",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Secure My Seat <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
