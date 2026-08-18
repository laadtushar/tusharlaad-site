# CV source data

Transcribed from LinkedIn screenshots supplied by Tushar on 13 Aug 2026. This is the input for
`content.ts`. Anything marked NEEDS CONFIRMING is not yet verified.

## Identity

- **Name:** Tushar Laad
- **Location:** Newcastle upon Tyne, England, UK
- **LinkedIn:** https://www.linkedin.com/in/tusharlaad2002/
- **GitHub:** https://github.com/laadtushar
- **Email:** tusharlaad2002@gmail.com (confirm this is the address to publish)

## Experience

Note the deliberate overlaps: Appsatile runs to Mar 2026 while Treacle (Jan to Mar 2026) and
LabyNator (Nov 2025 to Apr 2026) run alongside it. The CV layer has to render concurrent roles
without looking like an error.

### Founder, LabyNator
Self-employed. Nov 2025 to Apr 2026 (6 mos). United Kingdom, remote.
- Founded LabyNator, an independent software lab and parent [description truncated in screenshot,
  NEEDS CONFIRMING]
- Skills tagged: Business Ownership, Start-up Leadership, +6

### Founding Engineer, Treacle
Full-time. Jan 2026 to Mar 2026 (3 mos). London Area, UK, hybrid.

Built Treacle, an AI-native dating app (iOS and Android) replacing swiping with AI voice profiling.
Architected and shipped the entire product as a solo engineer.

- Proprietary 32-dimension matching algorithm across psychological domains (values, communication,
  lifestyle); weekly Inngest jobs with confidence-gated scoring and admin review workflow
- ElevenLabs voice architecture (STT, Claude LLM, TTS, WebRTC) with real-time prosody DSP; voice
  reactivity signals captured into a Neo4j soul graph
- Next.js backend (109 API routes), React Native mobile (Expo SDK 55), PostgreSQL with pgvector
  (6 embedding tables), Redis, AWS infrastructure; AES-256 encryption for sensitive profile data
- Sentry observability facade across backend and mobile to enforce boundary discipline; ESLint rules
  and 38+ tests to prevent error capture spam
- CI/CD: backend linting, EAS builds, Sentry source maps, auto-deploy to AWS App Runner on main

### Founding Software Engineer (Data), Appsatile Ltd
Full-time. Jun 2024 to Mar 2026 (1 yr 10 mos). Gateshead, England, UK, on-site.

- **Data architecture and multi-tenancy:** architected a 7-layer composable data system (T1 to T2
  storage, L1 to L6 semantic layers) with cross-app interoperability, type safety and versioning;
  designed cell-based multi-tenancy using Row-Level Security for standard tenants and dedicated cells
  for enterprise, with 3-tier caching (Caffeine, Redis, PostgreSQL) achieving sub-millisecond latency
- **Master data management and migration:** built a Go-based MDM platform with fuzzy matching, golden
  record merging and multi-source ingestion (PostgreSQL, NATS JetStream, Redis, MinIO); engineered
  PropertyCMS (FastAPI and Next.js) with a dynamic JSONB entity framework and migration scripts
  consolidating 165 properties and 8,395 expenses from corrupt legacy systems with safe replay
- **AI and data governance:** built a RAG system using ChromaDB and Ollama LLMs with auto-indexing,
  smart chunking and semantic search, deployed as an MCP server with REST API; established governance
  covering classification, retention, field-level masking and record-level access controls for AI
  training workflows
- **Cloud infrastructure:** deployed production Kubernetes (K3s) on AWS with Keycloak OAuth, Kafka and
  a full observability stack (Prometheus, Grafana), automated via Helm and Kustomize
- **Technical leadership:** led a 5-dev team and authored a 20+ page platform specification with
  PlantUML diagrams, ADRs and workspace isolation principles; established standards for code review,
  API versioning, structured logging and 24/7 runbooks

### Data Scientist, Hexis Lab Limited
Part-time. Apr 2024 to Jun 2024 (3 mos). Newcastle upon Tyne, England, UK, on-site.

Integrated generative AI and data engineering into the HexisPro scientific platform, bridging cosmetic
science and software engineering.

- Integrated GPT-4o API and spaCy NLP for automated cosmetic ingredient analysis with sentiment
  scoring and trend forecasting across 30,000+ European Commission regulatory data points scraped via
  Python and Pandas pipelines
