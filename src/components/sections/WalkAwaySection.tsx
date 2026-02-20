import { CheckCircle2 } from "lucide-react";

const takeaways = [
  "A clear, executable 90-day business growth plan",
  "Brand identity framework ready to deploy",
  "3+ proven digital marketing templates",
  "A personal network of 10+ serious business connections",
  "Pricing strategy to stop undercharging immediately",
  "Systems to scale without burning out",
  "Investor-ready business narrative",
  "Access to exclusive BIZCON alumni community",
];

export default function WalkAwaySection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "hsl(var(--section-alt))" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Visual */}
          <div className="relative">
            <div
              className="rounded-2xl p-10 relative overflow-hidden"
              style={{
                background: "var(--gradient-hero)",
              }}
            >
              {/* Radial glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, hsl(var(--gold)), transparent)" }}
              />
              <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4 relative z-10">
                What You'll Walk Away With
              </p>
              <h3
                className="text-3xl font-bold text-white mb-2 relative z-10"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Leave Different.
                <br />
                Lead Better.
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mt-4 relative z-10">
                Every attendee leaves BIZCON with more than just notes. You leave with a clear path, a stronger network, and the confidence to execute.
              </p>

              {/* Bottom stat */}
              <div className="mt-10 pt-6 border-t border-white/10 flex gap-8 relative z-10">
                <div>
                  <p className="text-3xl font-bold gradient-gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>97%</p>
                  <p className="text-white/40 text-xs mt-1">Attendee satisfaction</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>3x</p>
                  <p className="text-white/40 text-xs mt-1">Avg. revenue growth within 6 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Takeaways list */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">The BIZCON Promise</p>
            <h2
              className="text-4xl font-bold text-navy mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              8 Things You'll Have
              <br />
              <span className="gradient-gold-text">Before You Leave</span>
            </h2>
            <span className="gold-line mb-8 block" />

            <ul className="space-y-4">
              {takeaways.map((item) => (
                <li key={item} className="flex items-start gap-3 group">
                  <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground/80 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
