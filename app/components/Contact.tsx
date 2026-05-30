"use client";

import { motion, Variants } from "framer-motion";

const contacts = [
  {
    id: "contact-email",
    icon: "✉️",
    label: "Email",
    value: "annebillanasywa@gmail.com",
    href: "mailto:annebillanasywa@gmail.com",
    desc: "Kirim pesan kapan saja",
  },
  {
    id: "contact-instagram",
    icon: "📸",
    label: "Instagram",
    value: "@annblansywaa._",
    href: "https://instagram.com/annblansywaa._",
    desc: "Konten & keseharian",
  },
  {
    id: "contact-linkedin",
    icon: "💼",
    label: "LinkedIn",
    value: "Annebilla Nasywa",
    href: "https://linkedin.com/in/annebillanasywa",
    desc: "Profil profesional",
  },
  {
    id: "contact-whatsapp",
    icon: "💬",
    label: "WhatsApp",
    href: "https://wa.me/6285281299662",
    desc: "Respon cepat",
  },
];

export default function Contact() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="contact" className="theme-navy" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Kontak</div>
          <h2 className="section-title">Mari Terhubung</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Terbuka untuk kolaborasi, kesempatan magang, proyek kreatif, atau sekadar berbincang tentang dunia komunikasi.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="contact-grid">
          {/* Left — Quote & CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            <motion.div
              className="card"
              style={{
                padding: "2.5rem",
                background: "linear-gradient(135deg, rgba(255,110,128,0.05), rgba(215,168,89,0.04))",
                borderColor: "rgba(255,110,128,0.15)",
                marginBottom: "1.5rem",
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(255, 110, 128, 0.1)" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&ldquo;</div>
              <p style={{
                fontSize: "1.2rem",
                fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                color: "var(--text-primary)", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.5rem",
              }}>
                Komunikasi bukan sekadar bicara — ini tentang menghubungkan hati, membangun kepercayaan, dan menciptakan perubahan.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-lavender))",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem",
                }}>
                  ✨
                </div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Annebilla</span>
              </div>
            </motion.div>

            <motion.a
              id="contact-cv-download"
              href="/Resume_Annebilla_Nasywa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Unduh CV Lengkap
            </motion.a>
          </motion.div>

          {/* Right — Contact Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {contacts.map((c) => (
              <motion.a
                key={c.id}
                id={c.id}
                variants={linkVariants}
                href={c.href}
                className="contact-link"
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 8, backgroundColor: "rgba(255,110,128,0.04)", borderColor: "var(--accent-primary)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "12px",
                  background: "rgba(255,110,128,0.07)", border: "1px solid rgba(255,110,128,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {c.label}
                  </div>
                  <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9rem" }}>
                    {c.value}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                    {c.desc}
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
