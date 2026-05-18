import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Ganti URL ini dengan domain asli jika sudah dideploy (misalnya: https://annebilla.com)
  const baseUrl = "https://annebilla.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Jika nanti kamu punya halaman tambahan seperti blog atau detail proyek,
    // kamu tinggal menambahkannya di array ini:
    // {
    //   url: `${baseUrl}/projects`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ];
}
