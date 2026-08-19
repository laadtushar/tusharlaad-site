import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, productBySlug } from "@/lib/content";
import { Chips, ExternalLink, Figure, Label, StatusTag } from "@/components/ui";
import { Reveal, RevealRows } from "@/components/reveal";
import { CountUpAll } from "@/components/count-up";

export function generateStaticParams() {
  return products.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/work/${product.slug}` },
    openGraph: { title: product.name, description: product.tagline },
  };
}

const sections = [
  { key: "problem", heading: "The problem" },
  { key: "approach", heading: "The approach" },
  { key: "hard", heading: "The part that was actually hard" },
  { key: "outcome", heading: "Where it landed" },
] as const;

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product || !product.caseStudy) notFound();

  const { caseStudy } = product;

  return (
    <main className="mx-auto w-full max-w-[52rem] px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/#work"
        className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-2 underline decoration-ink-3"
      >
        Back to the lab
      </Link>

      <header className="flex flex-col gap-3 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            className="text-4xl font-semibold tracking-[-0.04em]"
            style={{ viewTransitionName: `title-${product.slug}` }}
          >
            {product.name}
          </h1>
          <StatusTag status={product.status} />
        </div>
        <p className="text-balance text-lg font-medium leading-snug text-ink">
          {product.tagline}
        </p>
        <p className="measure text-[0.95rem] leading-relaxed text-ink-2">
          {product.summary}
        </p>
        <div className="pt-2">
          <Chips items={product.stack} />
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 pt-2 font-mono text-[0.7rem]">
          {product.domain ? (
            <li>
              <ExternalLink href={`https://${product.domain}`}>
                {product.domain}
              </ExternalLink>
            </li>
          ) : null}
          {product.repo ? (
            <li>
              <ExternalLink href={product.repo} className="text-ink-2 decoration-ink-3">
                Source
              </ExternalLink>
            </li>
          ) : null}
        </ul>
      </header>

      {product.metrics ? (
        <RevealRows selector=".metric-cell"><dl
          className={`mt-10 grid gap-px border border-rule bg-rule ${
            /* Bento fills exactly: the column count follows the cell count. */
            product.metrics.length >= 3 ? "sm:grid-cols-3" : product.metrics.length === 2 ? "sm:grid-cols-2" : ""
          }`}
        >
          {product.metrics.map((m) => (
            <div key={m.label} className="metric-cell flex flex-col gap-1 bg-panel p-4">
              <dd className="font-mono text-xl">
                <Figure value={m.value} source={m.source} />
              </dd>
              <dt className="text-xs text-ink-2">{m.label}</dt>
            </div>
          ))}
        </dl></RevealRows>
      ) : null}

      <RevealRows selector=".case-section" className="flex flex-col gap-10 pt-12" stagger={0.08}>
        {sections.map((s) => (
          <section key={s.key} className="case-section flex flex-col gap-2">
            <Label>{s.heading}</Label>
            <p className="measure text-[0.98rem] leading-relaxed text-ink-2">
              {caseStudy[s.key]}
            </p>
          </section>
        ))}
      </RevealRows>

      <Reveal className="mt-16 border-t border-rule pt-6">
        <Label>The rest of the lab</Label>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-3 font-mono text-[0.72rem]">
          {products
            .filter((p) => p.slug !== product.slug && p.caseStudy)
            .map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="text-amber underline decoration-amber/40 hover:decoration-amber"
                >
                  {p.name}
                </Link>
              </li>
            ))}
        </ul>
      </Reveal>
      <CountUpAll />
    </main>
  );
}
