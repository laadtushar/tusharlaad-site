"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap-init";

/**
 * The portrait resolves like everything else here: it arrives behind a scan of
 * amber rule lines that wipe away as it settles, and holds a slow parallax
 * against the scroll so it sits in the page rather than on it.
 *
 * Same grammar as the hero field and the figures. Nothing new is being said,
 * which is the point: one argument, told again.
 */
export function Portrait({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const q = gsap.utils.selector(ref.current);

      // Arrival: the frame draws, the image resolves out of a slight blur.
      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        })
        .from(q("[data-portrait-frame]"), {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.5,
          ease: "power3.out",
        })
        .from(
          q("[data-portrait-img]"),
          { autoAlpha: 0, filter: "blur(12px)", scale: 1.06, duration: 0.9, ease: "power3.out" },
          "-=0.2",
        )
        .from(
          q("[data-portrait-scan]"),
          { scaleY: 0, transformOrigin: "top", duration: 0.55, ease: "power2.inOut" },
          "-=0.75",
        )
        .to(q("[data-portrait-scan]"), { autoAlpha: 0, duration: 0.4 }, "-=0.1");

      // A slow parallax so the portrait sits inside the page.
      gsap.fromTo(
        q("[data-portrait-img]"),
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      <div
        data-portrait-frame
        className="relative aspect-square w-full overflow-hidden border border-rule bg-panel-2"
      >
        <Image
          data-portrait-img
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover"
          priority={false}
        />
        {/* The scan: amber rules sweeping the frame once, then gone. */}
        <div
          data-portrait-scan
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--amber) 22%, transparent) 0 1px, transparent 1px 7px)",
          }}
        />
      </div>
    </div>
  );
}
