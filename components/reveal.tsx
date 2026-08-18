"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, useGSAP, prefersReducedMotion } from "./gsap-init";

/**
 * Rows arrive as they enter the viewport. The CSS the site already uses for
 * the concurrency spine, animation-timeline: view(), covers roughly 84% of
 * browsers; ScrollTrigger covers the rest, which is why this exists rather
 * than another keyframe.
 *
 * once: true. Nothing on this site replays as you scroll back up, because a
 * page that re-animates behind you is a page you cannot re-read.
 */
export function RevealRows({
  children,
  selector,
  className = "",
}: {
  children: ReactNode;
  /** Scoped selector for the rows to stagger. */
  selector: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const rows = gsap.utils.toArray<HTMLElement>(selector, ref.current);
      if (!rows.length) return;

      gsap.from(rows, {
        opacity: 0,
        y: 14,
        duration: 0.55,
        ease: EASE,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
