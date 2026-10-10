import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";

/*
 * Every route on this site is public, so nothing is disallowed: there is no
 * /api, no signed-in area and no auth callback to keep crawlers out of. If one
 * is ever added, disallow it here in the same change.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.url}/sitemap.xml`,
  };
}
