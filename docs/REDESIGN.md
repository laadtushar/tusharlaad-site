# tusharlaad.com — Redesign Brief

**Date:** 13 Aug 2026 · **Rev 3 — audited against all 23 repos and the public profile** · **Phase:**
design, no implementation yet · **Blocked on:** employment/education dates, and what currently deploys
the live domain

- **Subject:** Tushar Laad — Founding Software Engineer, Also Software Group
- **Location:** Newcastle upon Tyne, UK · Newcastle University
- **LinkedIn:** https://www.linkedin.com/in/tusharlaad2002/
- **Evidence base:** 23 repos, ~1,300 commits, 4 live demos

---

## 1. Audit findings

### tusharlaad.com is already live

Indexed as "Tushar Laad | Data Engineer & Software Architect", with an about section, skills and
client testimonials. **This repo is a bare `create-next-app`**, so something else is serving that
domain — most likely the `portfolio-site` fork of `bryantcodesart`. Both `tusharlaad.com` and
`linkedin.com` are blocked by the sandbox egress proxy, so neither could be read directly; the profile
details above come from search results. **Needs confirming before the domain is repointed.**

### The featured set was wrong in Rev 1 and Rev 2

`spark-streaming-job-market` was ranked second in both earlier revisions on the strength of its
description (Kafka, Spark, Redis, lambda architecture). Read properly it has **7 commits** and a
dashboard on `localhost:8505` with no deployment. It moves to the ledger. The genuinely heavy work was
in repos previously filed as minor — `edytlab` (237 commits), `xpenselab` (335), `wayfinder`.

### Two repos on the profile are forks

`pluely` (257 commits) is a fork of `iamsrikanthnani/pluely`; `frappe_mcp_server` (84) is a fork of
`kiran-harbak`. Both substantial and worth listing as contributions, but they must be labelled.
An engineer reading the site will check, and an unlabelled fork costs more trust than the repo earns.

## 2. Full inventory

Ranked by substance rather than description. Commit counts are the rough proxy; live demos and real
architecture decide the tiers.

### Featured — full case study

| Repo | Commits | Stack | Live | Read |
| --- | ---: | --- | --- | --- |
| `edytlab` | 237 | Rust, Tauri 2, symphonia, fundsp, ONNX, Demucs, Whisper | DNS pending | Conversational audio editor — describe an edit in English, an agent plans and renders it. Pure-Rust DSP with local ML. **Deepest technical work.** |
| `MemryLab` | 109 | Rust, Tauri 2, React 19, SQLite FTS5, D3, 9 LLM providers | memrylab.com | Strict hexagonal architecture, 30+ source adapters, 8-stage analysis pipeline, hybrid BM25 + vector search on device. Shipped installer, 12★, MIT. **The one with outside validation.** |
| `xpenselab` | 335 | Next 16, Firebase, Genkit, Gemini, Stripe | not deployed | Largest codebase. Subscriptions, GDPR, client-side encryption with recovery codes, EMI tracking, expense splitting. **Proof of finishing** — deploy it. |
| `wayfinder` | — | Unity 6 LTS, OpenXR, Vulkan, C#, GDAL/QGIS | Play Store pending | Space exploration for Samsung Galaxy XR on real Mars/Moon terrain. 72 fps on device, 72 passing tests, hands-only. **Nobody else's portfolio has this.** |
| `job-hunt-dashboard` | 75 | Next 16, Postgres, Prisma, Gemini 2.0 Flash, NextAuth | meridian-job-sync.vercel.app | Ships as "Meridian". Multi-agent extraction with a reflexion loop that critiques its own output. **Easiest to demo in an interview.** |

### Ledger — one dense row each

