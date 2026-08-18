import type { MetadataRoute } from "next";
import { products, profile } from "@/lib/content";

const base = `https://${profile.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time, so it moves when the site is actually redeployed rather than
  // claiming freshness the content does not have.
  const lastModified = new Date();

  return [
    { url: base, priority: 1, changeFrequency: "monthly", lastModified },
    { url: `${base}/cv`, priority: 0.8, changeFrequency: "monthly", lastModified },
    { url: `${base}/writing`, priority: 0.7, changeFrequency: "monthly", lastModified },
    ...products
      .filter((p) => p.caseStudy)
      .map((p) => ({
        url: `${base}/work/${p.slug}`,
        priority: 0.6,
        changeFrequency: "yearly" as const,
        lastModified,
      })),
  ];
}
