import { CheckCircle2, Star, Zap } from "lucide-react";
import { siteConfig } from "@/data/config";

const PricingSection = () => {
  const scrollToRegister = () => {
    const element = document.getElementById("register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-navy relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">Invest in Yourself</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Poppins', serif" }}>
            Simple, Transparent <span className="gradient-gold-text">Pricing</span>
          </h2>
          <span className="gold-line mx-auto mb-8 block" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the package that fits your growth goals. Secure your spot at Nigeria's premier business conference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Regular Plan */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-gold/50 group">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{siteConfig.pricing.regular.label}</h3>
              <p className="text-gray-400 text-sm mb-6">{siteConfig.pricing.regular.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₦{siteConfig.pricing.regular.price.toLocaleString()}</span>
                <span className="text-gray-400">/one-time</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Full-day access to all sessions",
                "BIZCON 2026 Resource Kit",
                "Networking Opportunities",
                "Certificate of Participation",
                "Access to Alumni Community",
              ].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 size={18} className="text-gold shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToRegister}
              className="w-full py-4 rounded-xl font-bold text-sm bg-white/10 text-white border border-white/20 transition-all duration-200 hover:bg-white/20 hover:border-white/40"
            >
              Get Regular Ticket
            </button>
          </div>

          {/* VIP Plan */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-gold rounded-2xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] relative group shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy text-[10px] font-bold tracking-widest uppercase py-1.5 px-4 rounded-full">
              Most Popular
            </div>
            
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold text-navy mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{siteConfig.pricing.vip.label}</h3>
              <p className="text-gray-400 text-sm mb-6">{siteConfig.pricing.vip.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₦{siteConfig.pricing.vip.price.toLocaleString()}</span>
                <span className="text-gray-400">/one-time</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Everything in Regular, PLUS:",
                "Priority Front-Row Seating",
                "1-on-1 Strategy Session",
                "Exclusive Speaker Access",
                "VIP Networking Lunch",
                "Premium Goodie Bag",
              ].map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-gray-200 text-sm">
                  <CheckCircle2 size={18} className="text-gold shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToRegister}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-gold to-gold-light text-navy transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
            >
              Get VIP Ticket
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
