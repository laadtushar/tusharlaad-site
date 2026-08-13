# tusharlaad.com

Personal site for Tushar Laad. One page carrying the work, the CV and the links,
built on Next.js 16, React 19, Tailwind v4 and TypeScript.

## The one thing to know

Everything on every surface comes from **`lib/content.ts`**. That single typed
object renders:

1. the homepage
2. the `/cv` route
3. the print stylesheet that turns `/cv` into the PDF
4. the JSON-LD `Person` block

Change a date once and the page, the printed CV and the search result move
together. There is no separate resume file to keep in sync.

## Routes

| Route | Contains |
| --- | --- |
| `/` | Console, the LabyNator product family, recommendations, CV, project ledger |
| `/cv` | The CV alone. Print it to get the PDF. |
| `/work/[slug]` | Case studies: problem, approach, the hard part, outcome |

## Design

Cold slate instrument surface. Phosphor amber `#e5a03c` is the single accent and
is reserved for live and dated values, so a number in amber is always a real
number. Green and red stay semantic. Radius is zero everywhere by decision.
Geist and Geist Mono, self-hosted through `next/font`, with mono restricted to
figures, dates, stack names and code.

Dark is the committed world. A full light palette answers `prefers-color-scheme`
and print gets its own.

The design was audited against [`pbakaus/impeccable`](https://github.com/pbakaus/impeccable)
and [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill). See
`docs/REDESIGN.md` for the audit and what changed.

## Develop

```bash
npm install
npm run dev
```

## Verify

`scripts/verify.mjs` drives a real browser over the built site and checks
contrast against WCAG AA, horizontal overflow, heading structure, alt text,
link accessible names, focus visibility, JSON-LD presence, and the typographic
bans the design commits to. It also writes screenshots at desktop, mobile and
print.

It needs Playwright, which is deliberately not a dependency so it never runs in
a deploy build:

```bash
npm i -D playwright
npm run build && npm start &
npm run verify
```

## Adding screenshots

Product cells upgrade automatically when given an image. Drop a file into
`public/shots/` and add it to the product in `lib/content.ts`:

```ts
image: { src: "/shots/treacle.png", alt: "Treacle voice profiling on iOS" }
```

## Docs

- `docs/REDESIGN.md` — the design brief, research and skills audit
- `docs/CV-DATA.md` — source data behind `content.ts`, with anything unverified marked
