# tusharlaad.com — Redesign Brief

**Date:** 13 Aug 2026 · **Status:** awaiting direction sign-off · **Phase:** design, no implementation yet

The repo is an untouched `create-next-app` scaffold — default copy, Vercel logo, no content.
Nothing to unwind, so this is a clean design exercise.

- **Subject:** Tushar Laad — systems, data & applied-AI engineer
- **Reader:** a recruiter with 30 seconds; an engineer who then clicks through
- **The page's job:** earn the callback; make the range legible fast
- **Raw material:** 23 public repos across Rust, TypeScript, Python, C#

---

## 1. Research findings

Seven things the 2026 roundups and the open-source reference set agree on.

| Finding | Consequence for this build |
| --- | --- |
| One page, project-first — 3–5 projects, each with stack and a measurable outcome | No "About / Skills / Services" scaffold. Projects **are** the page. |
| Two clicks (demo + repo) beat a paragraph of description | Demo + repo on every entry, and both must actually work. |
| 4–5 deep sections beat 8 shallow ones | Four real case studies; everything else is a one-line index row. |
| Dark mode is now the default for dev portfolios | Ship dark, but it buys no differentiation. Earn that from typography and density. |
| Bento is the baseline (~67% of top SaaS homepages) | If we use tiles, they need a reason — real data inside them. |
| Sites not published on day one mostly never launch | Ship a complete small site, then iterate. |
| A polished site pointing at bare repos loses the reader at the click-through | Repo descriptions and READMEs for the featured four are part of this job. |

## 2. Reference set

| Reference | Stack | Stars | Take / leave |
| --- | --- | ---: | --- |
| `bchiang7/v4` | Gatsby, styled-components | 8.3k | **Take** the sticky-left-identity / scrolling-right-content split — the most durable dev-portfolio layout there is. **Leave** the navy + `#64ffda` palette; it's the most cloned look on the web and reads as a fork on sight. |
| `leerob/site` | Next, MDX, Tailwind | 7.6k | **Take** the near-zero chrome and MDX-as-content model. **Leave** the writing-first structure unless writing actually happens. |
| `dillionverma/portfolio` | Next 14, shadcn, Magic UI | 1.5k | **Take** the single-config-file data model — one typed object drives every section. **Leave** the Magic UI effects; they date fast. |
| `ibelick/nim` | Next 15, Tailwind v4, motion-primitives | 743 | **Take** the motion vocabulary: small, consistent, purposeful. |
| `ByteGrad/portfolio-website` | Next, TypeScript | 767 | Useful as a checklist of sections to include, not as a look. |
| `namanbarkiya/minimal-next-portfolio` | Next 16, TypeScript | 197 | Closest to our Next 16 baseline; worth reading its content-object structure. |
| `terminal-portfolio` topic | CmdFolio, iamdhakrey, navnee1h | — | CLI-as-website. Memorable to engineers, but puts a parser between a recruiter and the work. Good as a `/terminal` easter egg, risky as the front door. |
| `bryantcodesart/portfolio-site` | Next, React Three Fiber, Sanity | *forked by you* | Read as a taste signal: experimental and interactive. But a 3D/Sanity build is weeks, and it's the wrong bet mid-interview-cycle. |

## 3. Content architecture

The content set isn't thin, it's unsorted. Four capabilities a hiring manager would care about are
present but invisible: **native systems work in Rust**, **real-time data engineering**, **applied LLM
work**, and **shipped full-stack product**.

### Featured — full case study (problem → approach → the hard part → outcome)

| Repo | Why it earns a page |
| --- | --- |
| `MemryLab` | The flagship. Rust + Tauri 2.0, privacy-first, native, and the only repo with external validation (12★). Systems *and* product *and* a point of view. |
| `spark-streaming-job-market` | The data-engineering proof: Kafka, Spark Structured Streaming, Redis. Opens data-platform roles; nothing else substitutes. |
| `job-hunt-dashboard` | Shipped product with real integration surface — Gmail sync, OAuth, AI classification. Pick over `xpenselab`; they're adjacent and showing both halves each. |
| `end-to-end-encrypted-chat-app` | Applied cryptography and asymmetric key management. Older, but the only security signal — worth a README refresh. |

### Index — one line, links only

`edytlab` · `pluely` · `samspace` · `SubspaceSynth` · `wayfinder` · `rust-pair-teach` ·
`fact-checker-AI-Skill` · `LLM-Driven-Job-Intent` · `frappe_mcp_server` · `xpenselab`

`edytlab` (Rust) and `samspace` were both touched today — if either is close to real, it may deserve
promotion over the E2E chat app.

### Off the site (still on GitHub, just not linked)

Forks (`erpnext`, `frappe_docker`, the `portfolio-site` fork), coursework-era repos (`attendax`,
`Crypto`), empty shells (`Riv`, `mental-model`). `pitchPerfect` — the Hinge automation agent — is a
judgment call: engineers would like it, recruiters are a coin flip. Recommendation: index it, don't
feature it.

## 4. Three directions

### A — Build Log *(recommended)*

> You build instruments for your own life. The site isn't a gallery, it's a log.

- **Palette:** graphite ground, slightly warm ink. *No brand accent* — colour is reserved for build
  status: green shipped `#4E9A6A`, amber in-progress `#C3903F`, grey archived. Links in slate blue
  `#8CBFE0`. Ground `#0A0C0E` / panel `#14171A` / ink `#E4E7E9`.
- **Type:** mono carries all structure (years, stack, status); a tight grotesque handles prose. Two
  families, strict roles.
