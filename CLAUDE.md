# tusharlaad.com

Personal site for Tushar Laad. Next 16, React 19, Tailwind v4, TypeScript.

## Non-negotiables

**`lib/content.ts` is the only source of truth.** It renders the homepage, `/cv`, the print
stylesheet that produces the PDF, and the JSON-LD `Person` block. Never hardcode a fact in a
component. If a date, figure or link is wrong, it is wrong in `content.ts`.

**Every amber figure carries a source.** Amber (`--amber`) means "live or dated value" and nothing
else. Any number in amber must pass through `<Figure>` with a `source`, because provenance is the
site's whole thesis. Never use amber decoratively.

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

## Motion contract

- One authored moment on load, then stillness. No ambient animation, no scroll hijacking, no smooth
  scroll library.
- Everything behind `prefers-reduced-motion: no-preference`, and the page must be complete and
  legible with motion off.
- Scroll-driven effects use `animation-timeline` behind an `@supports` guard, so unsupported browsers
  get the static state rather than a broken one.
- No animation library. CSS keyframes, `animation-timeline: view()` and the View Transitions API
  cover everything the site does, at zero shipped bytes. `motion/react` was installed, measured
  against the CSS it would replace, and removed: it was a 34KB dependency for a slower version of
  behaviour already in `globals.css`. Reach for it only when something genuinely needs gesture,
  layout or presence work, and expect to justify the bytes.
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

The performance budget lives in `docs/PERF-BASELINE.md` with the measured numbers behind it. Raise a
ceiling only by editing that file with the reason. Never raise one to turn a red run green.

## Deployment

`main` auto-deploys to production on the `tusharlaad-site` Vercel project, which holds
`tusharlaad.com`. There is no staging step, so a broken push is a broken live site.

## Docs

- `docs/REDESIGN.md` — the brief, the research, the skills audit, and what changed
- `docs/CV-DATA.md` — source data behind `content.ts`. Read its final section first; earlier sections
  were superseded.
