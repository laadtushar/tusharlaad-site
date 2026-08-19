"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Quote } from "@/lib/content";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/components/gsap-init";

/**
 * A testimonial that arrives rather than appears.
 *
 * The body splits into lines inside clipping masks, so each line rises out
 * from behind an edge instead of fading. That is the one text effect that
 * reads as deliberate rather than decorative: the words are being revealed,
 * not switched on. Scrubbed to scroll, so the reader sets the pace.
 *
 * The mark, the attribution and the body are three separate arrivals on one
 * timeline, so the card has internal order instead of moving as a slab.
 *
 * aria: "auto" keeps the quote a single readable passage for screen readers,
 * which matters more here than anywhere else on the site: this is someone
 * else's testimony, quoted.
 */
export function QuoteCard({ quote }: { quote: Quote }) {
  const ref = useRef<HTMLLIElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const q = gsap.utils.selector(ref.current);
      const body = q("[data-quote-body]")[0] as HTMLElement | undefined;
      if (!body) return;

      SplitText.create(body, {
        type: "lines",
        mask: "lines",
        aria: "auto",
        autoSplit: true,
        onSplit(self) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              end: "top 45%",
              scrub: 1,
            },
          });

          tl.from(q("[data-quote-mark]"), {
            autoAlpha: 0,
            scale: 0.6,
            rotate: -12,
            transformOrigin: "left top",
            ease: "none",
          }, 0)
            .from(q("[data-quote-who]"), {
              autoAlpha: 0,
              x: -12,
              ease: "none",
            }, 0.05)
            .from(q("[data-quote-avatar]"), {
              autoAlpha: 0,
              scale: 0.7,
              rotate: -8,
              transformOrigin: "center",
              ease: "none",
            }, 0)
            .from(self.lines, {
              yPercent: 105,
              stagger: 0.12,
              ease: "none",
            }, 0.1);

          return tl;
        },
      });
    },
    { scope: ref },
  );

  return (
    <li
      ref={ref}
      className="quote group relative grid gap-x-8 gap-y-3 border-b border-rule py-7 sm:grid-cols-[14rem_1fr]"
    >
      {/* Draws down the left edge on hover: the row answers the pointer. */}
      <span
        aria-hidden
        className="quote__edge pointer-events-none absolute bottom-0 left-0 top-0 w-px origin-top bg-amber"
      />

      <div data-quote-who className="flex flex-col gap-0.5">
        <span data-quote-avatar className="mb-2 block">
          <Avatar quote={quote} />
        </span>
        <span className="text-sm font-semibold">{quote.name}</span>
        <span className="text-xs text-ink-2">{quote.role}</span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.09em] text-ink-3">
          {quote.relationship}
        </span>
        <span className="tnum pt-1 font-mono text-[0.62rem] text-ink-3">
          {quote.date}
        </span>
      </div>

      <div className="relative">
        <span
          data-quote-mark
          aria-hidden
          /* Mono, not serif: the site loads no serif face, so font-serif fell
             through to an uncontrolled system font, and a serif flourish is
             the exact "creative" tell the design audit warned against. */
          className="pointer-events-none absolute -left-1 -top-5 select-none font-mono text-5xl leading-none text-amber/25 sm:-left-4"
        >
          &ldquo;
        </span>
        <blockquote
          data-quote-body
          className="measure relative text-sm leading-relaxed text-ink"
        >
          {quote.body}
        </blockquote>
      </div>
    </li>
  );
}

/**
 * A monogram unless someone has actually agreed to a photograph.
 *
 * Lifting five people's LinkedIn portraits onto this site is their likeness
 * used without asking, and those CDN URLs are signed and expire regardless.
 * Initials in the site's own mono, in a square with the amber rule, say who
 * without borrowing anything. Set `avatar` on a quote once that person has
 * said yes.
 */
function Avatar({ quote }: { quote: Quote }) {
  if (quote.avatar) {
    return (
      <span className="relative block size-10 overflow-hidden border border-rule-2 bg-panel-2">
        <Image
          src={quote.avatar.src}
          alt={quote.avatar.alt}
          fill
          sizes="40px"
          className="object-cover"
        />
      </span>
    );
  }

  const initials = quote.name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden
      className="flex size-10 items-center justify-center border border-rule-2 bg-panel-2 font-mono text-[0.72rem] tracking-[0.06em] text-ink-2"
    >
      {initials}
    </span>
  );
}
