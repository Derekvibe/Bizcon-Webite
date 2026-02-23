import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutPreviewSection() {
  return (
    <section className="section-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-3xl opacity-20"
              style={{ background: "radial-gradient(ellipse, hsl(var(--gold)), transparent)" }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://i.postimg.cc/mD8QVhRV/IMG-0772-JPG.jpg"
                alt="Wilson Uwa — BIZCON Founder"
                className="w-full h-[480px] object-cover object-top"
              />
              {/* Overlay card */}
              <div
                className="absolute bottom-6 left-6 right-6 rounded-xl p-5 backdrop-blur-sm"
                style={{ background: "hsl(223 72% 8% / 0.9)", border: "1px solid hsl(var(--gold)/0.25)" }}
              >
                <p className="text-xs tracking-widest uppercase text-gold font-semibold mb-1">BIZCON Founder</p>
                <p className="text-white font-bold text-lg" style={{ fontFamily: "'Poppins', serif" }}>
                  Wilson Uwa
                </p>
                <p className="text-white/50 text-sm">Business Strategist & Brand Designer</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">About BIZCON</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-navy mb-5"
              style={{ fontFamily: "'Poppins', serif" }}
            >
              Born from Frustration.
              <br />
              Built for Growth.
            </h2>
            <span className="gold-line mb-8 block" />

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                BIZCON was founded on a simple observation: Nigerian entrepreneurs are smart, hungry, and driven — but they lack access to the structured business knowledge that separates seven-figure businesses from stagnant ones.
              </p>
              <p>
                What started as a small gathering of local founders has grown into Abakaliki's most anticipated business event, attracting entrepreneurs from across the country who want more than inspiration — they want a <span className="text-navy font-semibold">blueprint</span>.
              </p>
              <p>
                Every BIZCON session is carefully designed around one question:{" "}
                <em className="text-navy">"What does this attendee need to walk out and execute immediately?"</em>
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-10 font-semibold text-sm group text-navy hover:text-gold transition-colors"
            >
              Learn Our Full Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
