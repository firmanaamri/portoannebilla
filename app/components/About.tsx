"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function About() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 15,
        delay: 0.2,
      },
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
    <section id="about" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container">
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left Column — Gorgeous Portrait Photo Blending with Dark Theme */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              position: "relative",
              justifySelf: "center",
              width: "100%",
              maxWidth: "340px",
            }}
          >
            {/* Ambient background glow (gold & rose) */}
            <div style={{
              position: "absolute",
              top: "-5%",
              left: "-5%",
              width: "110%",
              height: "110%",
              background: "radial-gradient(circle, rgba(201, 169, 110, 0.2) 0%, rgba(224, 122, 159, 0.08) 50%, transparent 100%)",
              filter: "blur(30px)",
              zIndex: 0,
              pointerEvents: "none",
            }} />

            {/* Photo container */}
            <div style={{
              position: "relative",
              aspectRatio: "3/4",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(201, 169, 110, 0.2)",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.6)",
              zIndex: 1,
              // Fades the bottom edges perfectly into the deep dark background
              maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)",
            }}>
              <Image
                src="/my.jpeg" // Menggunakan foto profil yang sama yang sudah teruji keindahannya
                alt="Tentang Annebilla"
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                priority
                style={{
                  objectFit: "cover",
                  // Muted luxury grading to blend perfectly with dark gold-rose theme
                  filter: "brightness(0.75) contrast(1.1) saturate(0.65) sepia(0.2)",
                }}
              />

              {/* Gold/Rose color matching tint overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(201, 169, 110, 0.1) 0%, rgba(224, 122, 159, 0.05) 50%, rgba(13, 13, 18, 0.8) 100%)",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }} />
            </div>

            {/* Tiny accent gold dot badge */}
            <div style={{
              position: "absolute",
              bottom: "10%",
              right: "-15px",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-rose))",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(201, 169, 110, 0.3)",
              zIndex: 2,
              fontSize: "1.2rem",
            }}>
              ✨
            </div>
          </motion.div>

          {/* Right Column — Professional Profile Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <div className="section-label">Tentang Saya</div>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Menghubungkan Visi Melalui Komunikasi Kreatif
              </h2>
            </motion.div>

            <motion.p 
              variants={itemVariants} 
              style={{
                color: "var(--text-secondary)",
                fontSize: "1rem",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              Halo! Saya adalah mahasiswi semester akhir jurusan <strong style={{ color: "var(--text-primary)" }}>Ilmu Komunikasi</strong> di <strong style={{ color: "var(--text-primary)" }}>Universitas Muhammadiyah Surakarta</strong>, dengan fokus pendalaman di bidang <strong style={{ color: "var(--text-primary)" }}>Public Relations (Hubungan Masyarakat)</strong>.
            </motion.p>

            <motion.p 
              variants={itemVariants} 
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Sebagai calon praktisi PR dan penggiat media digital, saya sangat bersemangat dalam memadukan keahlian komunikasi publik dengan kreativitas pembuatan konten digital. Melalui pengalaman saya di kehumasan internal UMS, kegiatan kepemimpinan IMM, serta manajemen event seni nasional, saya selalu bertekad menciptakan impresi yang bermakna bagi setiap audiens.
            </motion.p>

            {/* Core Pillars / Core Values list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {coreValues.map((val, idx) => (
                <motion.div
                  key={val.title}
                  variants={itemVariants}
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(201, 169, 110, 0.08)",
                    border: "1px solid rgba(201, 169, 110, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                  }}>
                    {val.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "0.25rem",
                    }}>
                      {val.title}
                    </h4>
                    <p style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}>
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
