import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

/* next/font self-hosts these at build time, so no CDN request and no layout shift. */
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const url = `https://${profile.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${profile.name}, software engineer`,
    template: `%s, ${profile.name}`,
  },
  description: profile.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url,
    siteName: profile.name,
    title: `${profile.name}, software engineer`,
    description: profile.metaDescription,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name}, software engineer`,
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
  jobTitle: "Software Engineer",
  // Derived from profile.location, never restated. He moved to London; this
  // block said Newcastle for as long as it was written by hand.
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.split(",")[0].trim(),
    addressCountry: "GB",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Newcastle University" },
    {
      "@type": "CollegeOrUniversity",
      name: "Symbiosis Institute of Computer Studies and Research",
    },
  ],
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
      </body>
    </html>
  );
}
