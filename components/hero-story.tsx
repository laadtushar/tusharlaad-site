"use client";

import { useRef, type ReactNode } from "react";
import type { story as storyData } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/components/gsap-init";

/**
 * The hero as scenes. On desktop with motion allowed, this section pins for
 * ~4 viewports and scroll advances the story instead of moving the page:
 *
 *   scene 0  the name, over scattered points          (what he is)
 *   scene 1  the points swirl, refusing to line up    (the problem)
 *   scene 2  they resolve into a lattice, figures land (the work)
 *   scene 3  the lattice splits into four clusters     (the lab)
 *
 * One argument, told once, under the reader's own scroll. Built on the
 * pattern in .claude/skills/scroll-storytelling: CSS sticky rather than a
 * GSAP pin so no spacer is injected and CLS stays 0, a smoothing proxy so
 * the field feels damped rather than geared to the wheel, and deterministic
 * seeded positions so every reload tells the same story.
 *
 * Everywhere else, mobile and reduced motion included, the scenes stack as
 * ordinary readable sections. Content parity is the fallback, not a cut.
 */

const SEED = 0x1a2b3c;
const POINTS = 640;
const AMBER_EVERY = 22;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function HeroStory({
  scenes,
  children,
}: {
  scenes: typeof storyData.scenes;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          root.setAttribute("data-story-live", "");
          const canvas = root.querySelector<HTMLCanvasElement>(".story-canvas");
          const stage = root.querySelector<HTMLElement>(".story-stage");
          const track = root.querySelector<HTMLElement>(".story-track");
          if (!canvas || !stage || !track) return;
          const ctx2d = canvas.getContext("2d");
          if (!ctx2d) return;

          /* ---------------------------------------------------- the field */
          const css = getComputedStyle(document.documentElement);
          const inkColor = css.getPropertyValue("--ink-3").trim() || "#808d9c";
          const amberColor = css.getPropertyValue("--amber").trim() || "#e5a03c";

          let W = 0, H = 0;
          let active = POINTS;
          const dpr = Math.min(2, window.devicePixelRatio || 1);
          // Four configurations per point; vortex is parametric in progress.
          const scatter = new Float32Array(POINTS * 2);
          const lattice = new Float32Array(POINTS * 2);
          const clusters = new Float32Array(POINTS * 2);
          const orbit = new Float32Array(POINTS * 2); // radius, angle

          function build() {
            W = stage!.clientWidth;
            H = stage!.clientHeight;
            canvas!.width = W * dpr;
            canvas!.height = H * dpr;
            canvas!.style.width = `${W}px`;
            canvas!.style.height = `${H}px`;
            ctx2d!.setTransform(dpr, 0, 0, dpr, 0, 0);

            const rnd = mulberry32(SEED);
            for (let i = 0; i < POINTS; i++) {
              scatter[i * 2] = rnd() * W;
              scatter[i * 2 + 1] = rnd() * H;
              orbit[i * 2] = (0.1 + rnd() * 0.42) * Math.min(W, H);
              orbit[i * 2 + 1] = rnd() * Math.PI * 2;
            }
            // Lattice: centred grid, same spacing idea as the old hero field.
            // Capacity caps the live point count, so a phone's lattice stays
            // inside its short viewport instead of running off both ends.
            const spacing = W < 640 ? 24 : 30;
            const cols = Math.max(2, Math.floor((W * 0.72) / spacing));
            const maxRows = Math.max(2, Math.floor((H * 0.78) / spacing));
            active = Math.min(POINTS, cols * maxRows);
            const rows = Math.ceil(active / cols);
            const ox = (W - (cols - 1) * spacing) / 2;
            const oy = (H - (rows - 1) * spacing) / 2;
            for (let i = 0; i < active; i++) {
              lattice[i * 2] = ox + (i % cols) * spacing;
              lattice[i * 2 + 1] = oy + Math.floor(i / cols) * spacing;
            }
            // Clusters: four tight grids, one per product, near the corners.
            const anchors = [
              [0.24, 0.3], [0.76, 0.3], [0.24, 0.74], [0.76, 0.74],
            ];
            const per = Math.ceil(active / 4);
            const cc = Math.ceil(Math.sqrt(per));
            const cs = W < 640 ? 10 : 14;
            for (let i = 0; i < active; i++) {
              const c = i % 4;
              const j = Math.floor(i / 4);
              const cx = anchors[c][0] * W;
              const cy = anchors[c][1] * H;
              clusters[i * 2] = cx + ((j % cc) - cc / 2) * cs;
              clusters[i * 2 + 1] = cy + (Math.floor(j / cc) - cc / 2) * cs;
            }
          }

          function posAt(i: number, cfg: string, p: number, out: [number, number]) {
            if (cfg === "S") {
              out[0] = scatter[i * 2];
              out[1] = scatter[i * 2 + 1];
            } else if (cfg === "V") {
              // The vortex spins with scroll, so the reader drives it.
              const r = orbit[i * 2];
              const a = orbit[i * 2 + 1] + p * Math.PI * 3;
              out[0] = W / 2 + Math.cos(a) * r * 1.15;
              out[1] = H / 2 + Math.sin(a) * r * 0.62;
            } else if (cfg === "L") {
              out[0] = lattice[i * 2];
              out[1] = lattice[i * 2 + 1];
            } else {
              out[0] = clusters[i * 2];
              out[1] = clusters[i * 2 + 1];
            }
          }

          // Scene segments over pin progress. a -> b morphs across [t0, t1].
          const SEGS: { a: string; b: string; t0: number; t1: number }[] = [
            { a: "S", b: "S", t0: 0.0, t1: 0.14 },
            { a: "S", b: "V", t0: 0.14, t1: 0.3 },
            { a: "V", b: "V", t0: 0.3, t1: 0.42 },
            { a: "V", b: "L", t0: 0.42, t1: 0.56 },
            { a: "L", b: "L", t0: 0.56, t1: 0.68 },
            { a: "L", b: "C", t0: 0.68, t1: 0.82 },
            { a: "C", b: "C", t0: 0.82, t1: 1.0 },
          ];

          const A: [number, number] = [0, 0];
          const B: [number, number] = [0, 0];
          function draw(p: number) {
            ctx2d!.clearRect(0, 0, W, H);
            let seg = SEGS[0];
            for (const s of SEGS) if (p >= s.t0) seg = s;
            const t = smooth(clamp01((p - seg.t0) / (seg.t1 - seg.t0)));
            for (let i = 0; i < active; i++) {
              posAt(i, seg.a, p, A);
              posAt(i, seg.b, p, B);
              const x = A[0] + (B[0] - A[0]) * t;
              const y = A[1] + (B[1] - A[1]) * t;
              ctx2d!.fillStyle = i % AMBER_EVERY === 0 ? amberColor : inkColor;
              ctx2d!.globalAlpha = i % AMBER_EVERY === 0 ? 0.9 : 0.4;
              ctx2d!.fillRect(x, y, 2, 2);
            }
            ctx2d!.globalAlpha = 1;
          }

          /* -------------------------------------- the smoothing proxy */
          // Raw progress comes from ScrollTrigger; the canvas follows a
          // lerped copy on the ticker, so the field feels damped rather
          // than geared to the wheel. The lag is the point.
          let raw = 0;
          let smoothP = 0;
          let settled = false;
          const tick = () => {
            const d = raw - smoothP;
            if (Math.abs(d) < 0.0004) {
              if (!settled) { smoothP = raw; draw(smoothP); settled = true; }
              return;
            }
            settled = false;
            smoothP += d * 0.12;
            draw(smoothP);
          };
          gsap.ticker.add(tick);

          build();
          draw(0);

          const st = ScrollTrigger.create({
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate(self) { raw = self.progress; },
          });

          /* ----------------------------------------------- text scenes */
          // One scrubbed timeline; positions are fractions of pin progress.
          // Exits stay readable (opacity floor above 0) per the skill notes,
          // and opacity only, never visibility, so screen readers keep the
          // whole story regardless of scroll position.
          const T = 10;
          const q = gsap.utils.selector(root);
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: track, start: "top top", end: "bottom bottom", scrub: 0.9,
            },
          });
          const sceneEls = q(".story-scene");
          gsap.set(sceneEls.slice(1), { y: 28 });

          tl.to(sceneEls[0], { opacity: 0, y: -30, duration: 0.1 * T }, 0.13 * T)
            .set(sceneEls[0], { pointerEvents: "none" }, 0.2 * T)
            .to(sceneEls[1], { opacity: 1, y: 0, duration: 0.08 * T }, 0.24 * T)
            .to(sceneEls[1], { opacity: 0, y: -26, duration: 0.08 * T }, 0.4 * T)
            .to(sceneEls[2], { opacity: 1, y: 0, duration: 0.08 * T }, 0.48 * T)
            .to(sceneEls[2], { opacity: 0, y: -26, duration: 0.08 * T }, 0.64 * T)
            .to(sceneEls[3], { opacity: 1, y: 0, duration: 0.08 * T }, 0.74 * T);

          // Figures resolve under the reader's scroll inside their scene,
          // and always end exactly on the server-rendered string.
          for (const el of q<HTMLElement>("[data-story-count]")) {
            const final = el.getAttribute("data-story-count") ?? "";
            const target = Number(final.replace(/,/g, ""));
            if (!Number.isFinite(target)) continue;
            // A small figure never counts. "0 engineer" mid-scrub is a false
            // statement on a site about verifiable numbers; only figures large
            // enough to read as motion rather than as a value get the count.
            if (target < 20) continue;
            const grouped = final.includes(",");
            const proxy = { v: 0 };
            const at = Number(el.getAttribute("data-story-at") ?? "0.5");
            tl.to(proxy, {
              v: target, duration: 0.06 * T,
              onUpdate() {
                el.textContent = grouped
                  ? Math.round(proxy.v).toLocaleString("en-GB")
                  : String(Math.round(proxy.v));
              },
              onComplete() { el.textContent = final; },
            }, at * T);
          }

          // Scrub maps scroll onto the timeline's real duration, and the
          // real duration is wherever the last tween happens to end. Pin it
          // to T explicitly so every position above means the fraction of the
          // scroll it was written as.
          tl.set({}, {}, T);

          const onResize = () => {
            const dh = Math.abs(stage!.clientHeight - H);
            if (stage!.clientWidth === W && dh < 140) return;
            build();
            settled = false;
          };
          window.addEventListener("resize", onResize);

          return () => {
            gsap.ticker.remove(tick);
            st.kill();
            window.removeEventListener("resize", onResize);
            root.removeAttribute("data-story-live");
          };
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Introduction" className="story">
      <noscript>
        <style>{`.story-track{height:auto !important}.story-stage{position:static !important;height:auto !important}.story-scene{position:static !important;opacity:1 !important;pointer-events:auto !important}.story-canvas{display:none !important}`}</style>
      </noscript>
      <div className="story-track">
        <div className="story-stage">
          <canvas className="story-canvas" aria-hidden="true" />
          <div className="story-scene story-scene--identity">{children}</div>
          {scenes.map((sc, i) => (
            <div key={sc.key} className="story-scene">
              <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-5 px-4 sm:px-6 lg:px-10">
                <h2 className="max-w-[16ch] text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                  {sc.heading}
                </h2>
                <p className="measure text-[1.02rem] leading-relaxed text-ink-2">
                  {sc.body}
                </p>
                {sc.figures.length ? (
                <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-2">
                  {sc.figures.map((f) => (
                    <div key={f.label} className="flex flex-col gap-1">
                      <dd className="prov">
                        <button
                          type="button"
                          className="prov__fig tnum text-3xl sm:text-4xl"
                          aria-describedby={`story-src-${sc.key}-${f.label.replace(/\W/g, "")}`}
                        >
                          <span
                            data-story-count={f.value}
                            data-story-at={[0.26, 0.5, 0.76][i]}
                          >
                            {f.value}
                          </span>
                        </button>
                        <span
                          role="tooltip"
                          id={`story-src-${sc.key}-${f.label.replace(/\W/g, "")}`}
                          className="prov__src"
                        >
                          {f.source}
                        </span>
                      </dd>
                      <dt className="text-xs text-ink-2">{f.label}</dt>
                    </div>
                  ))}
                </dl>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
