import type { ReactNode } from "react";
import type { Status } from "@/lib/content";

/**
 * Shared primitives. Everything here is square cornered and rule separated,
 * never elevated: one shape system, applied without exception.
 */

export function Tile({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return <Tag className={`bg-panel p-5 sm:p-6 ${className}`}>{children}</Tag>;
}

/** Grid gap of 1px over a rule-coloured background draws every divider at once. */
export function Grid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-px bg-rule ${className}`}>{children}</div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-3">
      {children}
    </span>
  );
}

export function Heading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}

const statusCopy: Record<Status, { text: string; className: string }> = {
  shipped: { text: "Shipped", className: "text-good border-good/50" },
  building: { text: "Building", className: "text-amber border-amber/50" },
  archived: { text: "Archived", className: "text-ink-3 border-rule-2" },
};

/** A word, not a coloured dot. The only live dot on the site is availability. */
export function StatusTag({ status }: { status: Status }) {
  const s = statusCopy[status];
  return (
    <span
      className={`border px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] ${s.className}`}
    >
      {s.text}
    </span>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="border border-rule-2 px-1.5 py-0.5 font-mono text-[0.62rem] tracking-[0.04em] text-ink-2"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`text-amber underline decoration-amber/40 transition-colors hover:decoration-amber ${className}`}
    >
      {children}
    </a>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-10">
      {children}
    </div>
  );
}