- Prototyped the Faceskin AI assistant using GPT-4 Vision to analyse user-uploaded images for
  personalised skincare recommendations; deployed ML services with FastAPI and Docker
- Built chemical structure visualisations in React using Three.js for interactive 3D molecular
  rendering

### Data Engineer, OceanFrogs
**NEEDS CONFIRMING.** Not visible in the supplied screenshots, but three recommendations place him
there: Srujan P (Product and Engineering Manager at OceanFrogs, managed him directly, "over a year"),
Vinay Mehendi PhD (managed directly), Pranjal Upadhyaya (same team). Dates appear to be roughly 2022
to 2023, India. A course, "Advanced SQL Server Masterclass for Data Analysis", is tagged as associated
with OceanFrogs.

Per the recommendations: started as a website developer (WordPress), took on the data engineer role,
built REST APIs, built data pipelines, worked with Docker, data scraping, data mining, data labeling,
analytics and ML, SQL Server stored procedures, ran trainings for team members, enforced documentation
practices.

### CEO and Founder, Build My Site
Self-employed. Mar 2020 to Mar 2023 (3 yrs 1 mo). India.

- Founded and operated a web development agency delivering WordPress solutions to 10+ small business
  and startup clients; managed end-to-end project lifecycle from scoping to deployment
- Developed a proprietary Flutter hybrid web-view mobile application published on Google Play
- Implemented SEO optimisation and performance tuning achieving 90+ PageSpeed scores across the client
  portfolio

### Community Manager and City Representative, Poems India
Part-time. Dec 2018 to Jun 2022 (3 yrs 7 mos). Pune Division, Maharashtra, India.

Supervised all India city teams and events, represented Poems India in Pune, laid out guidelines for
events nationally.

### Hindi Content Writer, Poet, Storyteller and Performer
Freelance. Jan 2018 to Jun 2022 (4 yrs 6 mos).

## Education

LinkedIn shows **5 education entries**; detail not captured in the screenshots. Newcastle University is
confirmed via search. The dissertation is in the repo
`LLM-Driven-Identification-of-Job-Intent-Technologies-and-Teams`. **NEEDS CONFIRMING:** degree titles,
institutions and years for all five.

## Recommendations received

Five, all set to public visibility. Strongest excerpts for the site, trimmed to three lines each per
the taste-skill quote rule.

| From | Role | Date | Relationship |
| --- | --- | --- | --- |
| Joel Joseph Joy | Azure Data Engineer, Databricks Engineer | 3 Mar 2026 | Managed directly at Appsatile |
| Suleiman Muhammad Sabo | Cybersecurity Student, PTDF Scholar | 30 Mar 2024 | Same team |
| Pranjal Upadhyaya | Data Engineer III | 2 Nov 2023 | Same team |
| Vinay Mehendi, PhD | OceanFrogs | 20 Sep 2023 | Managed directly |
| Srujan P | Product and Engineering Manager, OceanFrogs | 8 Sep 2023 | Managed directly |

Pull quotes worth using:

- **Suleiman**, on the E2E chat project: "We were faced with the complex challenge of implementing
  end-to-end encryption, particularly how to securely store and manage encryption keys. He devised an
  elegant solution that balanced security with usability: storing public keys on our servers while
  keeping private keys on users' local devices." This is the strongest single quote available, because
  it describes a specific technical decision rather than character.
- **Joel Joseph Joy:** "He not only delivered on assigned responsibilities but regularly went beyond
  expectations, investing additional time to understand underlying systems and improve solution
  quality."
- **Srujan P:** "Excellent skills at building Data Pipelines, REST APIs, and Docker... a great team
  player who communicates effectively and shares knowledge generously."
- **Vinay Mehendi:** "He started as a website developer (WordPress), took on data engineer role, built
  APIs for us. He performed beautifully." (The "please do not hire him because we would like to hire
  him back" joke is charming but does not belong on the site.)

## Naming conflict to resolve

`job-hunt-dashboard` ships as **Meridian** in its README and at `meridian-job-sync.vercel.app`, but is
listed as **HyredLab** on LinkedIn. Pick one name and use it in all three places.

## Real metrics available for the site

These come from the CV and are verifiable, so they are usable as figures without falling foul of the
fake-precision rule:

