import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Bricolage_Grotesque({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Annebilla Nasywa | Public Relations & Media Social Specialist",
  description:
    "Portfolio Annebilla Nasywa — mahasiswa Ilmu Komunikasi yang berpengalaman di bidang public relations, konten kreatif, dan media sosial.",
  keywords: [
    "ilmu komunikasi",
    "public relations",
    "konten kreatif",
    "portfolio",
    "mahasiswa komunikasi",
  ],
  openGraph: {
    title: "Annebilla Nasywa | Public Relations & Media Social Specialist",
    description:
      "Portfolio Annebilla Nasywa | Public Relations & Media Social Specialist",
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
      data-scroll-behavior="smooth"
    >
      <body className="noise">{children}</body>
    </html>
  );
}
