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
| `/`             | 195.1KB | 7.6KB  | 304.3KB  | 22       | 156ms  | 0   |
| `/cv`           | 195.1KB | 7.6KB  | 281.4KB  | 20       | 88ms   | 0   |
| `/work/treacle` | 195.5KB | 7.6KB  | 276.5KB  | 20       | 92ms   | 0   |
| `/writing`      | 195.6KB | 7.6KB  | 276.3KB  | 20       | 148ms  | 0   |

LCP is measured on localhost, so it is a regression tripwire rather than a field number.
CLS is the one that transfers directly: it is zero because nothing on the page reserves
space late, and it must stay zero.

Total gzipped static chunks: **177.35KB** before GSAP. See the animation section below for what it is now.

## Budgets

Enforced in `scripts/verify.mjs`. Headroom is deliberate but not generous: roughly 40%
over measured, which absorbs a real feature and refuses a careless dependency.

| Budget   | Ceiling | Current worst |
| -------- | ------- | ------------- |
| JS       | 200KB   | 195.6KB       |
| CSS      | 20KB    | 7.6KB         |
| Total    | 320KB   | 304.3KB       |
| Requests | 24      | 22            |
| LCP      | 1200ms  | 156ms         |
| CLS      | 0.01    | 0             |

Raise a ceiling only by editing this file with the reason. Never raise one to turn a red
run green.

## What the motion costs

| Feature                             | Shipped cost      |
| ----------------------------------- | ----------------- |
| Hero point field (Canvas 2D)         | **1.75KB gz**     |
| GSAP, ScrollTrigger, SplitText       | **47.6KB**        |
| Story hero, four scenes over one canvas | **~2KB**       |
| Section scene framing                | **~0.4KB**        |
| LinkedIn post facades                | **0 bytes until a post is requested** |
| Load sequence (`.enter`, wipe)       | 0 bytes, CSS      |
| Concurrency spine (`animation-timeline: view()`) | 0 bytes, CSS |
| Provenance panels                    | 0 bytes, CSS      |
| Page transitions (View Transitions API) | 0 bytes, platform |

The hero number is a true marginal cost: the site was built twice, once with the dynamic
import in place and once with it stubbed out, and the difference in total gzipped chunks
is 177.35KB minus 175.60KB.

### The animation library, and what it cost

The site ran without one for a while. `motion@13` was installed, a `Reveal` /
`Stagger` vocabulary written against it, and both removed: they did what `.enter` and
`animation-timeline: view()` already do in `globals.css`, except behind a 34KB
dependency and a hydration boundary.

GSAP went in afterwards, deliberately, and it is a different trade. Measured:

| | JS transferred | Delta |
| --- | --- | --- |
| Before GSAP | 142.3KB | |
| With GSAP, ScrollTrigger, SplitText, @gsap/react | **189.9KB** | **+47.6KB** |

That is a real cost against a 200KB ceiling, leaving about 10KB of headroom. It buys
three things CSS on this site could not do:

- **SplitText on the headline.** Splitting the name into per-character elements has to
  happen at runtime against the real line breaks. There is no CSS equivalent that does
  not mean hand-wrapping every letter in the markup. `aria: "auto"` restores an
  `aria-label` on the `h1`, so a screen reader still hears one name rather than eleven
  letters; `npm run verify` confirms the `h1` still reads "Tushar Laad".
- **ScrollTrigger reveals in every browser.** `animation-timeline: view()` is roughly
  84% supported and the other 16% get the static state. ScrollTrigger covers all of it,
  which is why the roles, ledger and testimonials use it rather than another keyframe.
- **`once: true` on every scroll reveal.** Nothing on this site replays as you scroll
  back up, because a page that re-animates behind you is a page you cannot re-read.

The CSS work stayed. The load sequence, the concurrency spine, the provenance panels
and the page transitions are all still zero bytes, and GSAP was not used to reimplement
any of them.

A second pass then animated the whole site: the load sequence, every section heading, the
product cells, the education rows, the case studies, the writing page, the footer, and a
count-up on every sourced figure. **That entire pass cost 0.4KB**, 189.9KB to 190.3KB,
because the library was already paid for. This is the shape of the trade: GSAP is expensive
once and nearly free thereafter, so the question was only ever whether to have it at all.

**If the JS ceiling ever needs defending, the 47.6KB library is the first thing to look at,
not the animations.**
The honest test is whether the headline split and the cross-browser scroll reveals are
worth a third of the page's JavaScript. Today the answer is yes because the motion was
asked for explicitly and it is the front door. That answer is allowed to change.

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
floor for this architecture rather than anything the site chose. Eight client components ship: `hero-field.tsx`, `copy-email.tsx`, `headline.tsx`,
`reveal.tsx`, `console-intro.tsx`, `count-up.tsx`, `hero-story.tsx` and
`linkedin-post.tsx`. Every other
component on every page renders on the server and sends no JavaScript at all.

The JS figure is identical across all four routes, which is the tell: nothing
route-specific is being shipped. If this number needs to come down, the lever is the
framework, not the content.