- 7-layer composable data system, sub-millisecond latency via 3-tier caching
- 165 properties and 8,395 expenses migrated from corrupt legacy systems
- 109 API routes, 38+ tests, 32-dimension matching algorithm (Treacle)
- 30,000+ European Commission regulatory data points (Hexis Lab)
- 5-dev team led, 20+ page platform specification (Appsatile)
- 10+ agency clients, 90+ PageSpeed scores (Build My Site)

---

# Public footprint sweep, 13 Aug 2026

Web search across GitHub, LinkedIn and the open web. Several domains (LinkedIn, tusharlaad.com,
mytreacle.com, sessionize.com, YouTube, Companies House) are blocked by the sandbox egress proxy, so
the findings below come from search result content rather than direct reads. Marked accordingly.

## The live site is years out of date

`tusharlaad.com` is indexed as "Tushar Laad | Data Engineer & Software Architect" and carries
testimonials plus a project list. The projects it shows are:

- Decipher, the end-to-end encrypted chat app, with demo video, code and paper
- A PHP attendance and leave CMS (`attendax`)
- A Selenium browser automation script for booking COVID-19 vaccination slots
- A Flutter hybrid web-view application
- Management systems for a bike showroom, a book shop, a bus tourism company and a pizza store
- A Cricket Score Archive System with database connectivity

**Every one of these predates 2024.** The site contains nothing about Appsatile, Treacle, LabyNator,
MemryLab, edytlab, wayfinder or xpenselab. It presents a student who built CRUD apps, while the actual
record is someone who architected a 7-layer data platform, led five developers, and shipped an
AI-native dating app solo.

This is the strongest single argument for the rebuild, and it reframes the urgency: the current site is
not merely dated, it is actively arguing against him.

## Employer name resolved

**Appsatile Software Group Ltd**, company number 13815407, incorporated 23 December 2021, registered at
163 Alexandra Road, Gateshead, Tyne and Wear, NE8 1RB. A related entity, **Appsatile PM Ltd** (14736046,
incorporated 16 March 2023), shares the address and holds a UK visa sponsor licence.

Earlier revisions of this brief recorded the employer as "Also Software Group", taken from a search
snippet that had truncated "Appsatile Software Group". Corrected.

## Treacle is live and public

**https://www.mytreacle.com/** is up, positioned as "Your AI dating companion". Per its description,
the app builds a profile through organic conversation rather than forms, and debriefs with the user
after dates to learn what worked.

This matters more than any repo: it is a **publicly shipped consumer product** that he architected and
built alone, verifiable by anyone. It belongs in the featured set, and it is the strongest possible
support for the founding-engineer positioning.

## A publication exists

Decipher ships with an IEEE-style paper, **"Advancing Chat Security: Asymmetric Encryption for Scalable
Web Applications"**, plus a demo video, live at `decipher.website`. This should be a publications entry
on the CV, not just a project row. NEEDS CONFIRMING: whether it was formally published or is a
self-authored write-up.

## Other profiles found

| Profile | URL | Status |
| --- | --- | --- |
| YouTube channel | `youtube.com/channel/UCtPkBKOuMpph-L5D3QgAK2w` | Exists under his name. Content unknown, proxy-blocked. NEEDS CONFIRMING whether it is technical and worth linking. |
| Sessionize speaker profile | `sessionize.com/tushar/` | Indexed as "Tushar Laad's Speaker Profile", but the bio reads "a senior developer working with diverse clients on business applications and architecture consulting", which does not match. **Probably a different Tushar Laad.** NEEDS CONFIRMING. |
| Facebook | `facebook.com/tushar.laad.3/` | Personal. Not for the site. |

`LabyNator` has no web presence at all: no site, no Companies House entry surfaced, no mentions. It
exists only as a LinkedIn role.

## Name collision, and why the structured data matters

LinkedIn lists **three separate "Tushar Laad" profiles**, and search results mix him with Tushar Lall
(a music composer), Tushar Lad, and Tushar Ladhe. His name does not resolve cleanly to him.

This turns the JSON-LD `Person` block from a nice-to-have into a real requirement: `sameAs` links
across GitHub, LinkedIn, the live products and the YouTube channel are what let search engines collapse
those into one identity and rank his own domain first.

## Revised featured set

Treacle's discovery changes the ranking. Proposed order:

1. **Treacle**, `mytreacle.com`. Shipped consumer product, solo-built, publicly verifiable.
2. **Appsatile platform work.** Not a repo, but the deepest system: 7 layers, sub-millisecond latency,
   five developers. Needs a case study written from the CV rather than from code.
