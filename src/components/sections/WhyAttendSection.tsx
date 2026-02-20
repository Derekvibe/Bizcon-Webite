import { TrendingUp, Users, Lightbulb, Network, Target, BookOpen } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Proven Growth Frameworks",
    description: "Walk away with tested, actionable business models you can implement immediately — not theory.",
  },
  {
    icon: Lightbulb,
    title: "Brand Strategy Mastery",
    description: "Learn how to position your brand to command premium prices and attract your ideal clients.",
  },
  {
    icon: Users,
    title: "Elite Peer Network",
    description: "Be in the same room as 500+ serious entrepreneurs who are building real, scalable businesses.",
  },
  {
    icon: Target,
    title: "Marketing that Converts",
    description: "Discover digital and offline marketing strategies that generate consistent leads and sales.",
  },
  {
    icon: Network,
    title: "High-Value Connections",
    description: "Network with investors, mentors, and fellow founders who can open doors for your business.",
  },
  {
    icon: BookOpen,
    title: "Industry Insider Knowledge",
    description: "Get direct access to industry experts who've built and scaled businesses from zero to millions.",
  },
];

export default function WhyAttendSection() {
  return (
    <section className="section-white py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">Why BIZCON</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-navy mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            6 Reasons Serious
            <br />Entrepreneurs Attend
          </h2>
          <span className="gold-line mx-auto block mb-5" />
          <p className="text-muted-foreground leading-relaxed">
            BIZCON isn't a motivational event. It's a precision business summit where every session is designed to give you an unfair advantage.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div key={reason.title} className="attend-card bg-white group">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ background: "hsl(var(--gold)/0.1)" }}
              >
                <reason.icon
                  size={22}
                  className="text-gold transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Number */}
              <span
                className="text-6xl font-bold text-gold/8 absolute top-6 right-6 select-none"
                style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-lg font-bold text-navy mb-3 relative"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
