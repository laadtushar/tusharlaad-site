import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { education, lab, profile, roles } from "@/lib/content";
import { FamilyFooter } from "@/components/family-footer";
import "./globals.css";

/* next/font self-hosts these at build time, so no CDN request and no layout shift. */
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/* The www host. The apex 308-redirects to it, so a canonical or og:url naming
   the apex points search engines at a URL that never serves a page. */
const url = profile.url;

/*
 * This is the home page's metadata. Every other page builds its own whole block
 * with pageMetadata() in lib/seo.ts, because a page that sets openGraph
 * replaces this one rather than adding to it. The share image comes from
 * app/opengraph-image.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: profile.metaTitle,
    template: `%s, ${profile.name}`,
  },
  description: profile.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: profile.metaTitle,
    description: profile.metaDescription,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.metaTitle,
    description: profile.metaDescription,
  },
  robots: { index: true, follow: true },
};

/*
 * Three people share this name on LinkedIn, and search currently mixes him with
 * a composer and two others. The sameAs block is what collapses those into one
 * identity and ranks this domain first, so it is a requirement, not a nicety.
 */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url,
  email: `mailto:${profile.email}`,
  /* Read from the roles, never restated. This block exists to tell three
     people of the same name apart, so publishing a different job title from
     the page it sits on defeats the only thing it is for. */
  jobTitle: roles[0].title,
  /* Every role marked current, so the founder role at LabyNator is here
     because content.ts says he holds it, not because this file restates it.
     LabyNator carries its url; DoorFeed has no public site to point at. */
  worksFor: roles
    .filter((r) => r.kind === "current")
    .map((r) => ({
      "@type": "Organization",
      name: r.org,
      ...(r.org === lab.name ? { url: lab.url } : {}),
    })),
  ...(profile.portrait ? { image: new URL(profile.portrait.src, url).href } : {}),
  // Derived from profile.location, never restated. He moved to London; this
  // block said Newcastle for as long as it was written by hand.
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.split(",")[0].trim(),
    addressCountry: "GB",
  },
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.org,
  })),
  sameAs: profile.sameAs,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        {children}
        <FamilyFooter />
      </body>
    </html>
  );
}
