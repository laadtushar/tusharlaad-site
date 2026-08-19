"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, useGSAP, prefersReducedMotion } from "./gsap-init";

/**
 * The case-study header resolves on load, the same grammar as the console
 * intro: name, then the line that qualifies it, then the detail, then the
 * ways to leave the page. It matters here because the view-transition name
 * only carries the title in from a product card; landing on the page
 * directly, by refresh or search or a shared link, skipped every bit of
 * motion the page has. Most visits to a case study arrive exactly that way.
 */
export function CaseIntro({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const q = gsap.utils.selector(ref.current);

      gsap
        .timeline({ defaults: { ease: EASE } })
        .from(q("[data-case='title']"), { opacity: 0, y: 10, duration: 0.5 }, 0)
        .from(q("[data-case='tag']"), { opacity: 0, scale: 0.85, duration: 0.4 }, 0.1)
        .from(q("[data-case='line']"), { opacity: 0, y: 8, duration: 0.5 }, 0.16)
        .from(q("[data-case='chips']"), { opacity: 0, y: 6, duration: 0.4 }, 0.3)
        .from(
          q("[data-case='link']"),
          { opacity: 0, y: 6, duration: 0.35, stagger: 0.05 },
          0.36,
        );
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
