"use client";

import { motion, Variants } from "framer-motion";

const experiences = [
  {
    period: "2023 – 2024",
    role: "Sekretaris Bidang Kaderisasi",
    org: "Ikatan Mahasiswa Muhammadiyah Adam Malik FKI",
    type: "Organisasi",
    typeColor: "var(--accent-primary)",
    desc: "Bertanggung jawab dalam merencanakan dan melaksanakan kegiatan perkaderan bagi anggota baru IMM Adam Malik.",
  },
  {
    period: "2025",
    role: "Junior Content Specialist Intern",
    org: "Departement Kehumasan UMS",
    type: "Magang",
    typeColor: "#b48ec6",
    desc: "Bertanggung jawab atas publikasi digital dan materi komunikasi strategis untuk internal dan eksternal Universitas Muhammadiyah Surakarta.",
  },
  {
    period: "2025",
    role: "Anggota Divisi Acara Awarding",
    org: "ComFeast 2025, Universitas Muhammadiyah Surakarta",
    type: "Event",
    typeColor: "#dba8c4",
    desc: "Merencanakan dan melaksanakan acara Awarding, termasuk manajemen venue, dekorasi, dan koordinasi dengan pemenang serta sponsor.",
  },
  {
    period: "2025",
    role: "Volunteer",
    org: "Hari Tari Sedunia 2025, ISI Surakarta",
    type: "Volunteer",
    typeColor: "var(--accent-rose)",
    desc: "Menjadi panitia acara Hari Tari Sedunia 2025, bertanggung jawab atas logistik dan kelancaran acara.",
  },
];

const education = {
  degree: "S1 Ilmu Komunikasi",
  university: "Universitas Muhammadiyah Surakarta",
  period: "2022 - 2026",
  concentration: "Public Relations",
  gpa: "3.72 / 4.00",
  
};

export default function Experience() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="experience" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Pengalaman</div>
          <h2 className="section-title">Perjalanan Saya</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Serangkaian pengalaman yang membentuk saya menjadi komunikator yang tangguh dan adaptif.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="exp-grid">
          {/* Timeline */}
          <div>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "2rem", fontFamily: "inherit" }}>
              Organisasi & Pengalaman
            </h3>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="timeline">
              {experiences.map((exp, i) => (
                <motion.div key={i} variants={itemVariants} className="timeline-item" whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.2rem 0.7rem",
                    background: "rgba(255,110,128,0.06)",
                    border: `1px solid ${exp.typeColor}30`,
                    borderRadius: "99px", fontSize: "0.7rem", fontWeight: 600,
                    letterSpacing: "0.08em", color: exp.typeColor, marginBottom: "0.5rem",
                  }}>
                    {exp.type} · {exp.period}
                  </div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.2rem", fontFamily: "inherit" }}>
                    {exp.role}
                  </h4>
                  <div style={{ fontSize: "0.85rem", color: "var(--accent-primary)", marginBottom: "0.6rem", fontWeight: 500 }}>
                    {exp.org}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {exp.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education Card & Languages */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "2rem", fontFamily: "inherit" }}>
              Pendidikan
            </h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(255, 110, 128, 0.1)" }}
              className="card"
              style={{ padding: "2rem", marginBottom: "1.5rem" }}
            >
              <div style={{
                width: 48, height: 48,
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-lavender))",
                borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", marginBottom: "1.5rem",
              }}>
                🎓
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                {education.period}
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem", fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                {education.degree}
              </h4>
              <div style={{ color: "var(--accent-primary)", fontWeight: 500, marginBottom: "0.3rem" }}>
                {education.university}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Konsentrasi: {education.concentration}
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: "1rem", padding: "1rem",
                background: "rgba(255,110,128,0.06)", borderRadius: "0.75rem",
                border: "1px solid rgba(255,110,128,0.15)", marginBottom: "1.5rem",
              }}>
                <span style={{ fontSize: "1.5rem" }}>⭐</span>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>IPK</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--accent-primary)" }}>
                    {education.gpa}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card"
              style={{ padding: "1.5rem" }}
            >
              <h4 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem", fontFamily: "inherit" }}>
                Bahasa
              </h4>
              {[
                { lang: "Bahasa Indonesia", level: "Native", pct: 100 },
                { lang: "English", level: "Proficient", pct: 82 },
              ].map((l) => (
                <div key={l.lang} style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 500 }}>{l.lang}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{l.level}</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 99, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      style={{ height: "100%", background: "linear-gradient(to right, var(--accent-primary), var(--accent-lavender))", borderRadius: 99 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
