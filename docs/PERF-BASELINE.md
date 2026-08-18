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
| `/`             | 195.3KB | 7.9KB  | 296.8KB  | 22       | 172ms  | 0   |
| `/cv`           | 195.3KB | 7.9KB  | 281.9KB  | 20       | 100ms  | 0   |
| `/work/treacle` | 195.7KB | 7.9KB  | 277.0KB  | 20       | 84ms   | 0   |
| `/writing`      | 195.8KB | 7.9KB  | 276.8KB  | 20       | 96ms   | 0   |

LCP is measured on localhost, so it is a regression tripwire rather than a field number.
CLS is the one that transfers directly: it is zero because nothing on the page reserves
space late, and it must stay zero.

Total gzipped static chunks: **177.35KB** before GSAP. See the animation section below for what it is now.

## Budgets

Two tiers, and only one of them decides.

### The gate: what it costs a reader

Measured on an emulated low-end phone, 6x CPU throttle on slow 4G, against Google's
Core Web Vitals thresholds rather than numbers someone picked.

| Gate | Threshold | Measured |
| --- | --- | --- |
| LCP | 2500ms (CWV good) | **852ms** |
| FCP | 1800ms (CWV good) | **852ms** |
| **TBT** | **200ms** | **0ms** |
| CLS | 0.1 (CWV good) | **0** |

**Total Blocking Time is the one that matters for JavaScript**, because it is main
thread time a reader cannot interact through. It is zero, on a phone throttled six
times slower than the real thing, on slow 4G. The page paints from server-rendered
HTML and GSAP hydrates behind it, so the bundle never sits on the critical path.

### The alarm: bytes

| Budget | Ceiling | Current worst |
| --- | --- | --- |
| JS | 260KB | 195.8KB |
| CSS | 24KB | 7.9KB |
| Total | 400KB | 296.8KB |
| Requests | 30 | 22 |

These were 200KB and 320KB, and were raised deliberately once the field numbers showed
they were measuring the wrong thing: at 195KB the main thread was never blocked at all,
so a red run would have been a false alarm blocking real work. They stay as a drift
alarm, so a dependency cannot creep in unnoticed, but they no longer decide on their
own. **A byte ceiling may be raised when the field gate is green and the raise is
recorded here. The field gate may not be raised.**


