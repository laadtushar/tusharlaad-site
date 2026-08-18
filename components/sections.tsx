import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  contributions,
  education,
  features,
  lab,
  ledger,
  products,
  profile,
  publication,
  quotes,
  roles,
  stack,
  type Product,
  type Role,
} from "@/lib/content";
import { Axis, Chips, ExternalLink, Figure, Grid, Heading, Label, Shell, Span, StatusTag, Tile } from "./ui";
import { CopyEmail } from "./copy-email";

/* Client-only and dynamically imported, so it never blocks first paint and
   never runs during server rendering. */
const HeroField = dynamic(() => import("./hero-field"));

/* ---------------------------------------------------------------- console */

export function Console() {
  return (
    <Shell>
      <Grid className="enter border border-rule lg:grid-cols-3">
        <Tile className="relative isolate overflow-hidden flex flex-col gap-6 py-10 sm:py-14 lg:col-span-3">
          {features.heroField ? <HeroField /> : null}
          <div className="relative flex flex-col gap-4">
            <h1 className="text-balance text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              {profile.name}
            </h1>
            <p className="max-w-[24ch] text-balance text-xl font-medium leading-[1.2] tracking-[-0.025em] text-ink sm:text-2xl">
              {profile.headline}
            </p>
            <p className="measure text-[0.95rem] leading-relaxed text-ink-2">
              {profile.subhead}
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2">
            {profile.available ? (
              <p className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-good">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-good" />
                {profile.availableLabel}
              </p>
            ) : null}
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-3">
              {profile.location}
            </p>
          </div>

          <ul className="relative flex flex-wrap gap-1.5">
            <li>
              <Link
                href="/cv"
                className="inline-block border border-amber px-2.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-amber transition-colors hover:bg-amber hover:text-ground"
              >
                Read the CV
              </Link>
            </li>
            {profile.links.map((l) => (
              <li key={l.href}>
                <ExternalLink
                  href={l.href}
                  className="inline-block border border-rule-2 px-2.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-ink-2 no-underline transition-colors hover:border-amber hover:text-amber"
                >
                  {l.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile className="flex flex-col gap-2 bg-panel-2">
          <Label>Now</Label>
          <p className="text-sm leading-relaxed text-ink-2">
            <span className="font-mono text-[0.8rem] text-amber">
              {profile.now.date}.
            </span>{" "}
            {profile.now.body}
          </p>
        </Tile>

        <Tile className="flex flex-col gap-2 bg-panel-2">
          <Label>Shipped</Label>
          <p className="text-sm leading-relaxed text-ink-2">
            A rent-regulation service from empty repo to production in{" "}
            <strong className="font-semibold text-amber">27 days</strong>, now
            serving <strong className="font-semibold text-amber">2,512</strong>{" "}
            ceilings. An agent tool server of{" "}
            <strong className="font-semibold text-amber">105</strong> tools. A
            dating app shipped alone.
          </p>
        </Tile>

        <Tile className="flex flex-col gap-3 bg-panel-2">
          <Label>Stack</Label>
          <Chips items={stack} />
        </Tile>
      </Grid>
    </Shell>
  );
}

/* -------------------------------------------------------------------- lab */

function ProductCell({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <Tile
      as="article"
      className={`flex flex-col gap-3 ${featured ? "gap-4 bg-panel-2 sm:col-span-3 sm:p-8" : ""}`}
    >
      {product.image ? (
        <div className="enter-wipe relative -mx-5 -mt-5 mb-1 aspect-[16/10] overflow-hidden border-b border-rule sm:-mx-6 sm:-mt-6">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            /* The featured cell spans all three columns inside a 1180px shell;
               the rest are a third of it. Asking for 50vw everywhere fetched
               roughly four times the pixels a small cell can show. */
            sizes={
              featured
                ? "(max-width: 640px) 100vw, 1120px"
                : "(max-width: 640px) 100vw, 380px"
            }
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <h3
          className={`font-semibold tracking-[-0.025em] ${featured ? "text-2xl" : "text-lg"}`}
          style={{ viewTransitionName: `title-${product.slug}` }}
        >
          {product.name}
        </h3>
        <StatusTag status={product.status} />
      </div>

      <p className="text-[0.95rem] font-medium leading-snug text-ink">
        {product.tagline}
      </p>
      <p className="measure text-sm leading-relaxed text-ink-2">
        {product.summary}
      </p>

      {product.metrics ? (
        <dl className="flex flex-wrap gap-x-6 gap-y-1 border-t border-rule pt-3">
          {product.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-1.5">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-mono text-sm">
                <Figure value={m.value} source={m.source} />
              </dd>
              <dd className="text-xs text-ink-3">{m.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <Chips items={product.stack} />

      <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 font-mono text-[0.68rem] ${featured ? "" : "mt-auto"}`}>
        {product.caseStudy ? (
          <li>
            <Link
              href={`/work/${product.slug}`}
              aria-label={`How ${product.name} works`}
              className="text-amber underline decoration-amber/40 hover:decoration-amber"
            >
              How it works
            </Link>
          </li>
        ) : null}
        {product.domain ? (
          <li>
            <ExternalLink href={`https://${product.domain}`}>
              {product.domain}
            </ExternalLink>
          </li>
        ) : null}
        {product.repo ? (
          <li>
            <ExternalLink
              href={product.repo}
              ariaLabel={`${product.name} source on GitHub`}
              className="text-ink-2 decoration-ink-3"
            >
              Source
            </ExternalLink>
          </li>
        ) : null}
      </ul>
    </Tile>
  );
}

export function Lab() {
  const labProducts = products.filter((p) => p.owner === "labynator");
  const [treacle] = products.filter((p) => p.owner === "treacle");
  const [lead, ...rest] = labProducts;

  return (
    <Shell>
      <section id="work" className="pt-16 sm:pt-24">
        <div className="flex flex-col gap-3 pb-6">
          <Heading>{lab.name}</Heading>
          <p className="measure text-[0.95rem] leading-relaxed text-ink-2">
            {lab.blurb}{" "}
            <ExternalLink href={`https://${lab.domain}`}>{lab.domain}</ExternalLink>
          </p>
        </div>
        <Grid className="border border-rule sm:grid-cols-3">
          <ProductCell product={lead} featured />
          {rest.map((p) => (
            <ProductCell key={p.slug} product={p} />
          ))}
        </Grid>

        {treacle ? (
          <div className="pt-14">
            <div className="flex flex-col gap-3 pb-6">
              <Heading>Treacle</Heading>
              <p className="measure text-[0.95rem] leading-relaxed text-ink-2">
                A separate company, not part of the lab. I joined as founding
                engineer and shipped the product alone.
              </p>
            </div>
            <Grid className="border border-rule">
              <ProductCell product={treacle} featured />
            </Grid>
          </div>
        ) : null}
      </section>
    </Shell>
  );
}

/* ----------------------------------------------------------------- quotes */

export function Quotes() {
  return (
    <Shell>
      <section className="pt-16 sm:pt-24">
        <Heading className="pb-6">What people who managed me said</Heading>
        <Grid className="border border-rule sm:grid-cols-3">
          {quotes.map((q) => (
            <Tile as="article" key={q.name} className="flex flex-col gap-3">
              <blockquote className="text-sm leading-relaxed text-ink">
                {q.body}
              </blockquote>
              <footer className="mt-auto flex flex-col gap-0.5 border-t border-rule pt-3">
                <span className="text-sm font-semibold">{q.name}</span>
                <span className="text-xs text-ink-2">{q.role}</span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.09em] text-ink-3">
                  {q.relationship}
                </span>
              </footer>
            </Tile>
          ))}
        </Grid>
      </section>
    </Shell>
  );
}

/* ------------------------------------------------------------------ roles */

export function RoleRow({ role, compact = false }: { role: Role; compact?: boolean }) {
  return (
    <div className="role print-break grid gap-x-6 gap-y-2 border-t border-rule py-5 sm:grid-cols-[10rem_1fr] sm:py-6">
      <div className="flex flex-col gap-1">
        <p className="tnum font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-3">
          {role.from} to {role.to}
        </p>
        <p className="text-xs text-ink-3">{role.location}</p>
        {role.concurrent ? (
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-amber">
            Concurrent
          </p>
        ) : null}
        <Span from={role.from} to={role.to} current={role.kind === "current"} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em]">
          {role.title}, {role.org}
        </h3>
        <p className="measure text-sm leading-relaxed text-ink-2">{role.summary}</p>
        {role.caseStudy ? (
          <Link
            href={`/work/${role.caseStudy}`}
            className="w-fit font-mono text-[0.68rem] text-amber underline decoration-amber/40 hover:decoration-amber"
          >
            How the rent-regulation service works
          </Link>
        ) : null}
        {!compact && role.points.length > 1 ? (
          <ul className="measure flex list-disc flex-col gap-1.5 pl-4 text-sm leading-relaxed text-ink-2 marker:text-ink-3">
            {role.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function Experience() {
  const current = roles.filter((r) => r.kind === "current");
  const founding = roles.filter((r) => r.kind === "founding");
  const rest = roles.filter((r) => r.kind !== "founding" && r.kind !== "current");

  return (
    <Shell>
      <section id="cv" className="pt-16 sm:pt-24">
        <div className="flex flex-col gap-3 pb-2">
          <Heading>Where I have worked</Heading>
          <p className="measure text-[0.95rem] leading-relaxed text-ink-2">
            Some of these ran at the same time. That is deliberate rather than a
            typo: the lab and Treacle were built alongside a full-time job. The
            bars below sit on one shared axis, so the overlap is visible instead
            of looking like a mistake.
          </p>
          <Axis />
        </div>

        <div className="roles pt-6">
          <Label>Now</Label>
          {current.map((r) => (
            <RoleRow key={r.org} role={r} />
          ))}
        </div>

        <div className="roles pt-10">
          <Label>Founding roles</Label>
          {founding.map((r) => (
            <RoleRow key={r.org} role={r} />
          ))}
        </div>

        <div className="roles pt-10">
          <Label>Before that</Label>
          {rest.map((r) => (
            <RoleRow key={r.org} role={r} compact={r.kind === "earlier"} />
          ))}
        </div>

        <div className="pt-10">
          <Label>Education</Label>
          {education.map((e) => (
            <div
              key={e.org}
              className="print-break grid gap-x-6 gap-y-2 border-t border-rule py-5 sm:grid-cols-[10rem_1fr]"
            >
              <p className="tnum font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-3">
                {e.from} to {e.to}
              </p>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em]">
                  {e.award}, {e.org}
                  {e.grade ? (
                    <span className="ml-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-amber">
                      {e.grade}
                    </span>
                  ) : null}
                </h3>
                {e.detail ? (
                  <p className="measure text-sm leading-relaxed text-ink-2">
                    {e.detail}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
          <div className="print-break grid gap-x-6 gap-y-2 border-t border-rule py-5 sm:grid-cols-[10rem_1fr]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-3">
              Writing
            </p>
            <p className="measure text-sm leading-relaxed text-ink-2">
              <span className="text-ink">{publication.title}.</span>{" "}
              {publication.note}
            </p>
          </div>
        </div>
      </section>
    </Shell>
  );
}

/* ----------------------------------------------------------------- ledger */

export function Ledger() {
  return (
    <Shell>
      <section id="ledger" className="pt-16 sm:pt-24">
        <Heading className="pb-6">Everything else</Heading>
        <ul className="border-t border-rule">
          {ledger.map((e) => (
            <li
              key={e.name}
              className="grid gap-x-6 gap-y-1.5 border-b border-rule py-4 sm:grid-cols-[4rem_1fr_9rem]"
            >
              <span className="tnum font-mono text-[0.72rem] text-ink-3">
                {e.year}
              </span>
              <div className="flex flex-col gap-1">
                <span className="flex flex-wrap items-center gap-2">
                  {e.href ? (
                    <ExternalLink href={e.href} className="text-sm font-semibold text-ink decoration-ink-3">
                      {e.name}
                    </ExternalLink>
                  ) : (
                    <span className="text-sm font-semibold">{e.name}</span>
                  )}
                  <StatusTag status={e.status} />
                </span>
                <span className="measure text-sm leading-relaxed text-ink-2">
                  {e.note}
                </span>
              </div>
              <span className="font-mono text-[0.66rem] leading-relaxed text-ink-3">
                {e.stack}
              </span>
            </li>
          ))}
        </ul>

        <div className="pt-10">
          <Label>Contributions to projects I did not start</Label>
          <ul className="border-t border-rule">
            {contributions.map((c) => (
              <li
                key={c.name}
                className="grid gap-x-6 gap-y-1 border-b border-rule py-4 sm:grid-cols-[4rem_1fr_9rem]"
              >
                <span className="font-mono text-[0.72rem] text-ink-3">Fork</span>
                <div className="flex flex-col gap-1">
                  <ExternalLink href={c.href} className="text-sm font-semibold text-ink decoration-ink-3">
                    {c.name}
                  </ExternalLink>
                  <span className="measure text-sm leading-relaxed text-ink-2">
                    {c.note}
                  </span>
                </div>
                <span className="font-mono text-[0.66rem] leading-relaxed text-ink-3">
                  {c.upstream}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}

/* ----------------------------------------------------------------- footer */

export function Footer() {
  return (
    <Shell>
      <footer className="mt-16 border-t border-rule py-10 sm:mt-24">
        <div className="flex flex-col gap-5">
          <p className="measure text-lg font-medium leading-snug tracking-[-0.02em]">
            {profile.available
              ? "Open to work. The fastest way to reach me is email."
              : "The fastest way to reach me is email."}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.7rem]">
            <li>
              <CopyEmail email={profile.email} />
            </li>
            {profile.links.map((l) => (
              <li key={l.href}>
                <ExternalLink href={l.href} className="text-ink-2 decoration-ink-3">
                  {l.label}
                </ExternalLink>
              </li>
            ))}
            <li>
              <Link href="/cv" className="text-ink-2 underline decoration-ink-3">
                CV
              </Link>
            </li>
            <li>
              <Link href="/writing" className="text-ink-2 underline decoration-ink-3">
                Writing
              </Link>
            </li>
          </ul>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-3">
            {profile.location}
          </p>
        </div>
      </footer>
    </Shell>
  );
}
