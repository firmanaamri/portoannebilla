"use client";

import { CSSProperties, FormEvent, useState } from "react";
import { motion, Variants } from "framer-motion";

const CONTACT_EMAIL = "annebillanasywa@gmail.com";

const contacts = [
  {
    id: "contact-email",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "Email",
    value: "annebillanasywa@gmail.com",
    href: "mailto:annebillanasywa@gmail.com",
    desc: "Kirim pesan kapan saja",
    color: "#EA4335",
    bg: "rgba(234, 67, 53, 0.1)",
    border: "rgba(234, 67, 53, 0.25)",
  },
  {
    id: "contact-instagram",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: "Instagram",
    value: "@annblansywaa._",
    href: "https://instagram.com/annblansywaa._",
    desc: "Konten & keseharian",
    color: "#E4405F",
    bg: "rgba(228, 64, 95, 0.1)",
    border: "rgba(228, 64, 95, 0.25)",
  },
  {
    id: "contact-linkedin",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "Annebilla Nasywa",
    href: "https://linkedin.com/in/annebillanasywa",
    desc: "Profil profesional",
    color: "#0A66C2",
    bg: "rgba(10, 102, 194, 0.1)",
    border: "rgba(10, 102, 194, 0.25)",
  },
  {
    id: "contact-whatsapp",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+62 852-8129-9662",
    href: "https://wa.me/6285281299662",
    desc: "Respon cepat",
    color: "#25D366",
    bg: "rgba(37, 211, 102, 0.1)",
    border: "rgba(37, 211, 102, 0.25)",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const topic = subject.trim() || `Pesan dari ${name.trim()}`;
    const body = [
      `Nama: ${name.trim()}`,
      `Email: ${email.trim()}`,
      "",
      message.trim(),
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <section id="contact" className="theme-navy" style={{ position: "relative", overflow: "hidden" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2.75rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>Kontak</div>
          <h2 className="section-title">Mari Terhubung</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Terbuka untuk kolaborasi, kesempatan magang, proyek kreatif, atau sekadar berbincang tentang dunia komunikasi.
          </p>
        </motion.div>

        <div className="contact-layout">
          <motion.div
            className="card contact-panel contact-form-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
          >
            <div className="contact-panel-head">
              <span className="contact-kicker">Email</span>
              <h3 className="contact-panel-title">Kirim Pesan</h3>
              <p className="contact-panel-copy">
                Formulir ini membuka aplikasi email kamu, siap dikirim ke {CONTACT_EMAIL}.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-row">
                <div className="contact-field-wrap">
                  <label htmlFor="contact-name">Nama</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap"
                    className="contact-field"
                  />
                </div>
                <div className="contact-field-wrap">
                  <label htmlFor="contact-email-field">Email</label>
                  <input
                    id="contact-email-field"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@contoh.com"
                    className="contact-field"
                  />
                </div>
              </div>
              <div className="contact-field-wrap">
                <label htmlFor="contact-subject">Subjek</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Kolaborasi, magang, atau topik lain"
                  className="contact-field"
                />
              </div>
              <div className="contact-field-wrap">
                <label htmlFor="contact-message">Pesan</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesanmu di sini…"
                  className="contact-field contact-textarea"
                />
              </div>
              <button type="submit" className="btn-primary contact-submit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                Kirim via Email
              </button>
            </form>
          </motion.div>

          <motion.aside
            className="card contact-panel contact-aside"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="contact-panel-head">
              <span className="contact-kicker">Kanal</span>
              <h3 className="contact-panel-title">Temui Saya</h3>
              <p className="contact-panel-copy">
                Pilih kanal yang paling nyaman — respon paling cepat lewat WhatsApp atau email.
              </p>
            </div>

            <div className="contact-channels">
              {contacts.map((c) => (
                <motion.a
                  key={c.id}
                  id={c.id}
                  variants={linkVariants}
                  href={c.href}
                  className="contact-channel"
                  title={c.value}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ "--channel-color": c.color, "--channel-bg": c.bg, "--channel-border": c.border } as CSSProperties}
                >
                  <span className="contact-channel-icon">{c.icon}</span>
                  <span className="contact-channel-label">{c.label}</span>
                  <span className="contact-channel-value">{c.value}</span>
                  <span className="contact-channel-desc">{c.desc}</span>
                </motion.a>
              ))}
            </div>

            <motion.a
              id="contact-cv-download"
              href="/AnnebillaNasywaHamimmah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline contact-resume"
              variants={linkVariants}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Lihat Resume
            </motion.a>
          </motion.aside>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 1.5rem;
          align-items: stretch;
        }
        .contact-panel {
          display: flex;
          flex-direction: column;
          padding: 1.75rem 1.85rem 1.85rem;
          background: linear-gradient(160deg, rgba(255,110,128,0.07), rgba(215,168,89,0.03) 55%, rgba(255,255,255,0.02));
          border-color: rgba(255,110,128,0.14);
          min-height: 100%;
        }
        .contact-form-card:hover,
        .contact-aside:hover {
          transform: none !important;
        }
        .contact-panel-head {
          margin-bottom: 1.35rem;
        }
        .contact-kicker {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 0.45rem;
        }
        .contact-panel-title {
          font-family: var(--font-playfair, "Playfair Display", serif);
          font-size: 1.45rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.25;
          margin: 0 0 0.4rem;
        }
        .contact-panel-copy {
          font-size: 0.84rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          flex: 1;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
        }
        .contact-field-wrap label {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }
        .contact-field {
          width: 100%;
          padding: 0.78rem 0.95rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-textarea {
          resize: vertical;
          min-height: 108px;
          line-height: 1.65;
        }
        .contact-field::placeholder {
          color: var(--text-muted);
          opacity: 0.75;
        }
        .contact-field:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(255, 110, 128, 0.16);
        }
        .contact-submit {
          width: 100%;
          justify-content: center;
          margin-top: 0.25rem;
        }
        .contact-aside {
          gap: 0;
        }
        .contact-channels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          flex: 1;
        }
        .contact-channel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.28rem;
          padding: 1rem 1rem 1.05rem;
          border-radius: 14px;
          text-decoration: none;
          color: var(--text-primary);
          background: var(--channel-bg, rgba(255,255,255,0.03));
          border: 1px solid var(--channel-border, var(--border-subtle));
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          min-width: 0;
        }
        .contact-channel:hover {
          transform: translateY(-3px);
          border-color: var(--channel-color);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        }
        .contact-channel-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--channel-color);
          background: rgba(255, 255, 255, 0.04);
          margin-bottom: 0.35rem;
        }
        .contact-channel-icon svg {
          width: 18px;
          height: 18px;
        }
        .contact-channel-label {
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .contact-channel-value {
          font-size: 0.82rem;
          font-weight: 600;
          line-height: 1.35;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }
        .contact-channel-desc {
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .contact-resume {
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
          text-decoration: none;
        }
        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 560px) {
          .contact-form-row,
          .contact-channels {
            grid-template-columns: 1fr;
          }
          .contact-panel {
            padding: 1.4rem 1.25rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