3. **edytlab**, 237 commits. Rust DSP with local ML.
4. **MemryLab**, `memrylab.com`. Shipped native app, 12 stars, hexagonal architecture.
5. **wayfinder**. Unity XR on real planetary terrain, the one nobody else has.

`xpenselab` and Meridian move to the ledger's top rows. This is the first version of the list where the
professional work outranks the repos, which is the correct outcome now that the CV is known.

---

# The product family, 13 Aug 2026

Four domains supplied by Tushar: `labynator.com`, `xpenselab.com`, `hyredlab.com`, `memrylab.com`.
All are blocked by the sandbox HTTP proxy and none are indexed in search, so they were verified by DNS
resolution instead.

| Domain | Resolves to | Host | Status |
| --- | --- | --- | --- |
| `labynator.com` | 216.198.79.1 | Vercel | Live |
| `memrylab.com` | 216.198.79.1 | Vercel | Live |
| `hyredlab.com` | 216.198.79.1 | Vercel | Live |
| `xpenselab.com` | 35.219.200.8 | Google Cloud | Live, consistent with its Firebase stack |
| `mytreacle.com` | 2600:9000:... | AWS CloudFront | Live, consistent with "auto-deploy to AWS App Runner" |
| `tusharlaad.com` | 216.198.79.1 | Vercel | Live, and years out of date |
| `edytlab.app` | no record | | Not provisioned, matching its README |
| `decipher.website` | **no record** | | **Dead.** See below. |

## LabyNator is a product house, and the naming is systematic

This is the most important structural finding in the whole brief. These are not scattered side
projects. There is a parent lab and a branded family under it:

```
LabyNator            labynator.com        the lab
  MemryLab           memrylab.com         memory timeline, Rust + Tauri
  XpenseLab          xpenselab.com        personal finance, Next + Firebase
  HyredLab           hyredlab.com         job tracker, Next + Gemini
  edytlab            edytlab.app          audio editor, Rust DSP (domain pending)
Treacle              mytreacle.com        the outlier, built for a separate venture
```

The LinkedIn entry that cut off at "an independent software lab and parent" is now legible: LabyNator
is the parent company, and every product carries the `Lab` suffix.

**Design consequence.** The earlier revisions framed the work as "23 repos, pick the best five". That
framing undersells it badly. The correct framing is that he **founded a software lab and shipped four
products under one brand**, plus a fifth for another company. The site's work section should present
the lab and its portfolio, not a flat project list. Range and follow-through are the argument, and the
shared naming makes that argument on its own.

This also strengthens the positioning line. Not "I build things", but something closer to running a
one-person product studio while holding down a founding engineering role.

## Two corrections to earlier revisions

1. **xpenselab IS deployed.** Rev 3 recorded "not deployed" from the README, which has no demo link.
   The site is live at `xpenselab.com` on Google Cloud. Its README needs the link added.
2. **The Meridian and HyredLab conflict resolves to HyredLab.** The product ships at `hyredlab.com`
   and LinkedIn calls it HyredLab. The `job-hunt-dashboard` README still calls it Meridian and points
   at `meridian-job-sync.vercel.app`. **The README is the stale one** and should be updated to match
   the product and the family naming.

## Broken link to fix first

`decipher.website` **does not resolve**. It is advertised as the live demo in the
`end-to-end-encrypted-chat-app` README, and it is listed as a project on the current `tusharlaad.com`.
A dead demo link is worse than no demo link: it reads as abandonment, and it is currently on the site
recruiters find. Either restore the domain or strip the reference from both places before anything
else ships.

## Revised featured set, final

1. **LabyNator**, the lab itself, presented as the frame rather than a sixth product.
2. **Treacle**, `mytreacle.com`. Solo-built consumer app on iOS and Android, publicly verifiable.
3. **MemryLab**, `memrylab.com`. Rust and Tauri, hexagonal architecture, 12 stars, shipped installer.
4. **edytlab**. Rust DSP with local ML, 237 commits. Deepest code, no domain yet.
5. **Appsatile platform work.** Not a repo. The 7-layer system, sub-millisecond latency, five
   developers. Written from the CV.
6. **wayfinder**. Unity XR on real planetary terrain.

`HyredLab` and `XpenseLab` sit directly under the lab as shipped products rather than case studies, so
the family reads complete without four more long-form pages.

---

