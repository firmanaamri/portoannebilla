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
      {/* ── 2-COLUMN GRID: Text Left | Photo Right ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "90vh" }}
        className="about-grid"
      >

        {/* ── LEFT: Text Content Panel ── (rendered first in DOM but visually left) */}

        {/* ── RIGHT: Photo Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{ position: "relative", overflow: "hidden", order: 1 }}
        >
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
          {/* Left-side fade: photo dissolves into the left column's background */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to left, transparent 40%, rgba(35,58,102,0.6) 70%, #233A66 100%)",
            pointerEvents: "none",
          }} />
          {/* Top fade */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #233A66 0%, transparent 18%)",
            pointerEvents: "none",
          }} />
          {/* Bottom fade */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, #233A66 0%, transparent 25%)",
            pointerEvents: "none",
          }} />
        </motion.div>

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
          {/* Label — "DISCOVERY — ABOUT" */}
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

          {/* Editorial name heading */}
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
            {/* Role pill */}
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

          {/* Core Values — 2-col cards (like reference) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            {coreValues.slice(0, 4).map((val) => (
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
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          .about-grid > div:first-child {
            min-height: 55vw;
          }
        }
      `}</style>
    </section>
  );
}
