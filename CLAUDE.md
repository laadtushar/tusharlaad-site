# tusharlaad.com

Personal site for Tushar Laad. Next 16, React 19, Tailwind v4, TypeScript.

## Non-negotiables

**`lib/content.ts` is the only source of truth.** It renders the homepage, `/cv`, the print
stylesheet that produces the PDF, and the JSON-LD `Person` block. Never hardcode a fact in a
component. If a date, figure or link is wrong, it is wrong in `content.ts`.

**Every amber figure carries a source.** Amber (`--amber`) means "live or dated value" and nothing
else. Any number in amber must pass through `<Figure>` with a `source`, because provenance is the
site's whole thesis. Never use amber decoratively.

**Employer work stops at what it does.** DoorFeed is named as the employer and the work is
described at the level of its purpose: a regulatory data service, an agent platform, the
backends under them, delivery speed. How it is built inside never ships: no internal row,
source, tool or coverage counts, no component names, no pipeline shapes from work systems.
Amber figures belong to Tushar's own products and repos, or to claims about himself. When a
number's owner is an employer, the number stays at work.

**Verifiable numbers only.** Every figure on this site traces to the CV or a repo. No invented
precision, no rounded-up vanity metrics.

## Design contract

Audited against [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable) and
[`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill). These rules came out of that audit
and are not preferences:

- **Zero em-dashes** anywhere a reader can see, including page titles. Use a comma, a period or a
  colon.
- **No eyebrows.** No small uppercase label above a heading. The heading carries itself.
- **Radius zero** everywhere. One shape system, no exceptions.
- **Mono is for figures, dates, stack names and code.** Never as a costume for "technical".
- **No decorative status dots.** The availability flag is the only dot on the site, and only because
  it carries real state.
- **Middle dots rationed** to one per line, at most.
- **Cards are rule-separated, never elevated.** No shadows.
- **Bento grids fill exactly.** Cell count must divide by column count. An empty trailing cell means
  the layout was planned wrong.
- **Nothing is reachable by scrolling sideways.** `overflow-x: clip` on the body is deliberate.

## What the motion is saying

The site has one argument: **messy input resolves into a verifiable answer.** That is what
the DoorFeed work does, it is what the provenance panels are for, and it is the only story
the motion is allowed to tell.

So the grammar is **arrival at a true value**, and every authored moment is a variation on it:

| Moment | What resolves |
| --- | --- |
| Hero field | Scattered points settle into a lattice |
| Headline | Characters resolve into his name |
| Sourced figures | Digits count up and land on the figure you can then interrogate |
| Concurrency spine | Bars draw in chronological order, so overlapping roles draw together |
| Rows and cells | Arrive slightly displaced, settle into alignment |

The spine is the clearest case and the standard to hold: its delay comes from where each bar
starts on the axis, not from DOM order, so the timeline plays chronologically and the three
concurrent roles draw at the same moment. The animation makes the section's argument instead
of decorating it.

A new animation has to answer one question: **what is resolving?** If the answer is "nothing,
it just looked flat", it does not ship. That is the line between this and a page that moves
because moving is fashionable.

## Motion contract

- One authored moment on load, then stillness. No ambient animation, no scroll hijacking, no smooth
  scroll library.
- Everything behind `prefers-reduced-motion: no-preference`, and the page must be complete and
  legible with motion off.
- Scroll-driven effects use `animation-timeline` behind an `@supports` guard, so unsupported browsers
  get the static state rather than a broken one.
- **GSAP is the animation library**, with ScrollTrigger and SplitText. It costs 47.6KB
  transferred against a 200KB ceiling, which is about a third of the page's JavaScript,
  so it has to keep earning that. Use it only where CSS genuinely cannot reach: runtime
  text splitting, and scroll triggers in the 16% of browsers `animation-timeline: view()`
  does not cover. `motion@13` was tried first and removed, because it was a 34KB
  dependency for a slower version of behaviour already in `globals.css`.
- Register plugins once, in `components/gsap-init.ts`, never inside a component that
  re-renders. Animate with `useGSAP` and a `scope`, so cleanup and ScrollTrigger
  teardown happen on unmount without being remembered.
- Prefer `gsap.from()` over `gsap.to()` for entrances. It leaves the resolved state in
  the DOM, so an interrupted or failed animation degrades to the finished page rather
  than a blank one.
- Every scroll reveal is `once: true`. A page that re-animates behind you is a page you
  cannot re-read.
- The CSS stays. The load sequence, the concurrency spine, the provenance panels and the
  page transitions are zero bytes and must not be reimplemented in GSAP.
- The hero is the one pinned moment. Content sections are scenes by framing only: they drift
  in on entry and compress on exit, scrubbed, transform and opacity, and never pin. A section
  fully in view sits at opacity 1, transform none. A scene you are still reading is never
  taken away from you. This framing runs on phones too.
- Section headings assemble word by word from a light blur, scrubbed to entry, so the
  assembly runs at the reader's pace. Blur never exceeds 5px: heavier reads as smeared.
  This is the one deliberate exception to once-only reveals, because a scrubbed entry is
  the scene grammar; row reveals below it stay once: true.
- One seeded line threads every content section, drawn by scroll through two stacked
  lerps so the tip glides. Seeded, never Math.random(): the same line on every visit, no
  jump on relayout. It lives in components/story-thread.tsx, from the scroll-storytelling
  skill's guide-line recipe.
- Third-party embeds load on request, never on page load. The facade row is the site's; the
  embed is the third party's, arriving by invitation.
- Never animate a value with `useState`. Animate on the compositor: transform, opacity, clip-path.
- The one piece of hand-written motion is `components/hero-field.tsx`, a Canvas 2D point field.
  It stops its own rAF loop once resolved and untouched, pauses when offscreen, and renders the
  resolved state with no loop at all under reduced motion or at 640px and below.

## Verify before you push

```bash
npm i -D playwright        # deliberately not a dependency, so it never runs in a deploy build
npm run build && npm start &
npm run verify
```

`scripts/verify.mjs` drives real Chromium and checks WCAG AA contrast on every text node, horizontal
overflow at desktop and mobile, heading structure, alt text, link accessible names, focus visibility,
JSON-LD presence, the typographic bans above, and a performance budget on four routes. It writes
screenshots too. If it fails, the push is not ready.

Kill any server from a previous build before starting a new one. A stale `next start` serves the old
build ID, the new CSS chunk 500s, and the run reports hundreds of phantom contrast failures.

Kill it with `pkill -f "[n]ext-server"`, bracket included. Written plainly, `pkill -f "next-server"`
matches the shell running the command, kills that shell first, and leaves the server up: the failure
looks exactly like the kill having worked.

The performance budget lives in `docs/PERF-BASELINE.md` with the measured numbers behind it, and it
has two tiers. The **field gate** is the real one: LCP, FCP, TBT and CLS on an emulated low-end phone
at 6x CPU on slow 4G, against Core Web Vitals thresholds. **It may not be raised.** The **byte
ceilings** are a drift alarm so a dependency cannot creep in unnoticed; they may be raised when the
field gate is green and the raise is recorded in that file with its reason. Never raise either to
turn a red run green.

TBT is the number that decides for JavaScript, because it is main thread time the reader cannot
interact through. Bytes are a proxy, and a proxy that disagrees with the measurement is wrong.

## Deployment

`main` auto-deploys to production on the `tusharlaad-site` Vercel project, which holds
`tusharlaad.com`. There is no staging step, so a broken push is a broken live site.

## Docs

- `docs/REDESIGN.md` — the brief, the research, the skills audit, and what changed
- `docs/CV-DATA.md` — source data behind `content.ts`. Read its final section first; earlier sections
  were superseded.
