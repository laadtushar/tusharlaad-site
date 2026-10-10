import type { MetadataRoute } from "next";
import { products, profile } from "@/lib/content";

const base = profile.url;

/*
 * No lastModified. The old build-time Date stamped every URL with the deploy
 * moment, including case studies that had not changed in weeks, and a lastmod
 * that is wrong for most URLs teaches crawlers to ignore it. The repo holds no
 * per-page modification date to use instead, so the field is left out rather
 * than invented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1, changeFrequency: "monthly" },
    { url: `${base}/cv`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/writing`, priority: 0.7, changeFrequency: "monthly" },
    ...products
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${base}/work/${p.slug}`,
        priority: 0.6,
        changeFrequency: "yearly" as const,
      })),
  ];
}
