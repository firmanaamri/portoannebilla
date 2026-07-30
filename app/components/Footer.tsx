export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid var(--border-subtle)",
      padding: "2rem 0",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          © {year} Annebilla · Communication Science
        </div>
        <div className="container" style={{fontSize: "0.8rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.25rem", color: "var(--accent-primary)"}}>Build With Next.Js & Tailwind Css</div>
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
