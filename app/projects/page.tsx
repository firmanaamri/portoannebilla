"use client";

import { motion } from "framer-motion";
import AnimationEngine from "../components/AnimationEngine";
import Navbar from "../components/Navbar";
import { useState, useEffect, useCallback, useRef } from "react";

interface ReelItem {
  url: string;
  title: string;
  tag?: string;
  desc?: string;
  creator?: string;
  audioTitle?: string;
  poster?: string;
}

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
  mediaType: "image" | "video" | "reels";
  mediaUrl: string;
  mediaUrls?: string[];
  reels?: ReelItem[];
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

// ── Phone Mockup Component for 9:16 Vertical Reels ──
function ReelPhoneMockup({
  reel,
  index,
  isUnmuted,
  onToggleSound,
}: {
  reel: ReelItem;
  index: number;
  isUnmuted: boolean;
  onToggleSound: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Sync mute state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isUnmuted;
    }
  }, [isUnmuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={togglePlay}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "270px",
        aspectRatio: "9 / 16",
        borderRadius: "2.2rem",
        overflow: "hidden",
        background: "#0c0f17",
        boxShadow:
          "0 20px 45px -10px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 8px 20px rgba(0,0,0,0.2)",
        border: "5px solid #1e2638",
        userSelect: "none",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Dynamic Island / Speaker Notch */}
      <div
        style={{
          position: "absolute",
          top: "0.55rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "64px",
          height: "13px",
          borderRadius: "99px",
          background: "#000",
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          pointerEvents: "none",
        }}
      >
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#1a2536" }} />
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#253b59" }} />
      </div>

      {/* Video element */}
      <video
        ref={videoRef}
        src={reel.url}
        autoPlay
        muted={!isUnmuted}
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Top Left: Tag Badge */}
      <div
        style={{
          position: "absolute",
          top: "1.75rem",
          left: "0.75rem",
          zIndex: 12,
          padding: "0.25rem 0.6rem",
          borderRadius: "99px",
          background: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.03em",
          pointerEvents: "none",
        }}
      >
        {reel.tag || `Reels ${index + 1}`}
      </div>

      {/* Top Right: Sound Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSound();
        }}
        aria-label={isUnmuted ? "Matikan suara" : "Nyalakan suara"}
        title={isUnmuted ? "Klik untuk mematikan suara" : "Klik untuk menyalakan suara"}
        style={{
          position: "absolute",
          top: "1.75rem",
          right: "0.75rem",
          zIndex: 14,
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          padding: "0.28rem 0.65rem",
          borderRadius: "99px",
          background: isUnmuted ? "var(--accent-primary, #ff6e80)" : "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: isUnmuted ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255, 255, 255, 0.2)",
          color: "#fff",
          fontSize: "0.65rem",
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {isUnmuted ? (
          <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <span>Audio ON</span>
          </>
        ) : (
          <>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            <span>Muted</span>
          </>
        )}
      </button>

      {/* Center Play Button indicator if paused */}
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "3.2rem",
            height: "3.2rem",
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 13,
            pointerEvents: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Bottom Reels Information Card */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "3rem 0.85rem 1.1rem",
          background: "linear-gradient(to top, rgba(10,12,20,0.92) 0%, rgba(10,12,20,0.6) 55%, transparent 100%)",
          color: "#fff",
          zIndex: 11,
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "var(--accent-primary, #ff6e80)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.55rem",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            {(reel.creator || "@annebilla").replace("@", "").slice(0, 2).toUpperCase()}
          </div>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>
            {reel.creator || "@annebilla"}
          </span>
        </div>

        <div style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.35, color: "#fff" }}>
          {reel.title}
        </div>

        {reel.desc && (
          <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.4 }}>
            {reel.desc}
          </div>
        )}

        {/* Audio ticker with sound bars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.63rem",
            color: "rgba(255,255,255,0.65)",
            marginTop: "0.2rem",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <span>{reel.audioTitle || `Audio Asli • ${reel.creator || "@annebilla"}`}</span>
          {isPlaying && isUnmuted && (
            <span style={{ display: "inline-flex", gap: "2px", alignItems: "flex-end", height: "11px", marginLeft: "4px" }}>
              <span className="sound-bar-1" />
              <span className="sound-bar-2" />
              <span className="sound-bar-3" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Dedicated Showcase Container for Multi-Reels (Option 2) ──
function ReelsShowcase({
  reels,
  bg,
  title,
  categoryColor,
  emoji,
  category,
}: {
  reels: ReelItem[];
  bg: string;
  title: string;
  categoryColor: string;
  emoji?: string;
  category: string;
}) {
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  const toggleSound = (idx: number) => {
    setUnmutedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "1.75rem",
        overflow: "hidden",
        background: bg,
        padding: "clamp(1.75rem, 4vw, 2.75rem) clamp(1rem, 3vw, 2rem)",
        boxShadow: "0 24px 64px rgba(35, 58, 102, 0.12), 0 4px 16px rgba(0,0,0,0.06)",
        border: "1px solid rgba(255,255,255,0.45)",
        marginBottom: "2rem",
      }}
    >
      {/* Decorative subtle background blur circle */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `${categoryColor}25`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Header bar inside Showcase */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
          padding: "0 0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {emoji && <span style={{ fontSize: "1.8rem" }}>{emoji}</span>}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "99px",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${categoryColor}50`,
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              9:16 Reels Showcase
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              {category === "On-Camera Talent" || category === "Talent & Host" ? "Showreel Video On-Camera Talent" : "Hasil Konten Video Vertikal"}
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            padding: "0.4rem 0.9rem",
            borderRadius: "99px",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
          <span>Klik video untuk Play/Pause &amp; aktifkan audio</span>
        </div>
      </div>

      {/* Grid of Phone Mockups */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.75rem",
          flexWrap: "wrap",
        }}
      >
        {reels.map((reel, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              flex: "1 1 250px",
              maxWidth: "280px",
              minWidth: "230px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ReelPhoneMockup
              reel={reel}
              index={idx}
              isUnmuted={unmutedIndex === idx}
              onToggleSound={() => toggleSound(idx)}
            />
          </motion.div>
        ))}
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
    emoji: "🎓",
    desc: "Bertanggung jawab atas publikasi konten press release dan hubungan dengan media lokal untuk acara-acara besar kampus.",
    details: "Selama memegang dan mengelola akun media sosial Universitas Muhammadiyah Surakarta (UMS), saya bertanggung jawab penuh atas seluruh siklus produksi konten pemasaran lembaga. Peran ini menuntut saya untuk aktif mulai dari merancang ide kreatif, hingga terjun langsung sebagai talent dalam eksekusi pembuatan konten promosi. Selain itu, saya juga secara rutin menganalisis dan mengevaluasi performa konten yang telah dipublikasikan sebagai landasan untuk menyusun strategi perbaikan pada kampanye berikutnya.",
    tags: ["Content Strategy", "Content Writing", "Video Production", "Analytics"],
    bg: "linear-gradient(135deg, rgba(35,58,102,0.1) 0%, rgba(35,58,102,0.2) 100%)",
    mediaType: "reels",
    mediaUrl: "/video/ums.mp4",
    mediaUrls: ['/video/ums.mp4', '/video/mas.mp4'],
    reels: [
      {
        url: "/video/ums.mp4",
        title: "Reels 01: Publikasi Konten Kehidupan Kampus",
        tag: "Social Media",
        desc: "Produksi konten promosi dan publikasi resmi universitas.",
        creator: "@umssurakarta",
      },
      {
        url: "/video/mas.mp4",
        title: "Reels 02: Menjadi Talent Video Promosi Kampus",
        tag: "Video Production",
        desc: "Menjadi salah satu talent video promosi untuk Universitas Muhammadiyah Surakarta",
        creator: "@umssurakarta",
      },
    ],
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
    emoji: "🎬",
    desc: "Memproduksi dan editing video untuk konten pemasaran",
    details: "Sebagai content creator di Lima Studio, saya bertanggung jawab untuk memproduksi dan mengedit konten video untuk berbagai kebutuhan promosi. Konten yang saya produksi meliputi video reels, dan video untuk media sosial lainnya. Saya juga bertanggung jawab untuk mengedit video sesuai dengan kebutuhan klien. Selain itu, saya juga menjadi host live untuk memasarkan produk klien, mulai dari produk FnB dan obat-obatan.",
    tags: ["Content Creation", "Video Editing", "Host Live", "Click Up"],
    bg: "linear-gradient(135deg, rgba(255,140,60,0.12) 0%, rgba(255,140,60,0.22) 100%)",
    mediaType: "reels",
    mediaUrl: "/photo/lima.png",
    mediaUrls: ['/photo/lima.png'],
    reels: [
      {
        url: "/video/lima1.mp4",
        title: "Reels 01: Gimmick Content",
        tag: "Live Selling",
        desc: "Video gimmick untuk mempromosikan suatu produk.",
        creator: "@lima.studio",
      },
      {
        url: "/video/lima2.mp4",
        title: "Reels 02: Entertainment",
        tag: "Video Editing",
        desc: "Video entertainment untuk mempromosikan suatu produk.",
        creator: "@lima.studio",
      },
      {
        url: "/video/lima3.mp4",
        title: "Reels 03: Edukasi",
        tag: "Content Marketing",
        desc: "Penyampaian value produk ringkas dan visual storytelling.",
        creator: "@lima.studio",
      },
      {
        url: "/video/lima4.mp4",
        title: "Reels 04: Edukasi",
        tag: "Content Marketing",
        desc: "Penyampaian value produk ringkas dan visual storytelling.",
        creator: "@lima.studio",
      },
    ],
    projectUrl: "",
  },
  {
    id: "proj-6",
    title: "On-Camera Talent & Host Showreel",
    category: "Talent & Host",
    categoryColor: "#8B5CF6",
    emoji: "🎙️",
    desc: "Kumpulan video penampilan sebagai on-camera talent, host live streaming, dan presenter video promosi",
    details: "Sebagai seorang komunikator, saya aktif tampil langsung di depan kamera (on-camera talent) untuk berbagai format konten digital. Pengalaman ini mencakup peran sebagai talent video promosi institusi, presenter liputan acara, hingga host live streaming e-commerce untuk produk komersial (FnB, kecantikan, dan kesehatan).\n\nFokus utama saya adalah menghadirkan public speaking yang artikulatif, ekspresi natural, penguasaan materi (product knowledge), serta kemampuan membangun keterikatan (engagement) yang kuat dengan penonton.",
    tags: ["On-Camera Talent", "Public Speaking", "Brand Presenter"],
    bg: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(255, 110, 128, 0.18) 100%)",
    mediaType: "reels",
    mediaUrl: "/video/talent1.mp4",
    mediaUrls: ['/video/talent1.mp4'],
    reels: [
      {
        url: "/video/talent1.mp4",
        title: "Talent Video 01: Podcast Campaign Attachment Style",
        tag: "On-Camera Talent",
        desc: "Hosting podcast yang membahas attachment style pada generasi muda",
        creator: "@annebilla",
      },
      {
        url: "/video/talent2.mp4",
        title: "Talent Video 02",
        tag: "Host Live",
        desc: "Pembawaan entertaining dan interaktif.",
        creator: "@annebilla",
      },
      {
        url: "/video/talent3.mp4",
        title: "Talent Video 03",
        tag: "Presenter",
        desc: "Pembawaan formal-kreatif yang percaya diri.",
        creator: "@annebilla",
      },
    ],
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
                  {project.mediaType === "reels" && project.reels ? (
                    <ReelsShowcase
                      reels={project.reels}
                      bg={project.bg}
                      title={project.title}
                      categoryColor={project.categoryColor}
                      emoji={project.emoji}
                      category={project.category}
                    />
                  ) : (
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
                  )}

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
