"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { link } from "fs";

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

  // Kunci body scroll saat menu terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300); // tunggu animasi close selesai
  };

  return (
    <>
      {/* ── Navbar selalu di atas overlay (z: 300) ── */}
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        style={{
          zIndex: 300,           // ← dinaikkan di atas overlay
          background: menuOpen ? "var(--bg-primary)" : undefined,
          borderBottom: menuOpen ? "1px solid var(--border-subtle)" : undefined,
        }}
      >
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
            annebilla<span style={{ color: "var(--accent-lavender)" }}>.</span>
          </a>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ display: "flex", gap: "2.5rem" }}>
            {links.slice(1).map((link) => (   // skip "Beranda" di desktop
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
          <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); handleNav("#contact"); }} style={{ padding: "0.6rem 1.4rem", fontSize: "0.82rem" }}>
            Hubungi Saya
          </a>

          {/* Mobile Hamburger → ✕ */}
          <button
            className="hamburger-mobile"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              gap: "5px",
              background: menuOpen ? "rgba(255,110,128,0.1)" : "rgba(0,0,0,0.05)",
              border: `1px solid ${menuOpen ? "var(--accent-primary)" : "var(--border-subtle)"}`,
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.2s ease, border-color 0.2s ease",
              position: "relative",
              zIndex: 301,        // ← pastikan tombol selalu klikable
            }}
          >
            <span style={{
              display: "block",
              height: "1.5px",
              width: menuOpen ? "16px" : "18px",
              background: "var(--text-primary)",
              borderRadius: "2px",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              transition: "transform 0.3s ease, width 0.3s ease",
            }} />
            <span style={{
              display: "block",
              height: "1.5px",
              width: "14px",
              background: "var(--text-primary)",
              borderRadius: "2px",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }} />
            <span style={{
              display: "block",
              height: "1.5px",
              width: menuOpen ? "16px" : "10px",
              background: "var(--text-primary)",
              borderRadius: "2px",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              transition: "transform 0.3s ease, width 0.3s ease",
            }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay — di luar <nav> agar stacking context terpisah ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 250,        // ← di bawah navbar (300) tapi di atas konten
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Backdrop */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "var(--bg-primary)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }} />

            {/* Content */}
            <div style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: "0 2rem 3rem",
              paddingTop: "80px",  // tinggi navbar
            }}>
              {/* Nav Links */}
              <nav style={{ display: "flex", flexDirection: "column", marginTop: "1.5rem" }}>
                {links.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + idx * 0.07,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.6rem",
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                      color: "var(--text-primary)",
                      textDecoration: "none",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      padding: "0.85rem 0",
                      borderBottom: "1px solid var(--border-subtle)",
                      opacity: 0.85,
                      transition: "opacity 0.2s ease, color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                      (e.currentTarget as HTMLElement).style.color = "var(--accent-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.85";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                    <span style={{
                      fontSize: "0.78rem",
                      fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                      fontWeight: 500,
                      color: "var(--accent-primary)",
                      letterSpacing: "0.04em",
                    }}>
                      0{idx + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                style={{ marginTop: "auto" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    width: "100%",
                    padding: "1rem",
                    fontSize: "0.95rem",
                    borderRadius: "99px",
                    textDecoration: "none",
                  }}
                >
                  Hubungi Saya
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <div style={{
                  textAlign: "center",
                  marginTop: "1.25rem",
                  color: "var(--text-muted)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                }}>
                  annebillanasywa@gmail.com
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .navbar .btn-primary { display: none !important; }
        }
      `}</style>
    </>
  );
}