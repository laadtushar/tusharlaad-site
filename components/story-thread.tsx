"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/components/gsap-init";

/**
 * One line threading every section, drawn by scroll. The hero ends with the
 * field resolved; this is the thread that carries that resolution through the
 * lab, the people, the roles and the ledger. It weaves the gaps between
 * panels, behind the content, and its tip glides because it reads a smoothed
 * proxy through its own second lerp: two stacked low-pass filters, per the
 * scroll-storytelling recipe, so it never ticks.
 *
 * Geometry is seeded, never Math.random(): the same line on every visit, and
 * no jump when fonts or images relayout the page.
 */

function buildPath(w: number, h: number, viewH: number) {
  const left = w * 0.16;
  const right = w * 0.84;
  const top = h * 0.02;
  const bottom = h * 0.985;
  const span = bottom - top;
  const segments = Math.max(3, Math.round(span / Math.max(1, viewH)));
  const step = span / segments;
  const mid = (left + right) / 2;
  const half = (right - left) / 2;

  let seed = 7333;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const pts: { x: number; y: number }[] = [];
  let onRight = true;
  pts.push({ x: left + (rnd() - 0.5) * half * 0.3, y: top });
  for (let i = 1; i <= segments; i++) {
    const dir = onRight ? 1 : -1;
    const reach = half * (0.7 + rnd() * 0.42);
    const yJit = i < segments ? (rnd() - 0.5) * step * 0.44 : 0;
    pts.push({ x: mid + dir * reach, y: top + step * i + yJit });
    onRight = !onRight;
  }

  // Catmull-Rom to cubic Bezier: continuous tangents, so the turns are arcs
  // rather than corners, even with the jitter above.
  const k = 0.5;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + ((p2.x - p0.x) / 6) * k * 2;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * k * 2;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * k * 2;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * k * 2;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function StoryThread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const host = ref.current;
      if (!host) return;
      const svg = host.querySelector<SVGSVGElement>("[data-thread]");
      const path = host.querySelector<SVGPathElement>("[data-thread-path]");
      if (!svg || !path || typeof path.getTotalLength !== "function") return;

      let length = 1;
      const state = { raw: 0, smooth: 0 };
      const still = prefersReducedMotion();

      const layout = () => {
        const w = host.clientWidth;
        const h = host.scrollHeight;
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
        svg.style.height = `${h}px`;
        path.setAttribute("d", buildPath(w, h, window.innerHeight));
        length = path.getTotalLength();
        if (still) {
          // Reduced motion: the whole thread, drawn, immediately.
          path.style.strokeDasharray = "none";
          path.style.strokeDashoffset = "0";
        } else {
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length * (1 - state.smooth)}`;
        }
      };

      layout();
      window.addEventListener("load", layout);
      ScrollTrigger.addEventListener("refresh", layout);

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(layout, 200);
      };
      window.addEventListener("resize", onResize);

      if (!still) {
        ScrollTrigger.create({
          trigger: host,
          start: "top 85%",
          end: "bottom bottom",
          onUpdate(self) {
            state.raw = self.progress;
          },
        });

        const LINE_EASE = 0.12;
        const tick = () => {
          const target = state.raw;
          const next = state.smooth + (target - state.smooth) * LINE_EASE;
          if (state.smooth === target && Math.abs(next - target) < 0.00005) return;
          state.smooth = Math.abs(next - target) < 0.00005 ? target : next;
          path.style.strokeDashoffset = (length * (1 - state.smooth)).toFixed(2);
        };
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("load", layout);
          ScrollTrigger.removeEventListener("refresh", layout);
        };
      }
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", layout);
        ScrollTrigger.removeEventListener("refresh", layout);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative">
      <svg
        data-thread
        aria-hidden
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-0 z-0 w-full"
      >
        <path
          data-thread-path
          fill="none"
          stroke="var(--rule-2)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          opacity="0.85"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
