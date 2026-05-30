export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid var(--border-subtle)",
      padding: "2.5rem 0",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div style={{
          fontSize: "1.2rem",
          fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
          fontWeight: 700,
          color: "var(--accent-primary)",
        }}>
          annebilla<span style={{ color: "var(--accent-lavender)" }}>.</span>
        </div>

        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          © {year} Annebilla · Communication Science
        </p>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Instagram", "LinkedIn", "Email"].map((link) => (
            <a
              key={link}
              href="#"
              className="footer-link"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .footer-link {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: var(--accent-primary);
        }
      `}</style>
    </footer>
  );
}