- **Layout:** sticky identity rail left, hairline-separated ledger right. Rows, not cards. No rounded
  corners, no shadows, no accent bars.
- **Motion:** almost none — a 40 ms stagger on row entry, and that's the budget.
- **Cost:** 2–3 days. Ages the best of the three.
- **Risk:** with imprecise spacing and type it reads as plain rather than restrained. All the craft
  sits in millimetres.

### B — Signal

> The differentiator is real-time systems. The site behaves like an instrument.

- **Palette:** cold slate near-black `#06090D` / `#10161D`, ink `#D6DEE6`, **phosphor amber**
  `#E5A03C` for every number — warm data on a cold instrument. Green `#4FA574` and red `#C4553D`
  stay semantic.
- **Type:** mono-dominant with tabular figures so numbers sit in true columns.
- **Layout:** strict tile grid — bento, but square-cornered and rule-separated rather than floating
  rounded cards. Projects sized by weight.
- **Motion:** numbers count up on load, sparkline draws itself. One orchestrated moment, then still.
- **Cost:** 5–6 days — needs a GitHub data fetch at build time plus real charting.
- **Risk:** the conceit collapses if the numbers are decorative. Only worth doing with genuinely live
  data — and it quietly advertises quiet months.

### C — Archive

> MemryLab's premise turned on yourself: a timeline of how your thinking evolved.

- **Palette:** cool bone paper `#DEDFD8` / `#EEEFEA` — deliberately not the warm cream every
  AI-designed site reaches for — ink `#191B18`, deep ivy `#2F5E43` for headings and links.
- **Type:** a serif for everything you read, display and body both; mono confined to dates and
  metadata. Fully committed to being a reading site.
- **Layout:** single column, ~62 ch measure, chronological spine. Projects as inline specimens inside
  the writing, plus a separate index.
- **Motion:** none. Margin notes reveal on wide viewports.
- **Cost:** 2 days to build, forever to sustain.
- **Risk:** a bet on writing. An archive with two posts and an eight-month gap actively hurts. Don't
  pick it without a monthly cadence.

## 5. Recommendation — A, plus two elements from B

Build Log gets to a complete, credible site fastest, reads well in a thirty-second scan, has no
gimmick that can rot, and its density flatters 23 repos across four languages — the volume becomes
the argument.

From Signal, graft exactly two things: one real GitHub activity strip built from live data at build
time, and status chips (*shipped / in progress / archived*) on every entry. That gives the log its
instrument quality without the cost or fragility of a full dashboard.

Stub `/writing` from day one. If writing starts, Archive becomes a section rather than a redesign.

## 6. Structure, stack, order of work

| Route | Contains |
| --- | --- |
| `/` | Identity rail · four featured entries · full index ledger · contact. One page, one scroll. |
| `/work/[slug]` | Four case studies, each with a working demo link and repo link. |
| `/writing` | Stubbed. MDX-backed, empty until there's a first post worth linking. |
| `/resume.pdf` | A real file, kept current, linked from the identity rail. |

Stack stays put — **Next 16, React 19, Tailwind v4, TypeScript**, on Vercel. Additions: content as a
single typed `content.ts` object; two self-hosted faces via `next/font/local` (no CDN dependency, no
layout shift); GitHub stats fetched at build with ISR; view transitions between index and case study.

1. **Content before pixels** — write the four case studies and index lines; fix the repo descriptions
   and READMEs they point at; replace the "🎯 Focusing" bio. This determines whether the site works.
2. **Design system** — tokens, two typefaces, type scale, status colour set, light and dark. Verified
   on one row before anything is built.
3. **The home page** — identity rail, ledger, index, contact. Complete and deployable on its own.
4. **Case studies and the data strip** — four `/work` pages, then the GitHub fetch. Metadata, OG
   images, sitemap, and an accessibility + Lighthouse pass before the domain points at it.

## 7. Open questions

1. **Which direction — A, B, or C?** Nothing downstream starts until this is settled.
2. **Are you going to write?** An honest yes makes Archive viable and changes the structure. An
   honest no means `/writing` stays a stub.
3. **What links exist — LinkedIn, résumé, domain?** The GitHub profile has none right now, and the
   domain needs confirming as `tusharlaad.com`.
4. **Which four get case studies?** Recommendation above, but `edytlab` and `samspace` are live
   candidates.
5. **Do any of these have live demos?** Every finding says demo links outrank descriptions. If
   nothing is deployed, deploying two projects is worth more than anything done to the CSS.

## Sources

- [Software Engineer Portfolio Website: 10 Best Examples (2026)](https://sitesplaced.com/blog/best-portfolio-website-for-software-engineers) — sitesplaced
- [Software Engineer Portfolios: 15+ Well-Designed Examples (2026)](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios) — SiteBuilderReport
- [Top 8 Developer Portfolio Websites to Inspire You in 2026](https://www.gola.supply/blog/developer-portfolio-websites) — Gola
- [15 Best Developer Portfolio Examples 2026](https://myseera.com/blog/best-developer-portfolio-templates-2026) — Myseera
- [bchiang7/v4](https://github.com/bchiang7/v4) · [ibelick/nim](https://github.com/ibelick/nim) · [dillionverma/portfolio](https://github.com/dillionverma/portfolio) · [topic: nextjs-portfolio](https://github.com/topics/nextjs-portfolio) · [topic: terminal-portfolio](https://github.com/topics/terminal-portfolio)
- [Designing Bento Grids That Actually Work (2026)](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide) — SaaSFrame
- [Portfolio design trends for 2026](https://elements.envato.com/learn/portfolio-trends) — Envato Elements
