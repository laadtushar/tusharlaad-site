"use client";

import { useEffect, useRef } from "react";

/**
 * The hero moment: 348,842 rows resolving into one answer.
 *
 * The through-line in the work this site describes is always the same
 * operation. Scattered sources from eleven feeds become one dated lookup;
 * thirty import formats become one timeline; a voice becomes a graph. So the
 * hero opens as an unaligned scatter and resolves into a lattice, which is what
 * a table of rows actually looks like from far enough away.
 *
 * Canvas 2D rather than WebGL, deliberately. This is roughly three kilobytes of
 * code and no dependency; React Three Fiber would be about 150 KB gzipped for
 * an effect that does not need depth or lighting.
 *
 * It never blocks the headline. The identity block is real HTML sitting on top
 * of this and renders whether or not any of it runs.
 */

type Point = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  amber: boolean;
};

const SPACING = 26;
const SETTLE = 0.055;
const POINTER_RADIUS = 92;

export default function HeroField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 640px)").matches;
    const still = reduced || small;

    let points: Point[] = [];
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    const pointer = { x: -9999, y: -9999 };

    const ink = getComputedStyle(document.documentElement)
      .getPropertyValue("--ink-3")
      .trim() || "#808d9c";
    const amber = getComputedStyle(document.documentElement)
      .getPropertyValue("--amber")
      .trim() || "#e5a03c";

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(2, Math.floor(w / SPACING));
      const rows = Math.max(2, Math.floor(h / SPACING));
      const offX = (w - (cols - 1) * SPACING) / 2;
      const offY = (h - (rows - 1) * SPACING) / 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tx = offX + c * SPACING;
          const ty = offY + r * SPACING;
          points.push({
            // Scattered on arrival, aligned at rest. That is the whole idea.
            x: still ? tx : Math.random() * w,
            y: still ? ty : Math.random() * h,
            tx,
            ty,
            // A few carry the live-value colour, as they do everywhere else here.
            amber: Math.random() < 0.045,
          });
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of points) {
        ctx!.globalAlpha = p.amber ? 0.55 : 0.3;
        ctx!.fillStyle = p.amber ? amber : ink;
        ctx!.fillRect(p.x - 1, p.y - 1, 2, 2);
      }
      ctx!.globalAlpha = 1;
    }

    function frame() {
      let moving = false;
      for (const p of points) {
        let tx = p.tx;
        let ty = p.ty;

        const dx = p.tx - pointer.x;
        const dy = p.ty - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < POINTER_RADIUS * POINTER_RADIUS) {
          const d = Math.sqrt(d2) || 1;
          const push = (1 - d / POINTER_RADIUS) * 16;
          tx += (dx / d) * push;
          ty += (dy / d) * push;
        }

        const nx = p.x + (tx - p.x) * SETTLE;
        const ny = p.y + (ty - p.y) * SETTLE;
        if (Math.abs(nx - p.x) > 0.01 || Math.abs(ny - p.y) > 0.01) moving = true;
        p.x = nx;
        p.y = ny;
      }
      draw();
      // Stop entirely once resolved and untouched. Nothing animates while idle.
      raf = moving && visible ? requestAnimationFrame(frame) : 0;
    }

    function kick() {
      if (!still && !raf && visible) raf = requestAnimationFrame(frame);
    }

    build();
    if (still) {
      draw();
    } else {
      kick();
    }

    const ro = new ResizeObserver(() => {
      build();
      if (still) draw();
      else kick();
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else kick();
      },
      { threshold: 0 },
    );
    io.observe(host);

    function onMove(e: PointerEvent) {
      if (still) return;
      const rect = host!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      kick();
    }
    function onLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
      kick();
    }

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