| Repo | Commits | Stack | Live | Note |
| --- | ---: | --- | --- | --- |
| `end-to-end-encrypted-chat-app` | 117 | Vite, Firebase, WebCrypto | decipher.website | Asymmetric key management plus steganography, IEEE-style paper and video in repo. Borderline feature. |
| `samspace` | 34 | Next 14, Vercel Blob, Vitest | samspace.vercel.app | Real client work — therapy practice site, intake forms, admin dashboard, AES-256-GCM at rest. **The only thing built for someone else.** |
| `rust-pair-teach` | 22 | TypeScript, VS Code API | .vsix | Rust tutor extension that refuses to write your code. README honestly flags untested thresholds. |
| `spark-streaming-job-market` | 7 | PySpark, Kafka, Redis, Parquet | localhost | Lambda architecture, hot and cold paths. Demoted from featured. |
| `LLM-Driven-Job-Intent` | 1 | PDF only | — | The Newcastle dissertation. Belongs in *education*, not the project ledger. |
| `fact-checker-AI-Skill` | 2 | Markdown, Python linter | — | Packaged Claude skill for sourced fact-checking. Small but current. |
| `pitchPerfect` | 14 | Python, ADB, OpenCV, Tesseract | demo video | Hinge automation via screen capture, ORB matching, OCR. Genuine CV pipeline; recommendation is still to leave it off. |
| `SubspaceSynth` | 42 | Next, Firebase Studio | — | Effectively an unmodified starter template. |

### Forks — list as contributions, labelled

| Repo | Commits | Upstream | Live |
| --- | ---: | --- | --- |
| `pluely` | 257 | `iamsrikanthnani/pluely`, GPL-3.0 | pluely.com |
| `frappe_mcp_server` | 84 | `kiran-harbak` | — |

### Off the site

`erpnext`, `frappe_docker` (upstream clones, no divergence); `attendax`, `Crypto`, `Riv`,
`mental-model`, `frappe-cumbrian-dreams` (coursework-era or empty).

## 3. The positioning problem

The CV and the GitHub describe two different engineers.

- **Professional identity:** data engineering — Founding Software Engineer at Also Software Group,
  Azure Databricks, PySpark, ETL pipelines, REST APIs, Docker, plus a Newcastle dissertation on
  LLM job-intent extraction.
- **GitHub identity:** Rust systems work, native apps, XR, shipped consumer product. ~1,300 commits.

Leading only on data engineering buries the strongest evidence; leading only on side projects reads as
hobbyist and discards the paid track record. **The layered structure resolves this without
compromise** — which is the strongest argument for it:

> Layer 1 shows the builder (edytlab, MemryLab, xpenselab — range and depth in eight seconds).
> Layer 2 shows the professional (Also Software Group, the data-engineering track, Newcastle, in full).

The tagline must do both jobs in one line — closer to *"Data engineer. I build and ship native tools
in Rust."* than to either half alone.

## 4. Information architecture — three depths, one page

A CV is linear and dense; a dashboard is spatial and sparse. Sites that try to be both usually fail by
treating them as peers. Here they aren't: the tiles are a summary layer, everything dense sits beneath.

1. **The console** — tiles only. Identity and availability, a dated `/now` line, real stack, live repo
   and activity figures, featured projects. Nothing longer than two lines.
2. **The CV** — employment, education, dissertation, skills grouped by domain. Web content, not an
   embedded PDF. No percentage bars.
3. **The ledger** — everything else as dense dated rows, including a labelled contributions block for
   the two forks.

## 5. Direction — Console

> One surface you operate everything from.

Signal's instrument language, re-founded on content that can carry a CV.

- **Palette:** cold slate near-black `#06090D` / `#10161D`, ink `#D6DEE6`, **phosphor amber** `#E5A03C`
  reserved for live and dated values. Green `#4FA574` and red `#C4553D` strictly semantic. Full light
  theme for reading and printing.
- **Type:** mono for every label, figure and stack chip, with tabular numerals so dates and counts
  align. A grotesque takes over entirely for CV prose.
- **Layout:** tile grid above, hairline-ruled rows below. Square corners, no shadows. Tile size follows
  content weight.
- **Motion:** one orchestrated load — figures count up, sparkline draws, tiles settle. Then nothing
  moves. Disabled under `prefers-reduced-motion`.
- **Cost:** 5–6 days (five case studies rather than three, plus CV layer, print route, GitHub fetch).
- **Risk:** amber figures must be real — every number fetched or dated, never hand-typed.