# Education, received 13 Aug 2026

Two of the five entries captured. Both carry attached media (dissertation pages, a recommendation
letter).

### Newcastle University
**MSc Advanced Computer Science**, Computer Science. Sep 2023 to Aug 2024.
**Grade: Distinction (71.6).**

Relevant modules: Engineering for AI (Big Data), Cloud Computing, Information Security and
Cryptography, System Security, Secure Software Development, Advanced Programming in Java.
Skills tagged: Azure Databricks, Information Security, +4.

Dissertation: LLM-driven identification of job intent, technologies and teams. PDF pages are attached
to the LinkedIn entry and the repo is `LLM-Driven-Identification-of-Job-Intent-Technologies-and-Teams`.

### Symbiosis Institute of Computer Studies and Research (SICSR)
**Bachelor of Computer Application (BCA)**, Computer Science. Jun 2020 to Jun 2023.
**Grade: 7.68/10 GPA.**

Activities: Vice President of the Student Council and Cultural Club, Orator's Club, CURSOR College
Magazine. A first-year lecturer's recommendation letter is attached, written to support the
postgraduate application.

**Three further education entries exist and are still uncaptured.**

## The timeline now resolves

| Period | Study | Work |
| --- | --- | --- |
| 2020 to 2023 | BCA at SICSR, Pune | Build My Site (Mar 2020 to Mar 2023), OceanFrogs, Poems India |
| Sep 2023 to Aug 2024 | MSc at Newcastle, Distinction | Hexis Lab (Apr to Jun 2024) |
| Jun 2024 to Mar 2026 | | Appsatile Software Group, founding software engineer (data) |
| Nov 2025 to Apr 2026 | | LabyNator founded, Treacle built (Jan to Mar 2026) |

Two years of professional work since the MSc, three founding titles inside them, and a shipped product
family alongside a full-time role.

**The coursework and the work line up, which is worth saying on the site.** Information Security and
Cryptography plus Secure Software Development explains the end-to-end encrypted chat app and the
AES-256 work in Treacle. Engineering for AI (Big Data) and Cloud Computing explains the Appsatile data
platform and the Kubernetes work. This is not a CV where the degree is decoration.

## One honesty note for the copy

He is roughly two years post-MSc. The current live site calls him a "Software Architect", which will
read as overclaiming to anyone who checks the dates, and the dates are right there on LinkedIn.
"Founding Software Engineer" is his actual title and is stronger precisely because it is verifiable.
The site should lead with what he has shipped and let the reader draw the seniority conclusion.

## Confirmed by Joel's recommendation

Employer is written as **Appsatile Ltd**, Solutions team, supporting applications including **CFP**.
Combined with the Companies House record for Appsatile Software Group Ltd, use "Appsatile" as the
display name on the site.

---

# OceanFrogs search results, 13 Aug 2026

Searched for the missing role. FinalScout, ZoomInfo and Datanyze all index it but all three
are blocked by the sandbox proxy, so everything below comes from search result content.

## Confirmed across multiple sources

- **Title: "Data Engineer & Web Developer"**, the wording used consistently in the people-data
  listings that index LinkedIn.
- **Trajectory:** started as a WordPress website developer, took on the data engineer role, built
  REST APIs. This comes from Vinay Mehendi's recommendation and matches the broker listings.
- **Duration: "over a year"**, from Srujan P's recommendation, which is also quoted on the current
  tusharlaad.com.
- **Work:** data pipelines, REST APIs, Docker, data scraping, data mining, data labeling, analytics
  and ML, SQL Server stored procedures, team training, documentation practices.

## Single-source and unverified

One search synthesis returned **"Data Engineer at OceanFrogs Pvt from 2022-2024"**, apparently from
the ZoomInfo employee directory. It appears once, in one result, and could not be checked against the
source. **Do not put this on the site as fact.**

The 2024 end looks wrong against everything else known. Recommendations cluster on 8 Sep, 20 Sep and
2 Nov 2023, which is the pattern of someone leaving, and the Newcastle MSc started Sep 2023 with a
move to the UK. A span of roughly mid-2022 to autumn 2023 fits "over a year", fits the recommendation
cluster, and fits the BCA at SICSR in Pune (Jun 2020 to Jun 2023). Broker records frequently carry
stale end dates.

**Needed from Tushar: the start month and end month.** Everything else for this entry is ready.

## Noise to ignore

