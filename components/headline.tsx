"use client";

import { useRef } from "react";
import { EASE, gsap, SplitText, useGSAP, prefersReducedMotion } from "@/components/gsap-init";

/**
 * The name resolves character by character, which is the argument the hero
 * field makes with points: scatter, then order. It is also the one piece of
 * motion here CSS genuinely cannot do, because splitting text into per
 * character elements has to happen at runtime against the real line breaks.
 *
 * aria: "auto" restores an aria-label on the heading and hides the fragments,
 * so a screen reader hears one name rather than eleven letters.
 */
export function Headline({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      SplitText.create(ref.current, {
        type: "chars",
        smartWrap: true,
        aria: "auto",
        onSplit(self) {
          // from() leaves the resolved state in the DOM, so an interrupted or
          // failed animation degrades to the finished heading rather than a
          // blank one.
          return gsap.from(self.chars, {
            opacity: 0,
            yPercent: 22,
            duration: 0.7,
            ease: EASE,
            stagger: 0.028,
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <h1
      ref={ref}
      className="text-balance text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl"
    >
      {text}
    </h1>
  );
}
