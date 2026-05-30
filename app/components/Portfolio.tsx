"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  emoji: string;
  desc: string;
  tags: string[];
  bg: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "proj-1",
    title: "Kampanye Attachment Style",
    category: "Campaign",
    categoryColor: "var(--accent-primary)",
    emoji: "🌿",
    desc: "Kampanye tentang attachment style yang bertujuan untuk meningkatkan kesadaran masyarakat tentang dampaknya terhadap hubungan interpersonal.",
    tags: ["Reportase", "Investigasi", "Feature Writing", "Infografis"],
    bg: "linear-gradient(135deg, rgba(255,110,128,0.1) 0%, rgba(255,110,128,0.2) 100%)",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Internship at DPMPTSP Karanganyar",
    category: "Content Creator",
    categoryColor: "var(--accent-rose)",
    emoji: "🗣️",
    desc: "Merancang dan mengelola akun media social DPMPTSP Kabupaten Karanganyar termasuk Instagram, TikTok, dan Facebook.",
    tags: ["Content Strategy", "Content Writing", "Video Production", "Analytics"],
    bg: "linear-gradient(135deg, rgba(215,168,89,0.1) 0%, rgba(215,168,89,0.2) 100%)",
    featured: true,
  },
  {
    id: "proj-3",
    title: "Internship Media Social Specialist at Humas UMS",
    category: "Media Social Specialist",
    categoryColor: "#233A66",
    emoji: "🎓",
    desc: "Bertanggung jawab atas publikasi konten press release dan hubungan dengan media lokal untuk acara-acara besar kampus.",
    tags: ["Content Strategy", "Content Writing", "Video Production", "Analytics"],
    bg: "linear-gradient(135deg, rgba(35,58,102,0.1) 0%, rgba(35,58,102,0.2) 100%)",
    featured: true,
  },
  {
    id: "proj-4",
    title: "Artikel Liputan Kampanye 'Attachment Style' di Kompasiana",
    category: "Journalistic",
    categoryColor: "#D7A859",
    emoji: "📝",
    desc: "Menulis artikel jurnalistik bergaya feature yang membedah isu psikologi hubungan dan keterikatan emosional di portal media online Kompasiana.",
    tags: ["Journalism", "Copywriting", "Feature Writing", "Media Online"],
    bg: "linear-gradient(135deg, rgba(215,168,89,0.1) 0%, rgba(215,168,89,0.2) 100%)",
  },
];

export default function Portfolio() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 70, damping: 15 },
    },
  };

  return (
    <section id="portfolio" style={{ background: "rgba(0,0,0,0.02)", position: "relative", overflow: "hidden" }}>
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
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}
        >
          {projects.filter(project => project.featured).map((project) => (
            <Link key={project.id} href={`/projects#${project.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)", borderColor: "rgba(255, 110, 128, 0.2)" }}
                className="card project-card"
                style={{ padding: 0, overflow: "hidden", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
              >
                <div style={{
                  background: project.bg, height: "180px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "4rem", position: "relative", overflow: "hidden",
                }}>
                  <motion.span
                    style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.1))", display: "inline-block" }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {project.emoji}
                  </motion.span>
                  <div style={{
                    position: "absolute", top: "1rem", left: "1rem",
                    padding: "0.3rem 0.8rem", borderRadius: "99px",
                    fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
                    background: "rgba(255,255,255,0.7)",
                    border: `1px solid ${project.categoryColor}40`,
                    color: project.categoryColor, zIndex: 2,
                  }}>
                    {project.category}
                  </div>
                </div>

                <div style={{ padding: "1.75rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{
                    fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)",
                    marginBottom: "0.75rem", fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.25rem", flexGrow: 1 }}>
                    {project.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} style={{
                        padding: "0.25rem 0.75rem", borderRadius: "99px",
                        fontSize: "0.72rem", fontWeight: 500,
                        background: "rgba(0,0,0,0.04)",
                        border: "1px solid var(--border-subtle)", color: "var(--text-secondary)",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Action Button to Dedicated Page */}
        <div style={{ textAlign: "center" }}>
          <Link href="/projects" className="btn-primary float" style={{ textDecoration: "none", gap: "0.6rem" }}>
            <span>Buka Galeri Media &amp; Detail Proyek</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
