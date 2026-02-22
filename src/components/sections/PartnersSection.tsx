import { partners } from "@/data/partners";
import { ExternalLink } from "lucide-react";

interface PartnersSectionProps {
  compact?: boolean;
}

export default function PartnersSection({ compact = false }: PartnersSectionProps) {
  return (
    <section className={`section-white ${compact ? "py-12" : "py-20"}`}>
      <div className="container mx-auto px-4">
        {!compact && (
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">
              Our Partners
            </p>
            <h2
              className="text-3xl font-bold text-navy mb-4"
              style={{ fontFamily: "'Poppins', serif" }}
            >
              Backed by Industry Leaders
            </h2>
            <span className="gold-line mx-auto block" />
          </div>
        )}

        {compact && (
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-8">
            Supported by
          </p>
        )}

        {/* Partners grid — using text/logo placeholders since we don't have real logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {partners.map((partner) => (
            <div key={partner.id} className="group">
              {partner.website ? (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-gold/50 hover:shadow-md transition-all duration-200 text-muted-foreground hover:text-gold"
                >
                  <span className="font-bold text-sm tracking-wider">{partner.name}</span>
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <div className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground">
                  <span className="font-bold text-sm tracking-wider">{partner.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {!compact && (
          <p className="text-center text-muted-foreground/60 text-xs mt-10">
            Interested in sponsoring BIZCON?{" "}
            <a href="mailto:hello@bizcon.ng" className="text-gold underline underline-offset-2">
              Partner with us
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
