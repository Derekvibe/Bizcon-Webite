import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Top border accent */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)" }} />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span
                className="text-3xl font-bold tracking-widest gradient-gold-text"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                BIZCON
              </span>
              <p className="text-xs tracking-[0.25em] uppercase text-white/40 mt-0.5">
                Business & Success Growth Conference
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mt-4">
              Empowering entrepreneurs, founders, and business managers with practical strategies to scale sustainably. Join thousands of leaders who've transformed their businesses.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 hover:border-gold hover:text-gold transition-colors">
                <Instagram size={16} />
              </a>
              <a href={siteConfig.contact.twitter} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 hover:border-gold hover:text-gold transition-colors">
                <Twitter size={16} />
              </a>
              <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 hover:border-gold hover:text-gold transition-colors">
                <Linkedin size={16} />
              </a>
              <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 hover:border-gold hover:text-gold transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-white/60 hover:text-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-white/60 hover:text-gold text-sm transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-gold mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-gold mt-0.5 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-white/60 hover:text-gold text-sm transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-gold mt-0.5 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-white/60 hover:text-gold text-sm transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© {year} BIZCON. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for{" "}
            <span className="text-gold">entrepreneurs who mean business.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
