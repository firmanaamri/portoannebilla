import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Ganti URL ini dengan domain asli jika sudah dideploy (misalnya: https://annebilla.com)
  const baseUrl = "https://annebilla.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/_next/", // Melarang crawler memindai folder sistem internal Next.js
        "/static/",
        "/api/",    // Melarang crawler memindai folder API jika ada di masa depan
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
