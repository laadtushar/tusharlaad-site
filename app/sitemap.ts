import type { MetadataRoute } from "next";
import { products, profile } from "@/lib/content";

const base = `https://${profile.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    { url: `${base}/cv`, priority: 0.8 },
    { url: `${base}/writing`, priority: 0.7 },
    ...products
      .filter((p) => p.caseStudy)
      .map((p) => ({ url: `${base}/work/${p.slug}`, priority: 0.6 })),
  ];
}
