import type { Metadata } from "next";
import { profile } from "@/lib/content";

/**
 * Every public page builds its metadata here.
 *
 * Why a helper and not a shared `openGraph` in the layout: a page that sets its
 * own `openGraph` replaces the layout's wholesale. /cv and /writing used to
 * inherit the home page's og:title, og:description and og:url (so a shared CV
 * link unfurled as the homepage), and /work/* lost og:url and og:image
 * altogether. Setting the whole block per page, from one function, means no
 * page can forget a field.
 *
 * `path` is the page's own path. metadataBase (the www host, in the layout)
 * turns it into the absolute URL for both the canonical and og:url, so the two
 * can never disagree.
 */

/** The share card is app/opengraph-image.tsx, 1200 x 630. */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${profile.name}: ${profile.headline}`,
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  /** The whole title, already carrying the name. Not passed through the layout template. */
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: profile.name,
      title,
      description,
      locale: "en_GB",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  };
}
