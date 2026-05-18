import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Annebilla — Ilmu Komunikasi | Portfolio",
  description:
    "Portfolio Annebilla — mahasiswa Ilmu Komunikasi yang berpengalaman di bidang jurnalistik, public relations, konten kreatif, dan media sosial.",
  keywords: [
    "ilmu komunikasi",
    "jurnalistik",
    "public relations",
    "konten kreatif",
    "portfolio",
    "mahasiswa komunikasi",
  ],
  openGraph: {
    title: "Annebilla — Portofolio Ilmu Komunikasi",
    description:
      "Menjelajahi dunia komunikasi melalui jurnalistik, PR, dan media kreatif.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${playfair.variable}`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
