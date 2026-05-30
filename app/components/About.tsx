"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function About() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  const coreValues = [
    {
      icon: "🎯",
      title: "Komunikasi Strategis",
      desc: "Menghubungkan pesan korporat dengan audiens secara efektif melalui taktik PR digital yang kreatif dan terukur.",
    },
    {
      icon: "💡",
      title: "Digital Konten Kreatif",
      desc: "Membuat konsep dan memproduksi materi visual serta penulisan strategis untuk memperkuat reputasi brand.",
    },
    {
      icon: "🤝",
      title: "Organisasi & Kolaborasi",
      desc: "Berpengalaman memimpin tim dan berkoordinasi dalam event nasional seperti ComFeast dan Hari Tari Sedunia.",
    },
  ];

  return (
    <section
      id="about"
      className="theme-navy"
      style={{ position: "relative", overflow: "hidden", padding: 0 }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "90vh" }}
        className="about-grid"
      >
        {/* ── LEFT: Text Content Panel ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "5rem 2rem 5rem 7vw",
            background: "#233A66",
          }}
        >
          {/* Label */}
          <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "36px", height: "2px",
              background: "var(--accent-secondary)", borderRadius: "99px",
            }} />
            <span style={{
              fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--accent-secondary)",
            }}>
              Discovery — About
            </span>
          </motion.div>

          {/* Name heading */}
          <motion.div variants={itemVariants}>
            <h2 style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 900, lineHeight: 1.05,
              color: "var(--text-primary)", margin: 0,
            }}>
              Annebilla
            </h2>
            <h2 style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 700, fontStyle: "italic", lineHeight: 1.05,
              color: "var(--accent-secondary)", margin: "0 0 0.75rem 0",
            }}>
              Nasywa.
            </h2>
            <span style={{
              display: "inline-block",
              padding: "0.3rem 1rem",
              border: "1px solid rgba(215,168,89,0.3)",
              borderRadius: "99px",
              fontSize: "0.68rem", fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}>
              Public Relations / Content Creator
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} style={{
            width: "100%", height: "1px",
            background: "rgba(215,168,89,0.12)",
          }} />

          {/* Bio */}
          <motion.p variants={itemVariants} style={{
            color: "var(--text-secondary)", fontSize: "0.93rem",
            lineHeight: 1.9, textAlign: "justify", margin: 0,
          }}>
            Saya <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Annebilla Nasywa</strong>,
            fresh graduate <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Ilmu Komunikasi</strong>{" "}
            UMS yang berfokus pada{" "}
            <strong style={{ color: "var(--accent-secondary)", fontWeight: 600 }}>Public Relations</strong>{" "}
            dan konten digital. Saya bersemangat memadukan komunikasi strategis dengan kreativitas — dari kehumasan UMS,
            kepemimpinan IMM, hingga manajemen event seni nasional.
          </motion.p>

          {/* Core Values */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            {coreValues.map((val, i) => (
              <motion.div
                key={val.title}
                variants={itemVariants}
                style={{
                  padding: "1.1rem",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(215,168,89,0.1)",
                  cursor: "default",
                  transition: "border-color 0.2s, background 0.2s",
                  ...(coreValues.length % 2 !== 0 && i === coreValues.length - 1
                    ? { gridColumn: "1 / -1" }
                    : {}),
                }}
                whileHover={{
                  backgroundColor: "rgba(215,168,89,0.06)",
                  borderColor: "rgba(215,168,89,0.3)",
                }}
              >
                <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{val.icon}</div>
                <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
                  {val.title}
                </h4>
                <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, opacity: 0.85 }}>
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Photo Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="about-photo"
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* 
            Di desktop: pakai next/image fill (parent relative, overflow hidden, tinggi dari grid).
            Di mobile: pakai <img> biasa dengan width 100% agar foto tampil full tanpa terpotong.
          */}

          {/* Desktop image — hidden di mobile via CSS */}
          <div className="photo-desktop" style={{ position: "absolute", inset: 0 }}>
            <Image
              src="/photo/aww.jpeg"
              alt="Annebilla Nasywa"
              fill
              sizes="50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                filter: "brightness(0.95) contrast(1.1) saturate(0.95)",
              }}
            />
          </div>

          {/* Mobile image — hidden di desktop via CSS, tampil full */}
          <div className="photo-mobile">
            <img
              src="/photo/aww.jpeg"
              alt="Annebilla Nasywa"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                filter: "brightness(0.95) contrast(1.1) saturate(0.95)",
              }}
            />
          </div>

          {/* Overlay gradients — desktop only */}
          <div className="photo-desktop" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to left, transparent 40%, rgba(35,58,102,0.6) 70%, #233A66 100%)",
            pointerEvents: "none",
          }} />
          <div className="photo-desktop" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #233A66 0%, transparent 18%)",
            pointerEvents: "none",
          }} />
          <div className="photo-desktop" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, #233A66 0%, transparent 25%)",
            pointerEvents: "none",
          }} />

          {/* Mobile: gradient tipis di bawah supaya transisi ke teks halus */}
          <div className="photo-mobile-overlay" style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "60px",
            background: "linear-gradient(to top, #233A66 0%, transparent 100%)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </div>

      <style>{`
        /* ── Desktop default ── */
        .photo-mobile { display: none; }
        .photo-mobile-overlay { display: none; }
        .photo-desktop { display: block; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }

          /* Foto di atas teks */
          .about-photo {
            order: -1;
            /* Hapus position relative + overflow hidden agar img bisa tampil full */
            position: static !important;
            overflow: visible !important;
            background: #233A66;
          }

          /* Sembunyikan versi desktop */
          .photo-desktop { display: none !important; }

          /* Tampilkan versi mobile */
          .photo-mobile {
            display: block;
            width: 100%;
          }

          .photo-mobile-overlay {
            display: block;
            position: sticky; /* tetap di bawah gambar */
          }
        }
      `}</style>
    </section>
  );
}