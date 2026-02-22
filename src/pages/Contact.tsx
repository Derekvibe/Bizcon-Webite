import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/config";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Page Hero */}
        <section
          className="relative pt-32 pb-20 overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{ background: "radial-gradient(ellipse at 50% 60%, hsl(var(--gold)), transparent 60%)" }}
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">Get in Touch</p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Poppins', serif" }}
            >
              Contact Us
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Questions about BIZCON 2025? Sponsorship opportunities? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="section-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-5xl mx-auto">
              {/* Left: Info */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">Reach Us At</p>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--gold)/0.1)" }}>
                        <Mail size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-semibold text-navy hover:text-gold transition-colors">
                          {siteConfig.contact.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--gold)/0.1)" }}>
                        <Phone size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Phone</p>
                        <a href={`tel:${siteConfig.contact.phone}`} className="text-sm font-semibold text-navy hover:text-gold transition-colors">
                          {siteConfig.contact.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--gold)/0.1)" }}>
                        <MapPin size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Location</p>
                        <p className="text-sm font-semibold text-navy">{siteConfig.contact.address}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Social */}
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">Follow BIZCON</p>
                  <div className="flex gap-3">
                    {[
                      { Icon: Instagram, href: siteConfig.contact.instagram, label: "Instagram" },
                      { Icon: Twitter, href: siteConfig.contact.twitter, label: "Twitter" },
                      { Icon: Linkedin, href: siteConfig.contact.linkedin, label: "LinkedIn" },
                      { Icon: Facebook, href: siteConfig.contact.facebook, label: "Facebook" },
                    ].map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-gold hover:text-gold text-muted-foreground transition-all duration-200"
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Sponsor box */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: "hsl(var(--section-alt))", border: "1px solid hsl(var(--border))" }}
                >
                  <p className="text-sm font-bold text-navy mb-2" style={{ fontFamily: "'Poppins', serif" }}>
                    Want to sponsor BIZCON?
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                    Put your brand in front of 500+ decision-makers. Partnership packages available.
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=Sponsorship Inquiry — BIZCON 2025`}
                    className="text-xs font-bold text-gold hover:underline underline-offset-2"
                  >
                    Email us about sponsorship →
                  </a>
                </div>
              </div>

              {/* Right: Form */}
              <div
                className="lg:col-span-3 rounded-2xl p-8 md:p-10"
                style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-elevated)" }}
              >
                {status === "success" ? (
                  <div className="text-center py-16">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "hsl(var(--gold)/0.12)" }}
                    >
                      <CheckCircle2 size={32} className="text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: "'Poppins', serif" }}>
                      Message Received!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                      Thank you for reaching out. We'll get back to you within 24–48 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-navy mb-1" style={{ fontFamily: "'Poppins', serif" }}>
                      Send a Message
                    </h3>
                    <p className="text-muted-foreground text-sm mb-7">
                      We typically respond within 24 hours on business days.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Full Name *</label>
                          <input
                            type="text" name="name" required value={form.name} onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Email Address *</label>
                          <input
                            type="email" name="email" required value={form.email} onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Subject</label>
                        <select
                          name="subject" value={form.subject} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                        >
                          <option value="">Select a subject...</option>
                          <option value="registration">Registration Inquiry</option>
                          <option value="sponsorship">Sponsorship / Partnership</option>
                          <option value="speaking">Speaking Opportunity</option>
                          <option value="media">Media & Press</option>
                          <option value="other">General Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/70 mb-1.5 tracking-wide">Message *</label>
                        <textarea
                          name="message" required value={form.message}
                          onChange={handleChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                          placeholder="Tell us how we can help..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                          color: "hsl(var(--navy))",
                        }}
                      >
                        {status === "loading" ? (
                          <><Loader2 size={16} className="animate-spin" /> Sending...</>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