## 6. Architecture — one file is the source of truth

A single typed `content.ts` (profile, links, experience, education, skills, projects) renders **four**
outputs: the homepage, the `/cv` route, a print stylesheet that produces the PDF, and JSON-LD `Person`
data so search resolves the name to this site.

| Route | Contains |
| --- | --- |
| `/` | All three layers — console, CV, ledger, outbound links. One page, one scroll. |
| `/cv` | The CV alone, print-optimised. ⌘P gives a clean PDF with no site chrome. This *is* the résumé file. |
| `/work/[slug]` | Five case studies: edytlab, MemryLab, xpenselab, wayfinder, Meridian. |
| `/writing` | Stubbed — pipeline exists, nothing in the nav. |

Stack unchanged: **Next 16, React 19, Tailwind v4, TypeScript** on Vercel. Additions: two self-hosted
faces via `next/font/local`, GitHub figures fetched at build with ISR, print stylesheet.

## 7. Order of work

1. **The content model** — define and fill `content.ts`. Needs the dates. Gates everything else.
2. **Design system** — tokens, two typefaces, type scale, semantic status colours, light and dark.
3. **Layer 1, the console** — tile grid, identity, now, stack, featured work, GitHub fetch.
   Deployable on its own.
4. **Layers 2 and 3** — CV section, ledger, contributions, outbound links, then `/cv` with print.
5. **Case studies and launch** — five `/work` pages, JSON-LD, OG images, sitemap, accessibility and
   Lighthouse pass before the domain moves.

## 8. Open questions

1. **What currently deploys tusharlaad.com?** The domain is live and indexed but this repo is empty.
   Is it the `portfolio-site` fork, and is there content on it worth keeping?
2. **Employment and education dates.** Employer, title, university and dissertation topic are known;
   no dates, no degree title, no earlier roles. Both proxy blocks prevent reading them.
3. **Two lines per role on what changed.** "Built data pipelines" is a duty; "cut the nightly ETL from
   six hours to forty minutes" is an outcome. Highest-leverage thing to write.
4. **Can `xpenselab` and `edytlab` be deployed?** Four demos are already live; the two biggest and
   deepest repos are the ones without.
5. **Is the availability tile true, and does `pitchPerfect` stay off?** Recommendations: yes and yes.

## Sources

- Profile: [linkedin.com/in/tusharlaad2002](https://www.linkedin.com/in/tusharlaad2002/) (proxy-blocked;
  details via search results) · [github.com/laadtushar](https://github.com/laadtushar) — all 23
  repositories read individually
- Live demos verified in READMEs: memrylab.com · meridian-job-sync.vercel.app · samspace.vercel.app ·
  decipher.website · pluely.com (fork)
- [Software Engineer Portfolio Website: 10 Best Examples (2026)](https://sitesplaced.com/blog/best-portfolio-website-for-software-engineers) · [SiteBuilderReport](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios) · [Gola](https://www.gola.supply/blog/developer-portfolio-websites) · [Myseera](https://myseera.com/blog/best-developer-portfolio-templates-2026)
- [bchiang7/v4](https://github.com/bchiang7/v4) · [ibelick/nim](https://github.com/ibelick/nim) · [dillionverma/portfolio](https://github.com/dillionverma/portfolio) · [topic: nextjs-portfolio](https://github.com/topics/nextjs-portfolio)
- [Designing Bento Grids That Actually Work (2026)](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide) · [Envato portfolio trends 2026](https://elements.envato.com/learn/portfolio-trends)

---

### Appendix — directions set aside

**Build Log** (Rev 1). Dense dated ledger, sticky identity rail, status colour instead of a brand
accent. Graphite `#0A0C0E` / `#14171A`, ink `#E4E7E9`, status green `#4E9A6A` / amber `#C3903F`.
*Its ledger survives as layer 3.*

**Archive** (Rev 1). Prose-first, serif throughout, cool bone paper `#DEDFD8` / `#EEEFEA`, ink
`#191B18`, deep ivy `#2F5E43`. *Dropped — no writing cadence.*
