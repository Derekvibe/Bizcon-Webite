import { useEffect, useState, useCallback } from "react";
import { siteConfig } from "@/data/config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownSection() {
  const target = new Date(siteConfig.currentEvent.dateISO);
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(target));

  const tick = useCallback(() => setTime(calcTimeLeft(target)), [target]);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsl(var(--gold)), transparent 60%)" }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="pulse-dot" />
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold">
            BIZCON 2025 Countdown
          </p>
        </div>

        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Clock Is Ticking
        </h2>
        <p className="text-white/50 mb-12 max-w-md mx-auto">
          {siteConfig.currentEvent.date} · {siteConfig.currentEvent.location}
        </p>

        {/* Countdown grid */}
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap mb-14">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3 md:gap-6">
              <div className="countdown-box min-w-[80px] md:min-w-[100px]">
                <span
                  className="text-4xl md:text-5xl font-bold text-white tabular-nums"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-white/40 text-xs tracking-widest uppercase mt-1">{unit.label}</span>
              </div>
              {i < units.length - 1 && (
                <span className="text-2xl font-bold text-gold/50 hidden md:block">:</span>
              )}
            </div>
          ))}
        </div>

        {/* Limited seats urgency */}
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm text-sm text-white/70"
        >
          <span className="pulse-dot" />
          Only{" "}
          <strong className="text-gold">{siteConfig.currentEvent.seatsLeft} seats remaining</strong> — Secure yours before they're gone
        </div>
      </div>
    </section>
  );
}
