import type { Metadata } from "next";
import Link from "next/link";
import {
  education,
  products,
  profile,
  publication,
  roles,
  stack,
} from "@/lib/content";
import { Label } from "@/components/ui";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae for ${profile.name}: data engineer at DoorFeed, founder of LabyNator, founding engineer at Treacle.`,
  alternates: { canonical: "/cv" },
};

/**
 * The CV route is the resume file. It reads the same content object as the
 * homepage, and the print stylesheet strips the chrome, so pressing print here
 * produces the PDF. There is no separate document to keep in sync.
 */
export default function CvPage() {
  return (
    <main className="mx-auto w-full max-w-[52rem] px-4 py-10 sm:px-6 print:max-w-none print:px-0 print:py-0">
      <div className="no-print pb-8">
        <Link
          href="/"
          data-underline className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-2"
        >
          Back to the site
        </Link>
        <p className="measure pt-3 text-sm text-ink-3">
          Print this page to save it as a PDF. It is generated from the same
          source as the homepage, so it is never out of date.
        </p>
      </div>

      <header className="print-break flex flex-col gap-2 border-b border-rule pb-5">
        <h1 className="text-3xl font-semibold tracking-[-0.035em]">
          {profile.name}
        </h1>
        <p className="text-[0.95rem] leading-snug text-ink">
          {profile.headline} {profile.subhead}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1 pt-1 font-mono text-[0.7rem] text-ink-2">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`} className="underline decoration-ink-3">
            {profile.email}
          </a>
          <a href={`https://${profile.domain}`} className="underline decoration-ink-3">
            {profile.domain}
          </a>
          {profile.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ink-3"
            >
              {l.label}
            </a>
          ))}
        </p>
      </header>

      <section className="pt-7">
        <Label>Experience</Label>
        {roles.map((r) => (
          <article
            key={`${r.org}-${r.from}`}
            className="cv-reveal print-break border-t border-rule py-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-[1.02rem] font-semibold tracking-[-0.02em]">
                {r.title}, {r.org}
              </h2>
              <p className="tnum font-mono text-[0.7rem] text-ink-3">
                {r.from} to {r.to}
                {r.concurrent ? " (concurrent)" : ""}
              </p>
            </div>
            <p className="pt-1.5 text-sm leading-relaxed text-ink-2">{r.summary}</p>
            <ul className="flex list-disc flex-col gap-1 pl-4 pt-2 text-sm leading-relaxed text-ink-2 marker:text-ink-3">
              {r.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="pt-7">
        <Label>Products shipped</Label>
        <ul className="border-t border-rule pt-4">
          {products.map((p) => (
            <li key={p.slug} className="cv-reveal print-break pb-3 text-sm leading-relaxed">
              <span className="font-semibold">{p.name}.</span>{" "}
              <span className="text-ink-2">{p.tagline}</span>{" "}
              <span className="font-mono text-[0.7rem] text-ink-3">
                {p.domain ? (
                  <a
                    href={`https://${p.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-ink-3"
                  >
                    {p.domain}
                  </a>
                ) : (
                  "in development"
                )}
                {p.playStore ? (
                  <>
                    {" / "}
                    <a
                      href={p.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} on the Google Play Store`}
                      className="underline decoration-ink-3"
                    >
                      Play Store
                    </a>
                  </>
                ) : null}
                {p.repo ? (
                  <>
                    {" / "}
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} source on GitHub`}
                      className="underline decoration-ink-3"
                    >
                      Source
                    </a>
                  </>
                ) : null}
                {" / "}
                {p.stack.slice(0, 3).join(", ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-5">
        <Label>Education</Label>
        {education.map((e) => (
          <article key={e.org} className="cv-reveal print-break border-t border-rule py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-[1.02rem] font-semibold tracking-[-0.02em]">
                {e.award}, {e.org}
                {e.grade ? (
                  <span className="ml-2 font-mono text-[0.7rem] text-amber">
                    {e.grade}
                  </span>
                ) : null}
              </h2>
              <p className="tnum font-mono text-[0.7rem] text-ink-3">
                {e.from} to {e.to}
              </p>
            </div>
            {e.detail ? (
              <p className="pt-1.5 text-sm leading-relaxed text-ink-2">{e.detail}</p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="print-break border-t border-rule pt-5">
        <Label>Writing</Label>
        <p className="pt-2 text-sm leading-relaxed text-ink-2">
          <span className="text-ink">{publication.title}.</span> {publication.note}
        </p>
      </section>

      <section className="print-break pt-5">
        <Label>Stack</Label>
        <p className="pt-2 font-mono text-[0.76rem] leading-relaxed text-ink-2">
          {stack.join(" / ")}
        </p>
      </section>
    </main>
  );
}
