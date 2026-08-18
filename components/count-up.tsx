"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/gsap-init";

/**
 * Every sourced figure counts up once, when it first scrolls into view.
 *
 * This is one client component for the whole page rather than one per figure.
 * The figures are server rendered and carry data-count; this finds them. Adding
 * a client boundary to dozens of spans to animate a number would cost more than
 * the animation is worth.
 *
 * The final text is always the server-rendered string, restored verbatim on
 * complete, so nothing drifts: 1,234,567 ends as 1,234,567 and not 1234567.
 * Everything sits in a .tnum context already, so digits are tabular and the
 * width never changes mid-count. CLS stays at zero.
 */
export function CountUpAll() {
  const done = useRef(false);

  useGSAP(() => {
    if (done.current) return;
    done.current = true;
    if (prefersReducedMotion()) return;

    const figures = gsap.utils.toArray<HTMLElement>("[data-count]");

    for (const el of figures) {
      const final = el.getAttribute("data-count");
      if (!final) continue;

      // Split the string into everything before the number, the number, and
      // everything after: "27 days" and "1,234" and "72 fps" all work.
      const m = final.match(/^(\D*)([\d,.]+)([\s\S]*)$/);
      if (!m) continue;
      const [, prefix, numText, suffix] = m;
      const target = Number(numText.replace(/,/g, ""));
      if (!Number.isFinite(target) || target === 0) continue;

      const grouped = numText.includes(",");
      const decimals = numText.includes(".") ? numText.split(".")[1].length : 0;
      const counter = { v: 0 };

      gsap.to(counter, {
        v: target,
        duration: Math.min(1.5, 0.5 + Math.log10(target + 1) * 0.22),
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate() {
          const n = counter.v.toFixed(decimals);
          el.textContent =
            prefix + (grouped ? Number(n).toLocaleString("en-GB", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) : n) + suffix;
        },
        // Restore the server string exactly, rather than trusting the format
        // above to have reproduced it.
        onComplete() {
          el.textContent = final;
        },
      });
    }
  });

  return null;
}
