"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, SplitText, useGSAP, prefersReducedMotion } from "./gsap-init";

/**
 * The load sequence, as one timeline rather than four components each guessing
 * their own delay. Order is the point: name, then what he does, then the
 * detail, then the ways to leave the page.
 *
 * The headline animates itself in components/headline.tsx and is deliberately
 * not sequenced here, so the name never waits on anything.
 */
export function ConsoleIntro({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const q = gsap.utils.selector(ref.current);

      const tl = gsap.timeline({ defaults: { ease: EASE } });

      // The role line splits by line, so "Data engineer at DoorFeed." lands
      // before the sentence that qualifies it.
      const role = q("[data-intro='role']")[0];
      if (role) {
        SplitText.create(role as HTMLElement, {
          type: "lines",
          aria: "auto",
          autoSplit: true,
          onSplit(self) {
            return tl.from(
              self.lines,
              { opacity: 0, yPercent: 40, duration: 0.6, stagger: 0.07 },
              0.18,
            );
          },
        });
      }

      tl.from(q("[data-intro='sub']"), { opacity: 0, y: 10, duration: 0.6 }, 0.42)
        .from(q("[data-intro='meta']"), { opacity: 0, y: 8, duration: 0.5 }, 0.54)
        .from(
          q("[data-intro='link']"),
          { opacity: 0, y: 8, duration: 0.45, stagger: 0.045 },
          0.6,
        )
        .from(
          q("[data-intro='tile']"),
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          0.68,
        );
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
