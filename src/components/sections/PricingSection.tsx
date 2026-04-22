import { CheckCircle2, Star, Zap, Users } from "lucide-react";
import { siteConfig } from "@/data/config";

const PricingSection = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Bizzer Plan */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-gold/50 group">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{siteConfig.pricing.bizzer.label}</h3>
              <p className="text-gray-400 text-sm mb-6">{siteConfig.pricing.bizzer.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₦{siteConfig.pricing.bizzer.price.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">includes fee</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {siteConfig.pricing.bizzer.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href="#register"
              className="w-full text-center py-4 rounded-xl font-bold text-sm bg-white/10 text-white border border-white/20 transition-all duration-200 hover:bg-white/20 hover:border-white/40 block"
            >
              Get {siteConfig.pricing.bizzer.label} Ticket
            </a>
          </div>

          {/* Bizzer Plus Plan */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-gold rounded-2xl p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] relative group shadow-[0_0_30px_rgba(212,175,55,0.15)] md:-mt-4 md:mb-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy text-[10px] font-bold tracking-widest uppercase py-1.5 px-4 rounded-full whitespace-nowrap">
              Most Popular
            </div>
            
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold text-navy mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{siteConfig.pricing.plus.label}</h3>
              <p className="text-gray-400 text-sm mb-6">{siteConfig.pricing.plus.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₦{siteConfig.pricing.plus.price.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">includes fee</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {siteConfig.pricing.plus.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-gray-200 text-sm">
                  <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href="#register"
              className="w-full text-center py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-gold to-gold-light text-navy transition-all duration-200 hover:shadow-lg hover:shadow-gold/20 block"
            >
              Get {siteConfig.pricing.plus.label} Ticket
            </a>
          </div>
          
          {/* Bizzer Besties Plan */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-gold/50 group">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{siteConfig.pricing.besties.label}</h3>
              <p className="text-gray-400 text-sm mb-6">{siteConfig.pricing.besties.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₦{siteConfig.pricing.besties.price.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">includes fee</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {siteConfig.pricing.besties.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href="#register"
              className="w-full text-center py-4 rounded-xl font-bold text-sm bg-white/10 text-white border border-white/20 transition-all duration-200 hover:bg-white/20 hover:border-white/40 block"
            >
               Get {siteConfig.pricing.besties.label} Ticket
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;

