"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * One registration point. Registering inside a component that re-renders is the
 * documented mistake, so every animated leaf imports from here instead.
 *
 * The site's easing tokens live in globals.css. GSAP is given the same curve by
 * hand rather than a second opinion, so nothing eases differently from the CSS
 * it sits beside.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Matches --ease-out-expo. Keep the two in step. */
export const EASE = "expo.out";

/**
 * The contract, in one place: with reduced motion set, every animation on this
 * site renders its final state. Not a faster animation. The end state.
 */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
