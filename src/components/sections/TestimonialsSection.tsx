const testimonials = [
  {
    quote: "BIZCON was the turning point for my business. I came in confused about my brand and left with a complete strategy. Within 4 months, my revenue had doubled.",
    name: "Chioma Eze",
    title: "Fashion Entrepreneur, Enugu",
    initials: "CE",
  },
  {
    quote: "I've attended conferences in Lagos, Abuja, Accra. BIZCON is the only one where the content is 100% practical. Every session was directly actionable.",
    name: "David Okoro",
    title: "Co-founder, TechBuild NG",
    initials: "DO",
  },
  {
    quote: "The network alone was worth the ticket price. I met my biggest client at BIZCON 2024. That single connection 10x'd my investment.",
    name: "Amina Bello",
    title: "Marketing Consultant, Abuja",
    initials: "AB",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "hsl(var(--section-dark))" }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">Social Proof</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Poppins', serif" }}
          >
            What Past Attendees Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: "hsl(0 0% 100% / 0.04)",
                border: "1px solid hsl(0 0% 100% / 0.08)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Quote mark */}
              <span
                className="text-5xl gradient-gold-text leading-none mb-4 -mt-2"
                style={{ fontFamily: "'Poppins', serif" }}
              >
                "
              </span>
              <p className="text-white/70 text-sm leading-relaxed flex-1 italic">{t.quote}</p>

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-navy shrink-0"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