The listings place him in **Milpitas, California**. That is OceanFrogs' US headquarters, which data
brokers stamp onto every employee record. He was in Pune.

## The real problem this surfaced

The role is **absent from his LinkedIn experience section** while three public recommendations on the
same profile point at it, one of them from a manager who says "over a year at OceanFrogs". A reader
who notices that sees either a gap or an inconsistency, and it is the sort of thing recruiters do
notice.

Fixing the LinkedIn entry matters more than the site entry, and the site entry is a one-line change to
`lib/content.ts` once the dates exist:

```ts
{
  org: "OceanFrogs",
  title: "Data Engineer and Web Developer",
  from: "<month> 2022",
  to: "<month> 2023",
  location: "Pune, India",
  kind: "engineering",
  summary: "Started on WordPress builds, moved onto the data team, ended up owning pipelines and APIs.",
  points: [
    "Built data pipelines and REST APIs, containerised with Docker.",
    "Worked across data scraping, mining, labeling and analytics feeding ML workflows.",
    "Ran training sessions for the team and set the documentation practices.",
  ],
}
```

---

# OceanFrogs and education, resolved from the LinkedIn export

The `laadtushar/portfolio-site` repo contains a `LinkedinExport/` directory with the full profile
export: `experience.html`, `education.html`, `project.html`, `Profile.csv` and the recommendations.
That answered everything outstanding. No more guessing from search snippets.

## OceanFrogs was two positions, 1 yr 7 mos total

### Data Engineer and Web Developer
Full-time. **Jul 2022 to Aug 2023 (1 yr 2 mos).** Pune, Maharashtra, India.

- Developed and maintained ETL data pipelines in Python with Selenium, Pandas and BeautifulSoup on
  EC2, for the business intelligence domain
- Implemented a machine learning keyword extraction engine using NLP that **increased tagging
  efficiency by 80%**
- Migrated technographics labeling from SQL to Python regex, a **400% reduction in processing time
  and a 50% increase in accuracy**
- Designed and deployed REST APIs using Docker, FastAPI and NGINX on EC2, a **60% increase in data
  enrichment**
- Instrumental in launching Team Maps Business Intelligence by setting up data pipelines
- Developed a priority order stored procedure for rearranging platform data, **increasing client
  interaction by 20%**
- Generated data visualisations and reports in Google Looker Studio and Data Studio
- Developed scripts for an inbound lead qualifier product, automating lead qualification
- Overhauled the website deployment process for an **80% reduction in deployment time**
- Delivered AppSmith applications for internal use, reducing developer dependency for data
  availability
- PHP and WordPress development, plus site speed optimisation through CDN and caching

### Data Engineer
Freelance. **Sep 2023 to Oct 2023 (2 mos).** Newcastle upon Tyne, remote.

- Owner for the Data Enrichment API product, built with FastAPI, NGINX, MSSQL and Docker, deployed on
  AWS EC2
- Maintaining ETL data pipelines behind business intelligence enrichment

**The detail worth keeping:** he moved to Newcastle for the MSc in September 2023 and OceanFrogs kept
him on freelance for two more months. Being retained across an emigration says more than a line of
self-description.

This also confirms the earlier inference and disproves the "2022 to 2024" figure that one search
result reported. Both positions are now in `lib/content.ts` as a single entry running Jul 2022 to
Oct 2023, with the six strongest points.

## Education, all five entries

| Institution | Award | Dates | Grade |
| --- | --- | --- | --- |
| Newcastle University | MSc Advanced Computer Science | Sep 2023 to Aug 2024 | Distinction, 71.6 |
| Symbiosis Institute of Computer Studies and Research | BCA Computer Science | Jun 2020 to Jun 2023 | 7.68/10 GPA |
| Vikhe Patil Memorial School | A Levels, Business/Commerce | Apr 2018 to Apr 2020 | 82.2% |
| Lokseva e School and Jr. College | High School | Apr 2016 to Apr 2018 | 82.4% |
| The Shishukunj International School, Indore | Junior School to 8th class | Apr 2005 to Apr 2016 | |

Also attached to the BCA entry: two academic letters of recommendation, from Dr. Anuja Bokhare and
Dr. Rajashree Jain.

**Only the top two go on the site.** School entries below A Level dilute a CV for someone holding a
Distinction MSc, and the junior school entry running to 2016 mainly advertises his age. They are
recorded here for completeness, not omitted by accident. The same argument applies to LinkedIn: the
Shishukunj entry is worth deleting there too.

