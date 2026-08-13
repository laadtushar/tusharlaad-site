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
