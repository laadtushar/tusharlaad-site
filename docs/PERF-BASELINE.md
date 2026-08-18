# Performance baseline

Measured, not estimated. Every number here came out of a real Chromium load against
`next start` on the production build, and `scripts/verify.mjs` re-measures them on every
run and fails the push if a budget is exceeded.

Reproduce with:

```bash
npm run build && npm start &
npm run verify        # prints a PERF line per route
```

## Measured, 18 August 2026

Transferred bytes, compressed, cold load. `requests` counts every response the page pulls.

| Route           | JS      | CSS    | Total    | Requests | LCP    | CLS |
| --------------- | ------- | ------ | -------- | -------- | ------ | --- |
| `/`             | 142.3KB | 6.7KB  | 257.3KB  | 19       | 140ms  | 0   |
| `/cv`           | 142.3KB | 6.7KB  | 250.2KB  | 18       | 88ms   | 0   |
| `/work/treacle` | 142.3KB | 6.7KB  | 245.9KB  | 18       | 104ms  | 0   |
| `/writing`      | 142.3KB | 6.7KB  | 244.9KB  | 18       | 92ms   | 0   |

LCP is measured on localhost, so it is a regression tripwire rather than a field number.
CLS is the one that transfers directly: it is zero because nothing on the page reserves
space late, and it must stay zero.

Total gzipped static chunks: **177.35KB**.

## Budgets

Enforced in `scripts/verify.mjs`. Headroom is deliberate but not generous: roughly 40%
over measured, which absorbs a real feature and refuses a careless dependency.

| Budget   | Ceiling | Current worst |
| -------- | ------- | ------------- |
| JS       | 200KB   | 142.3KB       |
| CSS      | 20KB    | 6.7KB         |
| Total    | 320KB   | 257.3KB       |
| Requests | 24      | 19            |
| LCP      | 1200ms  | 140ms         |
| CLS      | 0.01    | 0             |

Raise a ceiling only by editing this file with the reason. Never raise one to turn a red
run green.

## What the motion costs

| Feature                             | Shipped cost      |
| ----------------------------------- | ----------------- |
| Hero point field (Canvas 2D)         | **1.75KB gz**     |
| Load sequence (`.enter`, wipe)       | 0 bytes, CSS      |
| Concurrency spine (`animation-timeline: view()`) | 0 bytes, CSS |
| Provenance panels                    | 0 bytes, CSS      |
| Page transitions (View Transitions API) | 0 bytes, platform |

The hero number is a true marginal cost: the site was built twice, once with the dynamic
import in place and once with it stubbed out, and the difference in total gzipped chunks
is 177.35KB minus 175.60KB.

### Why there is no animation library

`motion@13` was installed, a `Reveal` / `Stagger` / `StaggerItem` vocabulary was written
against it, and then both were removed before shipping. The primitives did what
`.enter` and `animation-timeline: view()` already do in `globals.css`, except slower to
first paint and behind a 34KB gzipped dependency and a hydration boundary. Tree shaking
meant it cost nothing while unused, which is exactly what made it dead code rather than
a foundation.

The one piece of hand-written JavaScript motion, `components/hero-field.tsx`, earns its
1.75KB by doing something CSS genuinely cannot: scattering roughly seven hundred points
at desktop width, then easing each one independently toward a lattice, with pointer
displacement on the way. It stops its
own `requestAnimationFrame` loop once the field resolves and the pointer leaves, pauses
via `IntersectionObserver` when scrolled out of view, and never starts a loop at all
under `prefers-reduced-motion: reduce` or at 640px and below, where it paints the
resolved state once and stops.

## When product screenshots land

The site ships no product images yet, which is the single largest thing still missing
from it. The rendering path was proven end to end with a synthetic test card and the
numbers recorded in `public/shots/README.md`.

The short version: a real screenshot at `w=1200` is roughly 60 to 120KB, so six of them
will exceed both the 320KB total ceiling and the 24-request ceiling above. That is the
budget working, not the budget being wrong. Re-measure when they land and raise both
ceilings here with the new numbers and an explicit reason. Images below the fold are
lazy, so the initial load stays honest either way.

One correctness fix went in ahead of them. `ProductCell` passed a single
`sizes="(max-width: 640px) 100vw, 50vw"` for every cell, but the featured cell spans all
three columns of an 1180px shell while the rest take a third of it. The small cells were
requesting `w=1200` sources for a 365px box, roughly four times the pixels they can
display. `sizes` is now split by cell type: 1120px featured, 380px standard, which the
optimiser resolves to `w=1200` and `w=640` respectively.

## Where the JavaScript actually goes

142.3KB is almost entirely React 19 plus the Next 16 App Router runtime, and it is the
floor for this architecture rather than anything the site chose. The site ships exactly
two client components, `hero-field.tsx` and `copy-email.tsx`; every other component on
every page renders on the server and sends no JavaScript at all. The hero is the larger
of the two at 1.75KB gzipped.

The JS figure is identical across all four routes, which is the tell: nothing
route-specific is being shipped. If this number needs to come down, the lever is the
framework, not the content.
