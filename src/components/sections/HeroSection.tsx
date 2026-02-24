import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Users, Mic, Trophy } from "lucide-react";
import { siteConfig } from "@/data/config";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: Users, value: "250+", label: "Entrepreneurs" },
  { icon: Mic, value: "9+", label: "Expert Speakers" },
  { icon: Trophy, value: "1 Day", label: "Intensive Learning" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(223 72% 8% / 0.95) 0%, hsl(223 72% 10% / 0.7) 60%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(0deg, hsl(var(--background)), transparent)" }} />

      {/* Radial glow right side */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(43 80% 52%) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm mb-8">
              <span className="pulse-dot" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                Comming Soon BIZCON 2026 · Abakaliki, Nigeria
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Poppins', serif" }}>
              Where Business
              <br />
              <span className="gradient-gold-text">Leaders</span> Are
              <br />
              Forged.
            </h1>

            <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-10">
              BIZCON brings together Nigeria's most ambitious entrepreneurs, founders, and business managers for one transformative day of strategy, branding, and growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                 href="#register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_30px_hsl(43_80%_52%/0.4)] group"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                  color: "hsl(var(--navy))",
                }}
              >
                Secure Your Seat
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border border-white/25 text-white hover:border-gold hover:text-gold transition-all duration-200"
              >
                See Past Events
              </Link>
            </div>

            {/* Event Meta */}
            <div className="flex flex-wrap gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-gold" />
                <span>{siteConfig.currentEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-gold" />
                <span>{siteConfig.currentEvent.location}</span>
              </div>
            </div>
          </div>

          {/* Right: Floating Stats */}
          <div className="hidden lg:flex flex-col gap-5 items-end">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card flex items-center gap-4 w-64"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)/0.2), hsl(var(--gold)/0.05))" }}
                >
                  <stat.icon size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Poppins', serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}

            {/* Limited seats notice */}
            <div className="stat-card w-64 mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-xs">Seats Remaining</span>
                <span className="text-gold text-xs font-bold">{siteConfig.currentEvent.seatsLeft} left</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${((siteConfig.currentEvent.seats - siteConfig.currentEvent.seatsLeft) / siteConfig.currentEvent.seats) * 100}%`,
                    background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))",
                  }}
                />
              </div>
              <p className="text-white/40 text-[11px] mt-2">
                {siteConfig.currentEvent.seats - siteConfig.currentEvent.seatsLeft} of {siteConfig.currentEvent.seats} seats filled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest animate-bounce">
        <span className="w-px h-8 bg-gradient-to-b from-transparent to-gold/50" />
        SCROLL
      </div>
    </section>
  );
}
