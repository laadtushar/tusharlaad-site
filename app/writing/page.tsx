import type { Metadata } from "next";
import Link from "next/link";
import { linkedinPosts, profile, writing } from "@/lib/content";
import { ExternalLink, Label } from "@/components/ui";
import { Reveal, RevealRows } from "@/components/reveal";
import { LinkedInPostRow } from "@/components/linkedin-post";

export const metadata: Metadata = {
  title: "Writing",
  description: `Essays and notes by ${profile.name}.`,
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <main className="mx-auto w-full max-w-[52rem] px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        data-underline className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-2"
      >
        Back to the site
      </Link>

      <header className="flex flex-col gap-3 pt-8">
        <h1 className="text-4xl font-semibold tracking-[-0.04em]">Writing</h1>
        <p className="measure text-[0.95rem] leading-relaxed text-ink-2">
          Occasional essays, mostly about engineering under uncertainty and the
          parts of a career nobody puts on a CV.
        </p>
      </header>

      <RevealRows selector=".article-row">
      <ul className="pt-10">
        {writing.map((a) => (
          <li key={a.href} className="article-row border-t border-rule py-6">
            <article className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-[1.1rem] font-semibold tracking-[-0.02em]">
                  <ExternalLink href={a.href} className="text-ink decoration-ink-3">
                    {a.title}
                  </ExternalLink>
                </h2>
                <p className="tnum font-mono text-[0.7rem] text-ink-3">
                  {a.date}, {a.where}
                </p>
              </div>
              <p className="measure text-sm leading-relaxed text-ink-2">{a.blurb}</p>
            </article>
          </li>
        ))}
      </ul>
      </RevealRows>

      <div className="mt-14 flex flex-col gap-3">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Posts</h2>
        <p className="measure text-sm leading-relaxed text-ink-2">
          Shorter pieces, on LinkedIn. Each loads in place when you ask for it,
          so this page stays light until you do.
        </p>
      </div>
      <RevealRows selector=".post-row">
        <ul className="pt-4">
          {linkedinPosts.map((post) => (
            <LinkedInPostRow key={post.urn} post={post} />
          ))}
        </ul>
      </RevealRows>

      <Reveal className="mt-12 border-t border-rule pt-6">
        <Label>Elsewhere</Label>
        <p className="pt-2 text-sm text-ink-2">
          Longer pieces go up on{" "}
          <ExternalLink href="https://tusharlaad.medium.com">Medium</ExternalLink>.
        </p>
      </Reveal>
    </main>
  );
}
