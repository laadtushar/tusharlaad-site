/**
 * The LabyNator family, in one place.
 *
 * Source of truth: labynator `src/lib/apps.ts` (repo laadtushar/labynator,
 * branch master). Names, blurbs and URLs below are copied from it. When that
 * file changes, change this one to match, and nothing else: the footer block,
 * the product links and the JSON-LD sameAs all read from here.
 *
 * Every URL is the final host that actually serves the page, so no link on the
 * site goes through a redirect. On Vercel each apex redirects to its www host;
 * XpenseLab is the exception, where the apex is canonical.
 */

export const family = {
  studio: { name: "LabyNator", url: "https://www.labynator.com" },
  founder: { name: "Tushar Laad", url: "https://www.tusharlaad.com" },
  apps: [
    { slug: "memrylab", name: "MemryLab", blurb: "Local AI Memory", url: "https://www.memrylab.com" },
    { slug: "xpenselab", name: "XpenseLab", blurb: "Expense tracking", url: "https://xpenselab.com" },
    { slug: "hyredlab", name: "HyredLab", blurb: "Job tracking", url: "https://www.hyredlab.com" },
    { slug: "edytlab", name: "edytlab", blurb: "AI audio editor", url: "https://www.edytlab.com" },
  ],
} as const;

export type FamilyApp = (typeof family.apps)[number];

/** URL of one app by slug, so content.ts never restates a family URL. */
export function familyUrl(slug: FamilyApp["slug"]): string {
  return family.apps.find((a) => a.slug === slug)!.url;
}
