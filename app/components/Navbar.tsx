"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "Tentang", href: "#about" },
  { label: "Keahlian", href: "#skills" },
  { label: "Portofolio", href: "#portfolio" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Kontak", href: "#contact" },
];

interface NavbarProps {
  isProjectPage?: boolean;
}

export default function Navbar({ isProjectPage = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Logika penentu tema: selalu gelap di project page, atau jika di-scroll / menu mobile terbuka
  const isDarkTheme = isProjectPage || scrolled || menuOpen;

  // Variabel warna dinamis
  const logoColor = isDarkTheme ? "#ffffff" : "var(--text-primary, #233a66)";
  const linkColor = isDarkTheme ? "rgba(255, 255, 255, 0.85)" : "var(--text-primary, #233a66)";
  const linkHoverColor = isDarkTheme ? "#ffffff" : "var(--accent-primary, #ff6e80)";
  const hamburgerColor = isDarkTheme ? "#ffffff" : "var(--text-primary, #233a66)";

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 300,
          transition: "all 0.4s ease",
          // Jika belum di-scroll, background transparan. Jika di-scroll, kaca gelap.
          backgroundColor: isDarkTheme ? "rgba(15, 23, 42, 0.85)" : "transparent",
          // Hilangkan blur jika di atas agar menyatu dengan background krem
          backdropFilter: isDarkTheme ? "blur(16px)" : "none",
          WebkitBackdropFilter: isDarkTheme ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: scrolled ? "calc(0.85rem + env(safe-area-inset-top, 0px)) 2rem 0.85rem" : "calc(1.25rem + env(safe-area-inset-top, 0px)) 2rem 1.25rem",
            transition: "padding 0.4s ease"
          }}
        >
          {/* Logo */}
          {isProjectPage ? (
            <Link
              href="/"
              style={{
                fontSize: "1.3rem",
                fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                fontWeight: 700,
                color: logoColor,
                textDecoration: "none",
                letterSpacing: "-0.02em",
                transition: "color 0.4s ease",
              }}
            >
              annebilla<span style={{ color: "var(--accent-primary, #ff6e80)" }}>.</span>
            </Link>
          ) : (
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#hero");
              }}
              style={{
                fontSize: "1.3rem",
                fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                fontWeight: 700,
                color: logoColor,
                textDecoration: "none",
                letterSpacing: "-0.02em",
                transition: "color 0.4s ease",
              }}
            >
              annebilla<span style={{ color: "var(--accent-primary, #ff6e80)" }}>.</span>
            </a>
          )}

          {/* Desktop Links */}
          <div
            className="desktop-nav"
            style={{ display: "flex", gap: "2.5rem", marginLeft: "auto", alignItems: "center" }}
          >
            {isProjectPage ? (
              <Link
                href="/#portfolio"
                className="btn-outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.6rem 1.4rem",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Beranda
              </Link>
            ) : (
              links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={{
                    color: linkColor,
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                >
                  {link.label}
                </a>
              ))
            )}
          </div>

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
              background: menuOpen
                ? "rgba(255, 255, 255, 0.1)"
                : (scrolled ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
              border: `1px solid ${isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              position: "relative",
              zIndex: 301,
            }}
          >
            <span
              style={{
                display: "block",
                height: "1.5px",
                width: menuOpen ? "16px" : "18px",
                background: hamburgerColor, // Warna dinamis
                borderRadius: "2px",
                transformOrigin: "center",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                transition: "transform 0.3s ease, width 0.3s ease, background 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1.5px",
                width: "14px",
                background: hamburgerColor, // Warna dinamis
                borderRadius: "2px",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                transition: "opacity 0.3s ease, transform 0.3s ease, background 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1.5px",
                width: menuOpen ? "16px" : "10px",
                background: hamburgerColor, // Warna dinamis
                borderRadius: "2px",
                transformOrigin: "center",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                transition: "transform 0.3s ease, width 0.3s ease, background 0.3s ease",
              }}
            />
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div
          id="js-scroll-progress"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      </nav>

      {/* ── Mobile Menu Overlay ── */}
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
              zIndex: 250, 
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15, 23, 42, 0.98)", 
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "0 2rem 3rem",
                paddingTop: "calc(80px + env(safe-area-inset-top, 0px))",
              }}
            >
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "1.5rem",
                }}
              >
                {isProjectPage ? (
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontSize: "2.2rem",
                      fontWeight: 400,
                      fontFamily: "var(--font-playfair, 'DM Serif Display', serif)",
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      padding: "0.85rem 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Link
                      href="/#portfolio"
                      onClick={() => setMenuOpen(false)}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Beranda
                    </Link>
                    <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-jakarta)", fontWeight: 500, color: "var(--accent-primary, #ff6e80)", letterSpacing: "0.04em" }}>01</span>
                  </motion.div>
                ) : (
                  links.map((link, idx) => (
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav(link.href);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.6rem",
                        fontSize: "2.2rem",
                        fontWeight: 400,
                        fontFamily: "var(--font-playfair, 'DM Serif Display', serif)",
                        color: "#ffffff",
                        textDecoration: "none",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        padding: "0.85rem 0",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        opacity: 0.85,
                        transition: "opacity 0.2s ease, color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = "1";
                        (e.currentTarget as HTMLElement).style.color = "var(--accent-primary, #ff6e80)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = "0.85";
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {link.label}
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                          fontWeight: 500,
                          color: "var(--accent-primary, #ff6e80)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        0{idx + 1}
                      </span>
                    </motion.a>
                  ))
                )}
              </nav>

              <motion.div
                style={{ marginTop: "auto" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
              >
                {isProjectPage ? (
                  <Link
                    href="/#portfolio"
                    className="btn-primary"
                    onClick={() => setMenuOpen(false)}
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                  </Link>
                ) : (
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav("#contact");
                    }}
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
                      <path
                        d="M1 6h10M7 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "1.25rem",
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                  }}
                >
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
          .hamburger-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hamburger-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}