# Product screenshots

Drop a file in here, then point a product at it in `lib/content.ts`:

```ts
image: { src: "/shots/treacle.png", alt: "Treacle profiling a voice mid-conversation" },
```

Nothing else. `ProductCell` renders it in an aspect-locked, clip-path-revealed
container above the product name, and the cell upgrades on its own.

## Requirements

- **16:10, at least 1600px wide.** The featured cell displays at 1082px on a 1440px
  viewport and requests a 1200px optimised source, so anything under 1600px will
  look soft on a high-density display.
- **The real UI, running.** No mockups, no device frames, no marketing renders.
  A screenshot of a working thing is the entire point.
- **Demo data, never personal data.** Every product here renders somebody's private
  life by default, so each shot is captured against a seeded demo account rather
  than a real one. The frontend is the shipped build; only the rows are invented,
  and they are generated from a fixed seed so a re-capture reproduces the image.
- **Alt text says what the product is doing**, not "screenshot of Treacle". It is
  the only description a screen reader gets.

## How each one was captured

Four of the five products are not reachable over the network from a build agent,
so each was run locally and driven with Playwright.

| Product | How |
| --- | --- |
| HyredLab | Real Next.js app against a local Postgres, seeded with twelve invented applications and an allowlisted demo user |
| MemryLab | Tauri desktop app: the shipped React frontend served by Vite, with the Rust IPC layer answered by a seeded stub |
| EdytLab | Same, plus four generated WAV files so the waveform lanes draw real audio, and a scripted agent turn |
| XpenseLab | Real Next.js app with the two Firestore hooks answered from a seeded fixture, so no request reaches a live project |

Treacle has no screenshot: it ships on the Play Store and there is no local
source in the lab to run.

## What was measured

The path was proven end to end with a synthetic 1600x1000 test card, then the test
was removed:

| Cell | Displayed | Optimiser serves |
| --- | --- | --- |
| Featured (`sm:col-span-3`) | 1082px | `w=1200` |
| Standard (1 of 3 columns) | 365px | `w=640` |

Those two numbers come from the `sizes` attribute being split by cell type. A single
`50vw` for both, which is what shipped before, made the small cells request `w=1200`
for a 365px box: roughly four times the pixels they can display.

CLS stayed at 0 with images present, because the container is aspect-locked before
the image arrives. Two images cost +2 requests and +5.7KB.

**That 5.7KB is not representative.** The test card was flat colour and compressed
unusually well. A real screenshot at `w=1200` is more like 60 to 120KB. Six of them
will exceed the total-weight ceiling in `docs/PERF-BASELINE.md`, and the request
ceiling of 24 as well.

That is expected, not a failure. When the real screenshots land, re-measure with
`npm run verify`, then raise the ceilings in `docs/PERF-BASELINE.md` with the new
numbers and the reason. Raise them because the site now carries images it did not
before, never to turn a red run green.

Images below the fold are lazy, so the initial load stays honest regardless.