## Skills recorded against the MSc

Azure Databricks, Information Security, Security System Design, PySpark, React.js, Firebase.

## Still outstanding

LabyNator does not appear in the export, which predates it. The truncated description ("an independent
software lab and parent...") is still unresolved, and it is now the only gap left.

---

# Full profile correction, from the live LinkedIn

Three things in every earlier revision were wrong. Corrected in `content.ts`.

## 1. DoorFeed was missing entirely, and it is the current job

**Data Engineer, DoorFeed. Apr 2026 to present. London, on-site, full-time.**
A property investment platform across the UK and France.

- Built the regulatory service answering what rent a property can legally charge, **empty repository to
  production in 27 days**. Serves **2,512 rent ceilings** across **57 French rent-control sectors** and
  two English schemes.
- Sourced the data where no clean feed existed: council mapping services, prefectural decrees, boundary
  sets. **348,842 rows from 11 sources**, with an evidence trail tracing every figure to its decree.
- Dated lookup across **34,746 communes** and **35,672 UK small areas**.
- Built the agent tool server: **105 tools across 11 domains** covering comparable search, valuation,
  deal ingestion, documents and policy. Plus the FastAPI chat service on Postgres handling streaming.
- Wrote the skills producing analyst output, including valuations applying French rent control and
  English social and affordable rent rules per unit.
- Document store from scratch: schema, API, versioning, presigned direct-to-S3 uploads, scanning for
  malicious files and prompt injection. Object-level authorization in Cerbos policy.
- ETL in Dagster and Polars over Parquet on S3 that quarantines bad rows. Freshness and provenance
  checks.
- Owns reliability for long-running agent runs: failure detection, automatic recovery, telemetry.

These are the strongest numbers on the entire CV and they were absent from the site.

## 2. Location is London, not Newcastle

Newcastle was where the MSc and Hexis Lab were. He has been in London since at least Mar 2024.

## 3. Treacle is not part of LabyNator

LabyNator is the parent for **four** products: MemryLab, XpenseLab, HyredLab and **edytlab, which is
live at edytlab.com** (earlier revisions had it as unprovisioned). Treacle is a **separate company**
where he was founding engineer. The site now renders them as two distinct blocks.

Full LabyNator description, previously truncated: "an independent software lab and parent company for
a growing suite of SaaS applications. Builds, ships, and operates multiple live products including
XpenseLab (personal finance), HyredLab (job tracking), MemryLab.com (Your Permanent Memory),
EdytLab.com (Agentic Audio Editing). Manages the full product lifecycle from ideation and development
to deployment and customer experience."

## 4. OceanFrogs corrected again

**Apr 2022 to Oct 2023, 1 yr 7 mos, Pune, remote, full-time.** One role, not two. The LinkedIn export
in the `portfolio-site` repo was an older snapshot; the live profile is authoritative.

One metric was wrong on the site: the NLP keyword extraction gave a **20 percent improvement in
enrichment rate**, not 80 percent tagging efficiency. Fixed.

The letter of recommendation attached to this role is from **Dr. Vinay Mehendiratta, CEO and founder**
of OceanFrogs.

## 5. New role found

**Full Stack Website Developer, Cantos Cautivos. Internship, Mar 2024 to Apr 2024. London, remote.**
PHP and full-stack. Added to the ledger tier.

## 6. He does write, contrary to the earlier answer

- Medium at **tusharlaad.medium.com**
- LinkedIn articles: "I Was the Kid the School Wanted to Get Rid Of" (1,496 impressions), "When AI
  Arrives at Work" (1,075), an AI ethics piece (1,001), a Meridian build writeup (1,319), a shipping
  velocity post (3,184)

The `/writing` route was stubbed on the strength of a "no" earlier in this project. That answer no
longer matches the evidence. **Recommendation: link Medium from the console now**, which is done, and
consider turning `/writing` on.

## 7. Availability flag turned off

He is five months into a full-time role. "Open to work" on a personal site while employed is a
contradiction a reader will notice, so `profile.available` is now `false`. Flip the one boolean in
`content.ts` if that is wrong.

## Headline, in his own words

"Data Engineer @ Doorfeed | Your Friendly Neighbourhood 0-to-1 Engineer". The 0-to-1 framing is the
best line on the profile and is now the site's headline.
