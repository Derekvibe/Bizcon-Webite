import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PartnersSection from "@/components/sections/PartnersSection";
import { speakers } from "@/data/speakers";
import { ChevronDown, ChevronUp, Linkedin, Twitter, Instagram } from "lucide-react";
import speakerImg from "@/assets/speaker-host.jpg";

export default function About() {
  const [expanded, setExpanded] = useState<string | null>(null);

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
            style={{ background: "radial-gradient(ellipse at 60% 50%, hsl(var(--gold)), transparent 60%)" }}
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">Our Story</p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About BIZCON
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              How a frustration became a movement — and why BIZCON is now the most anticipated business conference in Eastern Nigeria.
            </p>
          </div>
        </section>

        {/* About BIZCON */}
        <section className="section-white py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold">Our Mission</p>
                <h2
                  className="text-3xl font-bold text-navy"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Equipping Nigerian Entrepreneurs with the Tools to Win
                </h2>
                <span className="gold-line block" />
                <p>
                  BIZCON — the Business & Success Growth Conference — was born out of a simple but urgent observation: the gap between entrepreneurial ambition and business execution in Nigeria is vast, and it's costing founders millions.
                </p>
                <p>
                  Founded in 2024, BIZCON set out to create a one-day immersive environment where founders, operators, and business managers could absorb high-leverage business knowledge from practitioners — not theorists.
                </p>
                <p>
                  Every session, every speaker, every networking moment is curated around one outcome: <strong className="text-navy">your business grows when you leave this room</strong>. No fluff. No filler. Just the real strategies, real numbers, and real conversations that move the needle.
                </p>
                <p>
                  BIZCON is now scaling. What began as a local gathering in Abakaliki is becoming a national platform — a movement of serious Nigerian entrepreneurs who believe that knowledge, applied correctly, is the greatest business advantage.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div
                  className="rounded-2xl p-8 space-y-8"
                  style={{ background: "hsl(var(--section-alt))", border: "1px solid hsl(var(--border))" }}
                >
                  {[
                    { label: "Founded", value: "2024" },
                    { label: "Location", value: "Abakaliki, Nigeria" },
                    { label: "Annual Event", value: "September" },
                    { label: "Focus", value: "Business Growth" },
                    { label: "Total Attendees", value: "820+" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                      <span className="text-xs tracking-wider uppercase text-muted-foreground font-semibold">{item.label}</span>
                      <span className="text-sm font-bold text-navy">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Host */}
        <section className="py-24" style={{ background: "hsl(var(--section-alt))" }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">Leadership</p>
              <h2
                className="text-4xl font-bold text-navy"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Meet the Team
              </h2>
              <span className="gold-line mx-auto block mt-5" />
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {speakers.map((speaker) => {
                const isOpen = expanded === speaker.id;
                const imgSrc = speaker.isHost ? speakerImg : null;

                return (
                  <div
                    key={speaker.id}
                    className="rounded-2xl overflow-hidden bg-white border border-border shadow-sm transition-all duration-300"
                    style={{ boxShadow: isOpen ? "var(--shadow-gold)" : "" }}
                  >
                    <button
                      className="w-full flex items-center gap-5 p-6 text-left"
                      onClick={() => setExpanded(isOpen ? null : speaker.id)}
                    >
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-secondary">
                        {imgSrc ? (
                          <img src={imgSrc} alt={speaker.name} className="w-full h-full object-cover object-top" />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-xl font-bold"
                            style={{
                              background: "linear-gradient(135deg, hsl(var(--gold)/0.2), hsl(var(--gold)/0.05))",
                              color: "hsl(var(--gold))",
                              fontFamily: "'Playfair Display', serif",
                            }}
                          >
                            {speaker.name[0]}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-bold text-navy text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {speaker.name}
                          {speaker.isHost && (
                            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold font-semibold">
                              Host
                            </span>
                          )}
                        </p>
                        <p className="text-muted-foreground text-sm">{speaker.title}</p>
                      </div>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-gold shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-7 border-t border-border pt-5">
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{speaker.bio}</p>
                        <div className="flex gap-3">
                          {speaker.social.linkedin && (
                            <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors text-muted-foreground">
                              <Linkedin size={14} />
                            </a>
                          )}
                          {speaker.social.twitter && (
                            <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors text-muted-foreground">
                              <Twitter size={14} />
                            </a>
                          )}
                          {speaker.social.instagram && (
                            <a href={speaker.social.instagram} target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors text-muted-foreground">
                              <Instagram size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partners compact */}
        <PartnersSection compact />
      </main>
      <Footer />
    </div>
  );
}
