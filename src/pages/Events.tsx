import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { events } from "@/data/events";
import { Calendar, MapPin, Users, Mic, ChevronDown, ChevronUp, Play } from "lucide-react";
import eventImg2025 from "@/assets/event-2025.jpg";
import eventImg2024 from "@/assets/event-2024.jpg";

const eventImages: Record<string, string> = {
  "bizcon-2025": eventImg2025,
  "bizcon-2024": eventImg2024,
};

export default function Events() {
  const [expanded, setExpanded] = useState<string | null>("bizcon-2025");

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
            style={{ background: "radial-gradient(ellipse at 40% 50%, hsl(var(--gold)), transparent 60%)" }}
          />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-4">Our Track Record</p>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              BIZCON Events
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Every edition tells a different story. Every story changes a business.
            </p>
          </div>
        </section>

        {/* Events */}
        <section className="section-white py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6">
              {events.map((event) => {
                const isOpen = expanded === event.id;
                const img = eventImages[event.id];

                return (
                  <div
                    key={event.id}
                    className="rounded-2xl border overflow-hidden transition-all duration-300 bg-white"
                    style={{
                      borderColor: isOpen ? "hsl(var(--gold)/0.5)" : "hsl(var(--border))",
                      boxShadow: isOpen ? "var(--shadow-gold)" : "var(--shadow-card)",
                    }}
                  >
                    {/* Header */}
                    <button
                      className="w-full flex items-start gap-6 p-7 text-left"
                      onClick={() => setExpanded(isOpen ? null : event.id)}
                    >
                      <div
                        className="shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center text-center"
                        style={{
                          background: isOpen ? "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))" : "hsl(var(--section-alt))",
                        }}
                      >
                        <span
                          className={`text-2xl font-bold ${isOpen ? "text-navy" : "text-gold"}`}
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {event.year}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3
                            className="text-xl font-bold text-navy"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            BIZCON {event.year}
                          </h3>
                          {event.featured && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold font-semibold border border-gold/20">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <p className="text-gold text-sm font-semibold mb-2 italic">"{event.theme}"</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar size={12} />{new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                          <span className="flex items-center gap-1"><MapPin size={12} />{event.location}</span>
                          {event.attendees && <span className="flex items-center gap-1"><Users size={12} />{event.attendees}+ Attendees</span>}
                          {event.speakers && <span className="flex items-center gap-1"><Mic size={12} />{event.speakers} Speakers</span>}
                        </div>
                      </div>

                      <div className="shrink-0 text-muted-foreground">
                        {isOpen ? <ChevronUp size={18} className="text-gold" /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="border-t border-border px-7 pb-8 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Left: Description */}
                          <div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{event.description}</p>

                            {/* Videos */}
                            {event.videos.length > 0 && (
                              <div className="space-y-3">
                                <p className="text-xs tracking-widest uppercase text-gold font-semibold">Highlights</p>
                                {event.videos.map((v, i) => (
                                  <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                                    <iframe
                                      src={v}
                                      title={`BIZCON ${event.year} video ${i + 1}`}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {event.videos.length === 0 && event.featured && (
                              <div
                                className="rounded-xl p-4 flex items-center gap-3 text-sm"
                                style={{ background: "hsl(var(--gold)/0.08)", border: "1px solid hsl(var(--gold)/0.25)" }}
                              >
                                <Play size={16} className="text-gold shrink-0" />
                                <span className="text-foreground/70">
                                  Highlight video will be published after the event.
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Right: Image gallery */}
                          {img && (
                            <div className="rounded-xl overflow-hidden">
                              <img
                                src={img}
                                alt={`BIZCON ${event.year}`}
                                className="w-full h-full object-cover max-h-64"
                              />
                            </div>
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
      </main>
      <Footer />
    </div>
  );
}
