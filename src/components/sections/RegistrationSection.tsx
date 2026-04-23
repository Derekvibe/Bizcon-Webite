import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/config";

type Status = "idle" | "loading" | "error" | "success";

export default function RegistrationSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    business: "",
    package: "bizzer" // Default to bizzer
  });
  const [seatsLeft, setSeatsLeft] = useState<number>(siteConfig.currentEvent.seatsLeft);
  const navigate = useNavigate();

  // Fetch live seat count from backend on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/seats`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && typeof data.seatsLeft === "number") {
          setSeatsLeft(data.seatsLeft);
        }
      })
      .catch(() => {
        // If fetch fails, keep the default from siteConfig — no crash
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pkg: siteConfig.pricing[form.package as keyof typeof siteConfig.pricing].label,
          amountNaira: siteConfig.pricing[form.package as keyof typeof siteConfig.pricing].price
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("success");
        // Redirect after a short delay so they can see the message
        setTimeout(() => {
          window.location.href = siteConfig.tixLink;
        }, 3000);
      } else {
        console.error("Registration error from backend:", data.error || "Unknown error");
        setStatus("error");
      }
    } catch (err) {
      console.error("Registration fetch failed:", err);
      setStatus("error");
    }
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
              style={{ fontFamily: "'Poppins', serif" }}
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

            {/* Urgency — now shows live seat count */}
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: "hsl(var(--gold)/0.08)", border: "1px solid hsl(var(--gold)/0.25)" }}
            >
              <span className="pulse-dot shrink-0" />
              <p className="text-sm text-foreground/80">
                Only <strong className="text-gold">{seatsLeft} seats</strong> left.
                Registration closes 2 weeks before the event.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-elevated)" }}
          >
            <h3 className="text-xl font-bold text-navy mb-1" style={{ fontFamily: "'Poppins', serif" }}>
              Registration Form
            </h3>
            <p className="text-muted-foreground text-sm mb-7">
              Fill in your details to secure your spot.
            </p>

            {status === "success" ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3">Registration Successful!</h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for registering, <strong className="text-navy">{form.name}</strong>. 
                  We're redirecting you to the payment page to secure your <strong className="text-gold">{siteConfig.pricing[form.package as keyof typeof siteConfig.pricing].label}</strong> spot.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-gold">
                  <Loader2 size={16} className="animate-spin" />
                  Redirecting to Tix Africa...
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">
                      Full Name *
                    </label>
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
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">
                      Email Address *
                    </label>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">
                      Phone Number *
                    </label>
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
                    <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">
                    Select Ticket Package *
                  </label>
                  <select
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    {Object.entries(siteConfig.pricing).map(([key, pkg]) => (
                      <option key={key} value={key}>
                        {pkg.label} — ₦{pkg.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/5 p-3 rounded-lg border border-destructive/10">
                    <AlertCircle size={15} />
                    <span>Something went wrong. Please try again or contact support.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || seatsLeft === 0}
                  className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.01] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                    color: "hsl(var(--navy))",
                  }}
                >
                  {seatsLeft === 0 ? (
                    "Registration Closed — Sold Out"
                  ) : status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing your registration...
                    </>
                  ) : (
                    <>
                      Continue to Payment <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}