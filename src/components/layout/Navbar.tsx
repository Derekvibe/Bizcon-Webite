import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-glass py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex flex-col leading-none">
            <span
              className="text-2xl font-bold tracking-widest gradient-gold-text"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              BIZCON
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground text-white/60">
              {siteConfig.event}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link-item pb-0.5 ${
                isActive(item.href)
                  ? "text-gold font-semibold"
                  : "text-white/80 hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
              color: "hsl(var(--navy))",
            }}
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 navbar-glass border-t border-gold/10 px-4 py-6 flex flex-col gap-4">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-base font-medium py-2 border-b border-white/10 ${
                isActive(item.href) ? "text-gold" : "text-white/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-2 px-5 py-3 rounded-lg text-sm font-semibold text-center"
            style={{
              background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))",
              color: "hsl(var(--navy))",
            }}
          >
            Register Now
          </Link>
        </div>
      )}
    </header>
  );
}
