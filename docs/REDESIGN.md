# tusharlaad.com — Redesign Brief

**Date:** 13 Aug 2026 · **Rev 2 — rescoped from portfolio to personal hub** · **Phase:** design, no
implementation yet · **Blocked on:** CV data

Not a project portfolio. The canonical page for Tushar Laad — CV, profile, links, work, everything —
with this site as the source of truth that LinkedIn and a PDF are copies of, rather than the other
way round.

- **Subject:** Tushar Laad — systems, data & applied-AI engineer
- **Reader:** a recruiter with 30 seconds; an engineer who then clicks through
- **The page's job:** be the one link you send instead of four
- **Raw material:** 23 public repos across Rust, TypeScript, Python, C# — plus a CV not yet supplied

---

## 1. What changed from Rev 1

Rev 1 designed a portfolio. The correction — that this should carry the CV, profile and everything,
not just repos — is structural, not stylistic. A portfolio strips everything that isn't a project; a
hub holds work, career history, education, identity and outbound links *at different weights on one
surface*. Opposite instincts.

Two consequences:

1. The tile grid from **Signal** turns out to be right for the real brief — not because tiles are
   fashionable, but because it's the one layout that holds heterogeneous content without pretending
   it's a list.
2. Signal's original thesis (live GitHub metrics) is far too thin to carry a CV. Same visual
   language, rebuilt on a foundation that holds. That's **Console**.

**Archive is out** — no writing habit, so a prose-first site is off the table and `/writing` stays a
stub. **Build Log** isn't wasted: its dense dated ledger becomes the project index inside Console,
which is the job it was best at.

## 2. Research findings, and where the brief overrides them

The 2026 literature is written about *portfolios*. Most still applies; two findings now cut the other
way.

| Finding | Consequence |
| --- | --- |
| Two clicks (demo + repo) beat a paragraph | Demo + repo on every entry, both working. |
| ~~One page, projects only~~ | **Overridden.** One page, but layered — summary first, CV and index beneath. |
| ~~Four or five sections, no more~~ | **Overridden carefully.** More content, but only *three* depths of attention. |
| Dark mode is table stakes, not differentiation | Ship both; make light mode genuinely good — recruiters print things. |
| Bento is the baseline (~67% of top SaaS homepages) | Tiles must earn their size from real content, never decoration. |
| Sites not published on day one mostly never launch | Layer 1 ships alone if it has to. |
| A polished site pointing at bare repos loses the reader | Repo descriptions and READMEs are part of this job. |
| A hub's failure mode is staleness, not ugliness | One dated `/now` line, cheap enough to actually update. |

## 3. Information architecture — three depths, one page

A CV is linear and dense; a dashboard is spatial and sparse. Jamming them together is how these sites
usually fail. The fix: they aren't peers. Tiles are a **summary layer** answering "who is this and is
he any good" in about eight seconds; everything dense sits underneath.

### Layer 1 — The console

Above the fold, tiles only. Identity and availability · what you're doing *now* · real stack · live
repo and activity figures · three featured projects. Nothing longer than two lines.

### Layer 2 — The CV

Full career history as web content, not an embedded PDF: experience, education, and an honest skills
block grouped by domain. No percentage bars or star ratings — they read as padding to anyone
technical.

**This is the part that can't be written yet.** 23 repos are known; roles, dates, employers,
education and location are not. This is the one real blocker.

### Layer 3 — The ledger

Everything else built, as dense dated rows with stack and status — Build Log's good idea surviving as
a component.

- **Featured (3 tiles):** `MemryLab` · `spark-streaming-job-market` · `job-hunt-dashboard`
- **Ledger rows:** `edytlab` · `samspace` · `pluely` · `SubspaceSynth` · `wayfinder` ·
  `rust-pair-teach` · `fact-checker-AI-Skill` · `LLM-Driven-Job-Intent` · `frappe_mcp_server` ·
  `xpenselab` · `end-to-end-encrypted-chat-app`
- **Not linked:** forks (`erpnext`, `frappe_docker`, the `portfolio-site` fork), coursework repos
  (`attendax`, `Crypto`), empty shells (`Riv`, `mental-model`). `pitchPerfect` is a coin flip in
  front of a recruiter — recommendation is to leave it off the ledger and keep it on GitHub.

### Elsewhere — outbound

One footer block with every profile that's actually yours. The point of a hub is that this list
exists in exactly one place.

## 4. Direction — Console

> One surface you operate everything from.

Keeps Signal's instrument language — cold slate, phosphor amber on every figure, square-cornered
tiles separated by rules rather than floating cards — but the tiles carry a person, not a metrics
wall.

- **Palette:** cold slate near-black `#06090D` / `#10161D`, ink `#D6DEE6`, **phosphor amber**
  `#E5A03C` reserved for live and dated values. Green `#4FA574` and red `#C4553D` strictly semantic.
  Full light theme for reading and printing.
- **Type:** mono for every label, figure and stack chip, with tabular numerals so dates and counts
  sit in true columns. A grotesque takes over entirely for CV prose, where mono would be unreadable
  at length.
