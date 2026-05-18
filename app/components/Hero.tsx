"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const words = [
    "Public Relations",
    "Digital Konten Kreator",
    "Media Social Specialist",
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 30 : 60,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const profileVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 8px 30px rgba(201, 169, 110, 0.4)",
    transition: { type: "spring" as const, stiffness: 400, damping: 10 },
  };

  const outlineHover = {
    scale: 1.05,
    backgroundColor: "rgba(201, 169, 110, 0.08)",
    borderColor: "var(--accent-primary)",
    transition: { type: "spring" as const, stiffness: 400, damping: 10 },
  };

  return (
    <section
      id="hero"
      className="hero"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4rem",
            flexWrap: "wrap",
          }}
        >
          {/* Left Content */}
          <div style={{ flex: "1 1 460px", minWidth: 0 }}>
            <motion.div variants={itemVariants} className="hero-tag">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent-rose)",
                  display: "inline-block",
                  marginRight: 8,
                }}
              />
              Fresh Graduate Communication Science
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="hero-title"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              Halo, saya&nbsp;
              <span className="highlight">Annebilla</span>
            </motion.h1>

            {/* Tulisan bergerak (Typewriter role subtitle) */}
            <motion.div
              variants={itemVariants}
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--accent-primary)",
                fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                letterSpacing: "0.04em",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
                minHeight: "2.25rem",
              }}
            >
              <span
                style={{ textShadow: "0 0 20px rgba(201, 169, 110, 0.15)" }}
              >
                {words[index].substring(0, subIndex)}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "1.1em",
                  background: "var(--accent-rose)",
                  marginLeft: "2px",
                  borderRadius: "2px",
                  boxShadow: "0 0 8px var(--accent-rose)",
                }}
              />
            </motion.div>
            <motion.p variants={itemVariants} className="hero-desc">
              Passionate di bidang{" "}
              
              {" "}
              <strong style={{ color: "var(--text-primary)" }}>
                public relations
              </strong>
              dan{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                konten kreatif
              </strong>
              . Saya percaya komunikasi yang baik mampu mengubah cara pandang
              dan menggerakkan dunia.
            </motion.p>

            <motion.div
              variants={itemVariants}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <motion.a
                id="hero-cta-portfolio"
                href="#portfolio"
                className="btn-primary"
                whileHover={buttonHover}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#portfolio")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Lihat Portofolio
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </motion.a>
              <motion.a
                id="hero-cta-contact"
                href="#contact"
                className="btn-outline"
                whileHover={outlineHover}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Hubungi Saya
              </motion.a>
            </motion.div>
          </div>

          {/* Right — Profile Image with custom motion tilt & spring entrance */}
          <motion.div
            variants={profileVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              flex: "0 0 auto",
            }}
          >
            <div className="profile-ring" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "6px",
                  zIndex: 2,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/my.jpeg"
                  alt="Annebilla — Mahasiswa Ilmu Komunikasi"
                  width={360}
                  height={360}
                  className="profile-img"
                  priority
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>

            {/* Social badges */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: "📝", label: "Jurnalis" },
                { icon: "📢", label: "PR" },
                { icon: "🎬", label: "Content" },
              ].map((b, i) => (
                <motion.span
                  key={b.label}
                  className="badge"
                  style={{ fontSize: "0.72rem" }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {b.icon} {b.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
