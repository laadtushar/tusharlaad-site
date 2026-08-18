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
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
} & Record<`data-${string}`, string | undefined>) {
  return (
    <Tag className={`bg-panel p-5 sm:p-6 ${className}`} {...rest}>
      {children}
    </Tag>
  );
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
          className="chip border border-rule-2 px-1.5 py-0.5 font-mono text-[0.62rem] tracking-[0.04em] text-ink-2"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * `ariaLabel` exists for repeated link text. Five cards all reading "Source" are
 * five identical entries in a screen reader's link list, so each one names its
 * product there while the visible label stays short.
 */
export function ExternalLink({
  href,
  children,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`text-amber underline decoration-amber/40 transition-colors hover:decoration-amber ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * A figure you can interrogate. Hovering, focusing or tapping it says where the
 * number came from. It is the site's signature interaction because provenance
 * is the hard problem in the work it describes.
 */
export function Figure({
  value,
  source,
  className = "",
}: {
  value: string;
  source?: string;
  className?: string;
}) {
  if (!source) {
    return (
      <span className={`tnum text-amber ${className}`} data-count={value}>
        {value}
      </span>
    );
  }
  return (
    <span className="prov">
      <button
        type="button"
        className={`prov__fig tnum ${className}`}
        aria-describedby={`src-${value.replace(/\W/g, "")}`}
        data-count={value}
      >
        {value}
      </button>
      <span
        role="tooltip"
        id={`src-${value.replace(/\W/g, "")}`}
        className="prov__src"
      >
        {source}
      </span>
    </span>
  );
}

/**
 * One shared axis across every role, so three concurrent jobs read as
 * deliberate rather than as a data error.
 */
const AXIS_START = 2020;
const AXIS_END = 2026.75;

function toYear(label: string) {
  if (/present/i.test(label)) return AXIS_END;
  const m = label.match(/([A-Za-z]{3})\s+(\d{4})/);
  if (!m) return AXIS_START;
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const mi = months.indexOf(m[1].toLowerCase());
  return Number(m[2]) + (mi < 0 ? 0 : mi / 12);
}

/** The shared reference the bars are read against. Shown once, above the roles. */
export function Axis() {
  return (
    <div className="flex items-center gap-3 pb-1 pt-3">
      <span className="tnum font-mono text-[0.6rem] text-ink-3">{AXIS_START}</span>
      <span className="h-px flex-1 bg-rule-2" />
      <span className="tnum font-mono text-[0.6rem] text-ink-3">2026</span>
    </div>
  );
}

export function Span({
  from,
  to,
  current = false,
}: {
  from: string;
  to: string;
  current?: boolean;
}) {
  const span = AXIS_END - AXIS_START;
  const a = Math.max(0, (toYear(from) - AXIS_START) / span);
  const b = Math.min(1, (toYear(to) - AXIS_START) / span);
  const left = `${(a * 100).toFixed(2)}%`;
  const width = `${Math.max(1.5, (b - a) * 100).toFixed(2)}%`;
  return (
    <div
      className="span"
      role="img"
      aria-label={`${from} to ${to}, shown against a 2020 to 2026 axis`}
    >
      <span
        className={`span__bar${current ? " span__bar--now" : ""}`}
        style={{ left, width }}
      />
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-10">
      {children}
    </div>
  );
}
