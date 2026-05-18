"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Tentang", href: "#about" },
  { label: "Keahlian", href: "#skills" },
  { label: "Portofolio", href: "#portfolio" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Kontak", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          style={{
            fontSize: "1.3rem",
            fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
            fontWeight: 700,
            color: "var(--accent-primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          annebilla<span style={{ color: "var(--accent-rose)" }}>.</span>
        </a>

        {/* Desktop Links */}
        <div className="desktop-nav" style={{ display: "flex", gap: "2.5rem" }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="btn-primary"
          onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
          style={{ padding: "0.6rem 1.4rem", fontSize: "0.82rem" }}
        >
          Hubungi Saya
        </a>

        {/* Mobile Hamburger */}
        <button
          id="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            padding: "0.25rem",
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100dvh",
              background: "rgba(13, 13, 18, 0.99)",
              backdropFilter: "blur(24px)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
            }}
          >
            {/* Overlay Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "3rem",
            }}>
              <a
                href="#hero"
                onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
                style={{
                  fontSize: "1.3rem",
                  fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                  fontWeight: 700,
                  color: "var(--accent-primary)",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                }}
              >
                annebilla<span style={{ color: "var(--accent-rose)" }}>.</span>
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  padding: "0.25rem",
                }}
                aria-label="Close menu"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Centered Large Navigation Links */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: "2.5rem",
            }}>
              {links.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, type: "spring", stiffness: 100, damping: 15 }}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  style={{
                    fontSize: "2rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                  whileHover={{ scale: 1.1, color: "var(--accent-primary)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Bottom Signature info */}
            <div style={{
              textAlign: "center",
              marginTop: "auto",
              color: "var(--text-muted)",
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
            }}>
              annebillanasywa@gmail.com
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .btn-primary { display: none !important; }
          #hamburger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
