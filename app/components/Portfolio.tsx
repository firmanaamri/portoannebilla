"use client";

import { motion, Variants } from "framer-motion";

const projects = [
  {
    id: "proj-1",
    title: "Liputan Isu Lingkungan",
    category: "Jurnalistik",
    categoryColor: "var(--accent-primary)",
    emoji: "🌿",
    desc: "Seri liputan mendalam tentang dampak polusi plastik terhadap ekosistem pesisir. Artikel diterbitkan di majalah kampus dan mendapat 5.000+ pembaca.",
    tags: ["Reportase", "Investigasi", "Feature Writing"],
    bg: "linear-gradient(135deg, #0f2319 0%, #1a3a25 100%)",
  },
  {
    id: "proj-2",
    title: "Kampanye Sosial #BijakBermedsos",
    category: "Social Media",
    categoryColor: "var(--accent-rose)",
    emoji: "📱",
    desc: "Merancang dan mengelola kampanye literasi digital yang menjangkau 50.000+ pengguna di Instagram dan TikTok dalam satu bulan.",
    tags: ["Content Strategy", "Copywriting", "Analytics"],
    bg: "linear-gradient(135deg, #1a0d1f 0%, #2d1535 100%)",
  },
  {
    id: "proj-3",
    title: "Publikasi Humas Universitas",
    category: "Public Relations",
    categoryColor: "#7b9ef0",
    emoji: "🎓",
    desc: "Bertanggung jawab atas penerbitan press release bulanan dan hubungan dengan media lokal untuk acara-acara besar kampus.",
    tags: ["Press Release", "Media Relations", "Event PR"],
    bg: "linear-gradient(135deg, #0d1826 0%, #1a2a40 100%)",
  },
  {
    id: "proj-4",
    title: "Podcast 'Suara Muda'",
    category: "Podcast",
    categoryColor: "#7bc9a0",
    emoji: "🎙️",
    desc: "Memproduksi dan membawakan podcast mingguan yang membahas isu-isu sosial dari perspektif generasi muda. 20+ episode dengan 2.000+ pendengar.",
    tags: ["Podcast", "Audio Editing", "Hosting"],
    bg: "linear-gradient(135deg, #0d1f1a 0%, #1a3530 100%)",
  },
  {
    id: "proj-5",
    title: "Dokumentasi Festival Budaya",
    category: "Visual Content",
    categoryColor: "#e8a87c",
    emoji: "🎭",
    desc: "Meliput dan mendokumentasikan festival seni budaya daerah melalui foto dan video yang kemudian dipublikasikan di berbagai platform media.",
    tags: ["Photography", "Video Editing", "Storytelling"],
    bg: "linear-gradient(135deg, #1f1208 0%, #352218 100%)",
  },
  {
    id: "proj-6",
    title: "Riset Framing Media",
    category: "Riset Akademik",
    categoryColor: "#b0b0e0",
    emoji: "📊",
    desc: "Penelitian tentang framing berita terkait isu perempuan di tiga media online terbesar Indonesia. Dipresentasikan di seminar nasional komunikasi.",
    tags: ["Framing Analysis", "Research", "Academic Writing"],
    bg: "linear-gradient(135deg, #10101f 0%, #1c1c35 100%)",
  },
];

export default function Portfolio() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section id="portfolio" style={{ background: "rgba(0,0,0,0.2)", position: "relative", overflow: "hidden" }}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Portofolio</div>
          <h2 className="section-title">Karya &amp; Proyek</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Kumpulan proyek nyata yang mencerminkan perjalanan komunikasi saya dari ruang kelas ke dunia profesional.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              id={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                borderColor: "rgba(201, 169, 110, 0.3)" 
              }}
              className="card project-card"
              style={{ padding: 0, overflow: "hidden", cursor: "default" }}
            >
              {/* Cover visual with motion zoom on hover */}
              <div style={{
                background: project.bg,
                height: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
                position: "relative",
                overflow: "hidden",
              }}>
                <motion.span 
                  style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))", display: "inline-block" }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {project.emoji}
                </motion.span>
                <div style={{
                  position: "absolute",
                  top: "1rem", left: "1rem",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "99px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  background: "rgba(0,0,0,0.5)",
                  border: `1px solid ${project.categoryColor}40`,
                  color: project.categoryColor,
                  zIndex: 2,
                }}>
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.75rem" }}>
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                }}>
                  {project.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "99px",
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