- **Layout:** tile grid above, hairline-ruled rows below. Square corners, no shadows, no accent bars.
  Tile size set by content weight — MemryLab is bigger because it earned it.
- **Motion:** one orchestrated load — figures count up, sparkline draws, tiles settle in a short
  stagger. Then nothing moves. Fully disabled under `prefers-reduced-motion`.
- **Cost:** 4–5 days once CV data exists.
- **Risk:** amber figures must be real. A hand-typed "23 repos" that's wrong in a month is worse than
  no tile — every number is fetched or dated.

## 5. Architecture — one file is the source of truth

A single typed `content.ts` object (profile, links, experience, education, skills, projects) is read
by **four** outputs:

1. the homepage
2. the `/cv` page
3. a print stylesheet that produces the PDF
4. JSON-LD `Person` structured data, so search engines resolve the name to this page

The practical payoff: no separately maintained résumé file ever again. Change a date once and the
page, the printed CV and the search result move together. Today that's four places, and they will
drift.

| Route | Contains |
| --- | --- |
| `/` | All three layers — console tiles, CV, ledger, outbound links. One page, one scroll. |
| `/cv` | The CV alone, print-optimised. ⌘P gives a clean one-page PDF with no site chrome. This *is* the résumé file. |
| `/work/[slug]` | Case studies for the three featured projects: problem → approach → the hard part → outcome. |
| `/writing` | Stubbed. Pipeline exists, nothing in the nav. |

Stack unchanged: **Next 16, React 19, Tailwind v4, TypeScript**, on Vercel. Additions are deliberately
few — two self-hosted faces via `next/font/local` (no CDN dependency, no layout shift), GitHub figures
fetched at build with ISR so they refresh without a deploy, and a print stylesheet.

## 6. Order of work

1. **The content model** — define and fill `content.ts`. Needs CV data. Gates everything else.
2. **Design system** — tokens, two typefaces, type scale, semantic status colours, light and dark.
   Verified on one tile and one CV row before building at scale.
3. **Layer 1, the console** — tile grid, identity, now, stack, featured work, GitHub fetch.
   Deployable on its own.
4. **Layers 2 and 3** — CV section, project ledger, outbound links, then `/cv` with the print
   stylesheet.
5. **Case studies and launch** — three `/work` pages, JSON-LD, OG images, sitemap, accessibility and
   Lighthouse pass before the domain points at it.

## 7. Open questions

1. **Your CV, in any form.** Roles, employers, dates, education, location. An existing résumé, a
   LinkedIn export, or rough notes — structuring it is the easy part. **Blocks phase 1.**
2. **Actual links, and the domain.** LinkedIn URL, public email, anything else. The GitHub profile
   has no links at all right now. Confirm the domain is `tusharlaad.com`.
3. **Does Console land now that it carries a CV?** If the tile language still feels right, build it.
   If it now reads too cold for career history, the palette warms.
4. **Open to work — and should the site say so?** The availability tile is effective only if it's
   true and gets turned off later.
5. **Do any projects have live demos?** Demo links outrank descriptions. If nothing is deployed,
   deploying two beats anything done to the CSS.
6. **Are `edytlab` or `samspace` ready to feature?** Both touched today; either may displace
   `job-hunt-dashboard` in the featured three.

## Sources

- [Software Engineer Portfolio Website: 10 Best Examples (2026)](https://sitesplaced.com/blog/best-portfolio-website-for-software-engineers) — sitesplaced
- [Software Engineer Portfolios: 15+ Well-Designed Examples (2026)](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios) — SiteBuilderReport
- [Top 8 Developer Portfolio Websites to Inspire You in 2026](https://www.gola.supply/blog/developer-portfolio-websites) — Gola
- [15 Best Developer Portfolio Examples 2026](https://myseera.com/blog/best-developer-portfolio-templates-2026) — Myseera
- [bchiang7/v4](https://github.com/bchiang7/v4) · [ibelick/nim](https://github.com/ibelick/nim) · [dillionverma/portfolio](https://github.com/dillionverma/portfolio) · [topic: nextjs-portfolio](https://github.com/topics/nextjs-portfolio) · [topic: terminal-portfolio](https://github.com/topics/terminal-portfolio)
- [Designing Bento Grids That Actually Work (2026)](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide) — SaaSFrame
- [Portfolio design trends for 2026](https://elements.envato.com/learn/portfolio-trends) — Envato Elements

---

### Appendix — directions considered and set aside (Rev 1)

**Build Log.** Dense dated ledger, sticky identity rail, status colour instead of a brand accent.
Graphite `#0A0C0E` / `#14171A`, ink `#E4E7E9`, status green `#4E9A6A` / amber `#C3903F`. Cheapest and
longest-lived, but a project-only structure. *Its ledger survives as Layer 3.*

**Archive.** Prose-first, serif throughout, cool bone paper `#DEDFD8` / `#EEEFEA`, ink `#191B18`, deep
ivy `#2F5E43`. Strongest identity of the three, but depends on a monthly writing cadence. *Dropped —
no writing habit.*
