"use client";

import { motion } from "framer-motion";
import AnimationEngine from "../components/AnimationEngine";
import Navbar from "../components/Navbar";
import { useState, useEffect, useCallback } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  emoji?: string;
  desc: string;
  details: string;
  tags: string[];
  bg: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  mediaUrls?: string[];
  impact?: string;
  projectUrl?: string;
}

// ── Reusable image carousel component ──
function MediaCarousel({ urls, title }: { urls: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 350);
  }, [animating]);

  const prev = () => goTo((current - 1 + urls.length) % urls.length);
  const next = () => goTo((current + 1) % urls.length);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % urls.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [urls.length]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Slides */}
      {urls.map((url, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={url}
          src={url}
          alt={`${title} ${i + 1}`}
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: i === current ? (animating ? 0 : 1) : 0,
            transform: i === current ? (animating ? "scale(1.03)" : "scale(1)") : "scale(1.03)",
            transition: "opacity 0.45s ease, transform 0.55s ease",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Gambar sebelumnya"
        style={{
          position: "absolute", left: "1rem", top: "50%",
          transform: "translateY(-50%)",
          width: "2.4rem", height: "2.4rem",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.40)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10,
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.65)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.40)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Gambar berikutnya"
        style={{
          position: "absolute", right: "1rem", top: "50%",
          transform: "translateY(-50%)",
          width: "2.4rem", height: "2.4rem",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.40)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10,
          transition: "background 0.2s, transform 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.65)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.40)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: "1rem", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: "0.45rem", zIndex: 10,
      }}>
        {urls.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Gambar ${i + 1}`}
            style={{
              width: i === current ? "1.6rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "99px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
              border: "none", cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Slide counter top-right */}
      <div style={{
        position: "absolute", top: "1rem", right: "1rem",
        padding: "0.3rem 0.75rem",
        borderRadius: "99px",
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.2)",
        fontSize: "0.7rem", fontWeight: 700,
        color: "#fff", letterSpacing: "0.06em",
        pointerEvents: "none", zIndex: 10,
      }}>
        {current + 1} / {urls.length}
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    id: "proj-1",
    title: "Kampanye Attachment Style",
    category: "Campaign",
    categoryColor: "var(--accent-primary)",
    
    desc: "Kampanye tentang attachment style",
    details: "Sebagai syarat tugas akhir dari mahasiswa ilmu komunikasi, bentuk implementasi dari tugas mata kuliah kampanye public relations yang dimana setiap minggu nya akan ada campaign dan di akhir semester akan ada penilaian, kampanye yang saya pilih yaitu attachment style, yang dimana setiap minggunya akan ada content berupa infografis, reel dan juga instagram stories. Attachment Style adalah kampanye yang bertujuan untuk meningkatkan kesadaran masyarakat tentang attachment style dan dampaknya terhadap hubungan interpersonal.",
    tags: ["Reportase", "Investigasi", "Feature Writing", "Infografis"],
    bg: "linear-gradient(135deg, rgba(255,110,128,0.1) 0%, rgba(255,110,128,0.2) 100%)",
    mediaType: "image",
    mediaUrl: "/photo/kampanye.jpg",
    mediaUrls: ["/photo/kampanye.jpg", "/photo/kampanye2.png"],
    
    projectUrl: "https://www.instagram.com/ruanggema.soc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "proj-2",
    title: "Internship at DPMPTSP Karanganyar",
    category: "Content Creator",
    categoryColor: "var(--accent-rose)",
    
    desc: "Merancang dan mengelola akun media social DPMPTSP Kabupaten Karanganyar",
    details: "Sebagai mahasiswa magang di Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (DPMPTSP) Kabupaten Karanganyar, saya bertanggung jawab penuh dalam pengelolaan seluruh kanal media sosial resmi lembaga, termasuk Instagram, TikTok, dan Facebook.\n\nTugas utama mencakup pembuatan konten harian (Infografis Edukasi, Reels Interaktif, Story Teaser), perencanaan kalender konten, serta analisis performa mingguan. Saya juga berkesempatan memimpin dokumentasi video untuk acara publik berskala besar seperti Investor Gathering dan Soft Launching Mall Pelayanan Publik.",
    tags: ["Content Strategy", "Content Writing", "Video Production", "Analytics"],
    bg: "linear-gradient(135deg, rgba(215,168,89,0.1) 0%, rgba(215,168,89,0.2) 100%)",
    mediaType: "video",
    mediaUrl: "/video/dpm.mp4",
    
    projectUrl: "https://www.instagram.com/reel/DJ_ysd-Pvzv/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
  },
  {
    id: "proj-3",
    title: "Internship Media Social Specialist at Humas UMS",
    category: "Media Social Specialist",
    categoryColor: "#233A66",
    
    desc: "Bertanggung jawab atas publikasi konten press release dan hubungan dengan media lokal untuk acara-acara besar kampus.",
    details: "Selama memegang dan mengelola akun media sosial Universitas Muhammadiyah Surakarta (UMS), saya bertanggung jawab penuh atas seluruh siklus produksi konten pemasaran lembaga. Peran ini menuntut saya untuk aktif mulai dari merancang ide kreatif, hingga terjun langsung sebagai talent dalam eksekusi pembuatan konten promosi. Selain itu, saya juga secara rutin menganalisis dan mengevaluasi performa konten yang telah dipublikasikan sebagai landasan untuk menyusun strategi perbaikan pada kampanye berikutnya.",
    tags: ["Content Strategy", "Content Writing", "Video Production", "Analytics"],
    bg: "linear-gradient(135deg, rgba(35,58,102,0.1) 0%, rgba(35,58,102,0.2) 100%)",
    mediaType: "video",
    mediaUrl: "/video/mas.mp4",
    projectUrl: "https://www.instagram.com/reel/DNFoJrcyN7k/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: "proj-4",
    title: "Artikel Liputan Kampanye 'Attachment Style' di Kompasiana",
    category: "Journalistic",
    categoryColor: "#D7A859",
    
    desc: "Menulis artikel jurnalistik bergaya feature yang membedah isu psikologi hubungan dan keterikatan emosional di portal media online Kompasiana.",
    details: "Menyusun artikel liputan komprehensif mengenai kampanye edukasi 'Attachment Talk' yang diselenggarakan di Car Free Day (CFD) Surakarta. Tulisan ini tidak sekadar melaporkan jalannya acara, melainkan mengemas narasi psikologi—seperti tipe attachment secure, avoidant, anxious, dan disorganized—menjadi bacaan populer yang mudah dipahami oleh pembaca awam.\n\nKeberhasilan utama dari penulisan artikel ini adalah kemampuan mengambil angle berita yang unik, yaitu memadukan teori psikologi modern dengan nilai-nilai komunikasi Islam (Hablumminannas dan Hablumminallah), serta diperkuat dengan kutipan observasi dari Psikolog ahli. Proyek ini membuktikan kemampuan saya dalam copywriting, riset jurnalisme dasar, serta adaptasi gaya penulisan untuk platform user-generated content (UGC) media nasional.",
    tags: ["Journalism", "Copywriting", "Feature Writing", "Media Online"],
    bg: "linear-gradient(135deg, rgba(215,168,89,0.1) 0%, rgba(215,168,89,0.2) 100%)",
    mediaType: "image",
    mediaUrl: "/photo/kompas.png",
    mediaUrls:['/photo/kompas.png'],
    projectUrl: "https://www.kompasiana.com/roseliapuspita7510/69452f19ed6415364a1736d2/mahasiswa-ums-bangun-kesadaran-diri-pada-generasi-muda-melalui-kampanye-attachment-style",
  },

  {
    id: "proj-5",
    title: "Content Creator at Lima Studio",
    category: "Content Creator",
    categoryColor: "var(--accent-primary)",
    desc: "Memproduksi dan editing video untuk konten pemasaran",
    details: "Sebagai content creator di Lima Studio, saya bertanggung jawab untuk memproduksi dan mengedit konten video untuk berbagai kebutuhan promosi. Konten yang saya produksi meliputi video reels, dan video untuk media sosial lainnya. Saya juga bertanggung jawab untuk mengedit video sesuai dengan kebutuhan klien. Selain itu, saya juga menjadi host live untuk memasarkan produk klien, mulai dari produk FnB dan obat-obatan.",
    tags: ["Content Creation", "Video Editing", "Host Live", "Click Up"],
    bg: "linear-gradient(135deg, rgba(255,140,60,0.12) 0%, rgba(255,140,60,0.22) 100%)",
    mediaType: "image",
    mediaUrl: "/photo/lima.png",
    mediaUrls:['/photo/lima.png'],
    projectUrl: "",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* JS Animation Engine */}
      <AnimationEngine />

      {/* Decorative Background Orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* Shared Navbar — same as homepage */}
      <Navbar isProjectPage />

      {/* Main Showcase Layout */}
      <main style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div className="container">
          {/* Header Title Section */}
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Galeri Portofolio</div>
            <h1
              className="section-title"
              style={{
                fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                marginBottom: "1.25rem",
              }}
            >
              Showcase Media Proyek
            </h1>
            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8, fontSize: "1.05rem" }}>
              Putar video dokumentasi, lihat hasil liputan, rilis media, dan presentasi ilmiah saya secara langsung dalam satu halaman tanpa hambatan.
            </p>
          </div>

          {/* Editorial Magazine Showcase */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                id={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative" }}
              >
                {/* Project number accent */}
                <div style={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: 0,
                  fontSize: "clamp(5rem, 10vw, 8rem)",
                  fontWeight: 900,
                  color: "rgba(35, 58, 102, 0.04)",
                  lineHeight: 1,
                  fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                  userSelect: "none",
                  pointerEvents: "none",
                  zIndex: 0,
                }}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* ── HERO MEDIA ── */}
                  <div style={{
                    position: "relative",
                    width: "100%",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    aspectRatio: "16 / 8",
                    background: project.bg,
                    boxShadow: "0 24px 64px rgba(35, 58, 102, 0.12), 0 4px 16px rgba(0,0,0,0.06)",
                    marginBottom: "2rem",
                  }}>
                    {/* Media — carousel or single */}
                    {project.mediaUrls && project.mediaUrls.length > 1 ? (
                      <MediaCarousel urls={project.mediaUrls} title={project.title} />
                    ) : project.mediaType === "video" ? (
                      project.mediaUrl.includes("youtube.com") || project.mediaUrl.includes("youtu.be") ? (
                        <iframe
                          src={project.mediaUrl}
                          title={project.title}
                          loading="lazy"
                          style={{ width: "100%", height: "100%", border: 0 }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={project.mediaUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.mediaUrl}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    )}

                    {/* Cinematic vignette overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(10,12,20,0.55) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }} />

                    {/* Top-left: media type badge */}
                    <div style={{
                      position: "absolute", top: "1.25rem", left: "1.25rem",
                      display: "flex", alignItems: "center", gap: "0.4rem",
                      padding: "0.35rem 0.9rem",
                      borderRadius: "99px",
                      background: "rgba(0,0,0,0.40)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "0.7rem", fontWeight: 700,
                      color: "#fff", letterSpacing: "0.08em",
                      textTransform: "uppercase", pointerEvents: "none",
                    }}>
                      {project.mediaType === "video" ? (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          Video
                        </>
                      ) : (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                          Foto
                        </>
                      )}
                    </div>

                    {/* Bottom: emoji + category */}
                    <div style={{
                      position: "absolute", bottom: "1.5rem", left: "1.75rem",
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      pointerEvents: "none",
                    }}>
                      <span style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}>
                        {project.emoji}
                      </span>
                      <span style={{
                        padding: "0.3rem 0.9rem", borderRadius: "99px",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                        border: `1px solid ${project.categoryColor}60`,
                        fontSize: "0.72rem", fontWeight: 700,
                        color: "#fff", letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}>
                        {project.category}
                      </span>
                      {project.impact && (
                        <span style={{
                          padding: "0.3rem 0.9rem", borderRadius: "99px",
                          background: "rgba(255,110,128,0.25)",
                          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,110,128,0.45)",
                          fontSize: "0.72rem", fontWeight: 700,
                          color: "#fff", letterSpacing: "0.04em",
                        }}>
                          {project.impact}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── CONTENT BELOW MEDIA ── */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
                    gap: "3rem",
                    alignItems: "start",
                    padding: "0 0.5rem",
                  }}>
                    {/* Left: title + tags */}
                    <div>
                      <h2 style={{
                        fontSize: "clamp(1.4rem, 3vw, 2rem)",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                        fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                        lineHeight: 1.25,
                        marginBottom: "1.25rem",
                      }}>
                        {project.title}
                      </h2>
                      {/* Decorative rule */}
                      <div style={{
                        width: "2.5rem", height: "3px",
                        borderRadius: "99px",
                        background: project.categoryColor,
                        marginBottom: "1.25rem",
                      }} />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={{
                            padding: "0.3rem 0.8rem",
                            borderRadius: "99px",
                            fontSize: "0.7rem", fontWeight: 500,
                            background: "rgba(0,0,0,0.04)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-secondary)",
                            whiteSpace: "nowrap",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: description & Link */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start" }}>
                      <p style={{
                        fontSize: "0.95rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.9,
                        whiteSpace: "pre-line",
                        textAlign: "justify",
                        margin: 0,
                      }}>
                        {project.details}
                      </p>
                      {project.projectUrl && project.projectUrl !== "" && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{
                            padding: "0.6rem 1.2rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
