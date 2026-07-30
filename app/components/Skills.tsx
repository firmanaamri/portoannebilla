"use client";

import { motion, Variants } from "framer-motion";

const skills = [
  {
    category: "Jurnalistik & Menulis",
    icon: "📝",
    color: "rgba(255, 110, 128, 0.08)",
    borderColor: "rgba(255, 110, 128, 0.15)",
    items: [
      "Reportase & Liputan Berita",
      "Copywriting",
      "Press Release",
    ],
  },
  {
    category: "Public Relations",
    icon: "📢",
    color: "rgba(215, 168, 89, 0.07)",
    borderColor: "rgba(215, 168, 89, 0.15)",
    items: [
      "Stakeholder & Sponsorship",
      "Crisis Communication",
      "Event Management",
      "Community Management",
    ],
  },
  {
    category: "Media & Konten Kreatif",
    icon: "🎬",
    color: "rgba(255, 214, 145, 0.08)",
    borderColor: "rgba(255, 214, 145, 0.15)",
    items: [
      "Content Strategy",
      "Social Media Management",
      "Photography & Videography",
      "Video Editing (CapCut)",
      "Desain Grafis (Canva)",
      "Podcast Produksi",
    ],
  },
  {
    category: "Riset & Analisis",
    icon: "🔍",
    color: "rgba(255, 214, 145, 0.07)",
    borderColor: "rgba(255, 214, 145, 0.15)",
    items: [
      "Analisis Media Sosial",
      "Audience Insight",
      "Survey & Kuesioner",
      "SWOT Analysis",
      "Conference & Presentation",
    ],
  },
];

const tools = [
  "Canva", "CapCut",
  "Microsoft Office",
  "Instagram", "TikTok", "LinkedIn",
];

export default function Skills() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="skills" className="theme-navy" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Keahlian</div>
          <h2 className="section-title">Apa yang Saya Kuasai</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Kombinasi kemampuan komunikasi, kreativitas, dan analisis untuk menciptakan dampak nyata.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(255, 110, 128, 0.1)", borderColor: "rgba(255, 110, 128, 0.3)" }}
              className="card"
              style={{ padding: "2rem", background: skill.color, borderColor: skill.borderColor }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{skill.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.25rem", fontFamily: "inherit" }}>
                {skill.category}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {skill.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-primary)", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card"
          style={{ padding: "2rem" }}
        >
          <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", textAlign: "center", fontFamily: "inherit" }}>
            Tools & Platform
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="badge"
                whileHover={{ scale: 1.08, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, delay: i * 0.03 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
