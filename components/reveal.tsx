"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, SplitText, useGSAP, prefersReducedMotion } from "@/components/gsap-init";

/**
 * The site's scroll vocabulary. Three shapes, used everywhere, so the page
 * reads as one system rather than a dozen components that each invented their
 * own entrance.
 *
 * Two rules hold for all of them:
 *
 * once: true. Nothing replays as you scroll back up, because a page that
 * re-animates behind you is a page you cannot re-read.
 *
 * gsap.from(), never gsap.to(). The resolved state is what the server rendered,
 * so an interrupted or failed animation degrades to the finished page rather
 * than a blank one.
 */

const START = "top 88%";

/** A group of rows that arrive in sequence as the group enters. */
export function RevealRows({
  children,
  selector,
  className = "",
  stagger = 0.05,
}: {
  children: ReactNode;
  selector: string;
  className?: string;
  stagger?: number;
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
        stagger,
        scrollTrigger: { trigger: ref.current, start: START, once: true },
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

/** One block that rises into place. */
export function Reveal({
  children,
  className = "",
  y = 12,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 0.6,
        ease: EASE,
        scrollTrigger: { trigger: ref.current, start: START, once: true },
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

/**
 * A heading that arrives word by word. Words rather than characters: at heading
 * size a per-character stagger reads as a slot machine, and the point is
 * emphasis, not spectacle.
 *
 * aria: "auto" puts an aria-label back on the element and hides the fragments,
 * so the heading is still announced as one phrase.
 */
/**
 * Words assemble from a light blur as the reader scrolls them in, scrubbed, so
 * the assembly runs at the reader's own pace. Blur stays light (5px, per the
 * scroll-storytelling recipe: heavier reads as smeared), and aria: "auto"
 * keeps the heading announced as one phrase.
 */
export function RevealHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const target = ref.current.firstElementChild ?? ref.current;

      SplitText.create(target as HTMLElement, {
        type: "words",
        aria: "auto",
        onSplit(self) {
          return gsap.from(self.words, {
            autoAlpha: 0,
            y: 16,
            filter: "blur(5px)",
            ease: "none",
            stagger: 0.06,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 94%",
              end: "top 58%",
              scrub: 1,
            },
          });
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

/**
 * The concurrency spine draws itself as the roles arrive.
 *
 * This used to be CSS, `animation-timeline: view()` behind an @supports guard,
 * which meant roughly 16% of browsers saw a bar that never drew. ScrollTrigger
 * covers all of them, and one implementation beats two that disagree.
 */
export function DrawSpines({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      // The axis draws first: you cannot read a bar against a scale that is
      // not there yet.
      const axis = ref.current.querySelector(".axis-line");
      if (axis) {
        gsap.from(axis, {
          scaleX: 0,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: START, once: true },
        });
      }

      const bars = gsap.utils.toArray<HTMLElement>(".span__bar", ref.current);
      if (!bars.length) return;

      // The delay comes from where the bar starts on the axis, not from its
      // position in the DOM. So the timeline plays chronologically, and the
      // three roles that ran at once draw at once. The overlap is the point of
      // this section, and this is the animation making that argument rather
      // than decorating it.
      const delayOf = (el: HTMLElement) => (parseFloat(el.style.left) || 0) / 100;

      gsap.from(bars, {
        scaleX: 0,
        duration: 0.7,
        ease: EASE,
        delay: (i, el) => delayOf(el as HTMLElement) * 0.9,
        scrollTrigger: { trigger: ref.current, start: START, once: true },
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

/**
 * Section-as-scene framing. The section drifts up as it enters the viewport
 * and compresses slightly as the next scene arrives over it, both scrubbed
 * to scroll, so sections read as scenes replacing one another rather than
 * one long column. Transform and opacity only, no pinning: a scene you are
 * still reading never gets taken away from you.
 */
export function SceneSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          y: 48,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "top 55%",
            scrub: 0.8,
          },
        });
        gsap.to(ref.current, {
          scale: 0.975,
          opacity: 0.55,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "bottom 32%",
            end: "bottom top",
            scrub: 0.8,
          },
        });
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
