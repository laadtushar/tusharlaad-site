"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/gsap-init";

/**
 * The portrait resolves like everything else here.
 *
 * Graded to the site rather than dropped onto it: the photograph's own black
 * background is already the ground, so a mask feathers its edges into the
 * panel and a cold grade pulls it toward the slate palette. Colour returns on
 * hover, which is the one place the site rewards a pointer with something
 * other than a rule.
 *
 * Corner marks rather than a border, because a full frame around a face reads
 * as a badge. They draw on arrival and stay.
 */
export function Portrait({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const q = gsap.utils.selector(ref.current);

      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        })
        .from(q("[data-portrait-img]"), {
          autoAlpha: 0,
          filter: "blur(14px) saturate(0)",
          scale: 1.08,
          duration: 1.1,
          ease: "power3.out",
        })
        .from(
          q("[data-portrait-scan]"),
          { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power2.inOut" },
          "-=0.9",
        )
        .to(q("[data-portrait-scan]"), { autoAlpha: 0, duration: 0.5 }, "-=0.15")
        .from(
          q("[data-corner]"),
          { autoAlpha: 0, scale: 0.4, duration: 0.4, stagger: 0.06, ease: "back.out(2)" },
          "-=0.7",
        );

      // Sits inside the page: a slow parallax, and a touch of counter-drift on
      // the corner marks so the frame feels a layer in front.
      gsap.fromTo(
        q("[data-portrait-img]"),
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    },
    { scope: ref },
  );

  const corner =
    "pointer-events-none absolute size-3 border-amber opacity-80";

  return (
    <div ref={ref} className="portrait relative">
      <div className="relative aspect-square w-full overflow-hidden bg-panel-2">
        <Image
          data-portrait-img
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 40vw, 320px"
          className="portrait__img object-cover object-top"
        />
        {/* Feather the photograph into the panel on every edge. */}
        <div className="portrait__mask pointer-events-none absolute inset-0" aria-hidden />
        <div
          data-portrait-scan
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--amber) 24%, transparent) 0 1px, transparent 1px 7px)",
          }}
        />
      </div>
      <span data-corner aria-hidden className={`${corner} -left-px -top-px border-l border-t`} />
      <span data-corner aria-hidden className={`${corner} -right-px -top-px border-r border-t`} />
      <span data-corner aria-hidden className={`${corner} -bottom-px -left-px border-b border-l`} />
      <span data-corner aria-hidden className={`${corner} -bottom-px -right-px border-b border-r`} />
    </div>
  );
}
