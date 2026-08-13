/**
 * Single source of truth for the whole site.
 *
 * This object is read by the homepage, the /cv route, the print stylesheet that
 * produces the PDF, and the JSON-LD Person block. Change a fact once here and
 * every surface moves together.
 *
 * Anything still unverified is marked with a `pending` flag rather than guessed.
 */

export type Status = "shipped" | "building" | "archived";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: Status;
  domain?: string;
  repo?: string;
  stack: string[];
  /** Optional screenshot at /public/shots/<file>. Cells upgrade when present. */
  image?: { src: string; alt: string };
  caseStudy?: {
    problem: string;
    approach: string;
    hard: string;
    outcome: string;
  };
  metrics?: { value: string; label: string }[];
}

export interface Role {
  org: string;
  title: string;
  from: string;
  to: string;
  location: string;
  kind: "founding" | "engineering" | "earlier";
  summary: string;
  points: string[];
  concurrent?: boolean;
}

export interface Study {
  org: string;
  award: string;
  from: string;
  to: string;
  grade?: string;
  detail?: string;
}

export interface Quote {
  body: string;
  name: string;
  role: string;
  date: string;
  relationship: string;
}

export const profile = {
  name: "Tushar Laad",
  /** Leads with the lab, then the day job. Both verifiable. */
  headline: "I run LabyNator, a small software lab.",
  subhead:
    "Four products shipped under it. Founding engineer on a multi-tenant data platform by day, mostly in Rust and TypeScript after hours.",
  location: "Newcastle upon Tyne, UK",
  available: true,
  availableLabel: "Open to work",
  email: "tusharlaad2002@gmail.com",
  domain: "tusharlaad.com",
  links: [
    { label: "GitHub", href: "https://github.com/laadtushar" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tusharlaad2002/" },
    { label: "LabyNator", href: "https://labynator.com" },
  ],
  /** Drives JSON-LD sameAs. Three people share this name on LinkedIn, so this matters. */
  sameAs: [
    "https://github.com/laadtushar",
    "https://www.linkedin.com/in/tusharlaad2002/",
    "https://labynator.com",
    "https://memrylab.com",
    "https://hyredlab.com",
    "https://xpenselab.com",
  ],
  now: {
    date: "August 2026",
    body:
      "Building edytlab, a conversational audio editor in Rust, currently on phase two. Shipping wayfinder to the Play Store.",
  },
};

/** Verifiable figures from the CV. No repo vanity counts. */
export const headlineMetrics = [
  { value: "7", label: "layer data platform architected" },
  { value: "5", label: "developers led" },
  { value: "4", label: "products shipped under the lab" },
];

export const stack = [
  "Rust",
  "TypeScript",
  "Python",
  "Go",
  "PySpark",
  "PostgreSQL",
  "Kubernetes",
  "Tauri",
  "Next.js",
  "Unity",
];

export const lab = {
  name: "LabyNator",
  domain: "labynator.com",
  blurb:
    "An independent software lab. Everything below carries the Lab suffix because it all comes out of the same workshop, one person, shipped end to end.",
};

export const products: Product[] = [
  {
    slug: "treacle",
    name: "Treacle",
    tagline: "An AI dating app with no swiping.",
    summary:
      "Voice profiling instead of forms. You talk, it listens, and it debriefs with you after dates to learn what actually worked. Architected and shipped alone across iOS and Android.",
    status: "shipped",
    domain: "mytreacle.com",
    stack: ["Next.js", "React Native", "ElevenLabs", "WebRTC", "Neo4j", "pgvector", "AWS"],
    metrics: [
      { value: "109", label: "API routes" },
      { value: "32", label: "matching dimensions" },
      { value: "1", label: "engineer" },
    ],
    caseStudy: {
      problem:
        "Dating apps ask you to describe yourself in a form, which is the one context where nobody is honest or interesting. The profile is the product, and the product is bad.",
      approach:
        "Replace the form with a conversation. An ElevenLabs voice stack, speech to text into a Claude LLM and back out through text to speech over WebRTC, builds the profile from how someone actually talks. Real-time prosody analysis captures voice reactivity signals into a Neo4j graph, and a 32-dimension model scores matches across values, communication and lifestyle.",
      hard:
        "Confidence. A model that infers personality from speech is wrong often enough that shipping its raw output would be irresponsible, so scoring runs on weekly Inngest jobs behind a confidence gate with an admin review workflow, and low-confidence inferences never reach a match.",
      outcome:
        "Live on iOS and Android. Next.js backend across 109 API routes, React Native on Expo, PostgreSQL with pgvector across six embedding tables, AES-256 on sensitive profile data, and a Sentry observability facade with 38 tests holding the boundary between backend and mobile.",
    },
  },
  {
    slug: "memrylab",
    name: "MemryLab",
    tagline: "A searchable timeline of how your thinking changed.",
    summary:
      "Point it at your journals, chat exports, notes and archives. It builds a visual timeline of how your beliefs and interests moved over years. Everything stays on the machine.",
    status: "shipped",
    domain: "memrylab.com",
    repo: "https://github.com/laadtushar/MemryLab",
    stack: ["Rust", "Tauri 2", "React 19", "SQLite FTS5", "D3", "Ollama"],
    metrics: [
      { value: "30+", label: "import formats" },
      { value: "4.3 MB", label: "installer" },
      { value: "0", label: "telemetry calls" },
    ],
    caseStudy: {
      problem:
        "Your record of how you used to think is scattered across a dozen exports in a dozen formats, and the only tools that would index it want to upload the lot to someone else's server.",
      approach:
        "A native desktop app under a strict hexagonal architecture, so the domain has no knowledge of which database, which LLM provider, or which UI is attached. Nine port interfaces, seven SQLite-backed stores, and more than thirty source adapters behind one detection layer.",
      hard:
        "Semantic search with no vector database. Cosine similarity runs inside SQLite alongside BM25 keyword search, and the two are fused with reciprocal rank fusion, which keeps the whole index in one file and the whole app under a five megabyte installer.",
      outcome:
        "Shipped with a Windows installer. Eight-stage analysis pipeline covering themes, sentiment, beliefs, entities, contradictions and narrative evolution, ten interactive views, and a RAG chat interface that cites its sources. Zero telemetry, zero cloud dependency, MIT licensed.",
    },
  },
  {
    slug: "edytlab",
    name: "edytlab",
    tagline: "Describe an audio edit in English. It renders.",
    summary:
      "Drop in stems and ask for the mashup you want. An agent plans the operations, the DSP runs locally in Rust, and stem separation and transcription happen on your own machine.",
    status: "building",
    repo: "https://github.com/laadtushar/edytlab",
    stack: ["Rust", "Tauri 2", "symphonia", "fundsp", "ONNX", "Demucs", "Whisper"],
    metrics: [
      { value: "237", label: "commits" },
      { value: "20", label: "editing tools exposed to the agent" },
    ],
    caseStudy: {
      problem:
        "Audio editing has a vocabulary problem. You can hear the edit you want long before you can find the six menu operations that produce it, and that gap is where most people give up.",
      approach:
        "A conversational layer over a modular Rust DSP engine. Around twenty editing operations are exposed as tools, an agent plans a sequence, and session state lives in a branchable DAG so any plan can be undone or compared against an alternative.",
      hard:
        "Keeping it local. Stem separation via Demucs and transcription via Whisper both run through ONNX Runtime on device, so the only thing that leaves the machine is the language model request. Decode, routing, effects, resampling and IO are all pure Rust.",
      outcome:
        "Phase one and two complete, single-track editing and mashups, with conversational mixing next. Branchable session graphs, A/B comparison and multi-provider model switching all working.",
    },
  },
  {
    slug: "hyredlab",
    name: "HyredLab",
    tagline: "A job tracker that reads your inbox for you.",
    summary:
      "Syncs with Gmail and turns the mess of application confirmations, rejections and recruiter threads into a tracked pipeline, without any manual entry.",
    status: "shipped",
    domain: "hyredlab.com",
    repo: "https://github.com/laadtushar/job-hunt-dashboard",
    stack: ["Next.js 16", "PostgreSQL", "Prisma", "Gemini 2.0 Flash", "NextAuth"],
    caseStudy: {
      problem:
        "Every job application generates four or five emails across weeks, from different addresses, in different formats, and none of them announce which application they belong to.",
      approach:
        "A multi-stage agent pipeline. An extraction agent structures each email with self-correction, then identity resolution merges fragmented signals into one application using semantic reasoning rather than string matching.",
      hard:
        "Hallucination. An extraction model confidently inventing a rejection is worse than no tracker at all, so a reflexion loop critiques each output against learned rules and corrects before anything is written.",
      outcome:
        "Live. Incremental Gmail sync, semantic threading, rejection reason extraction, and card, grid and kanban views over the same pipeline.",
    },
  },
  {
    slug: "xpenselab",
    name: "XpenseLab",
    tagline: "Personal finance that categorises itself.",
    summary:
      "Income, expenses, budgets, loans and EMIs, with AI categorisation and optional client-side encryption. The largest codebase in the lab.",
    status: "shipped",
    domain: "xpenselab.com",
    repo: "https://github.com/laadtushar/xpenselab",
    stack: ["Next.js 16", "Firebase", "Genkit", "Gemini", "Stripe"],
    metrics: [
      { value: "335", label: "commits" },
    ],
    caseStudy: {
      problem:
        "Budgeting tools either want your bank credentials or want you to type every transaction. Most people quit at the second week.",
      approach:
        "Import from CSV and XLSX, categorise with Genkit and Gemini, and keep the whole thing optional: client-side encryption with recovery codes for anyone who would rather the server never see a line item.",
      hard:
        "Shipping the boring parts. Recurring transactions, EMI schedules, group expense splitting, debt tracking, GDPR export and deletion, and Stripe subscriptions are each individually dull and collectively the difference between a demo and a product.",
      outcome:
        "Live, with a paid tier. Budget progress tracking, AI budget recommendations, and the full import and export path working in both directions.",
    },
  },
];

/** Not from the lab, and not a repo, but the deepest system on the CV. */
export const platformWork = {
  slug: "appsatile-platform",
  name: "The Appsatile platform",
  tagline: "A 7-layer multi-tenant data system at sub-millisecond latency.",
  stack: ["Go", "FastAPI", "PostgreSQL", "Kafka", "Kubernetes", "ChromaDB", "NATS"],
};

export const roles: Role[] = [
  {
    org: "LabyNator",
    title: "Founder",
    from: "Nov 2025",
    to: "Apr 2026",
    location: "UK, remote",
    kind: "founding",
    concurrent: true,
    summary: "An independent software lab and the parent for everything above.",
    points: [
      "Founded and run the lab that ships MemryLab, XpenseLab, HyredLab and edytlab.",
    ],
  },
  {
    org: "Treacle",
    title: "Founding Engineer",
    from: "Jan 2026",
    to: "Mar 2026",
    location: "London, hybrid",
    kind: "founding",
    concurrent: true,
    summary:
      "Architected and shipped an AI-native dating app on iOS and Android as the solo engineer.",
    points: [
      "Designed a 32-dimension matching algorithm across psychological domains, with weekly Inngest jobs, confidence-gated scoring and an admin review workflow.",
      "Built the ElevenLabs voice architecture, speech to text into an LLM and back through text to speech over WebRTC, with real-time prosody analysis feeding a Neo4j graph.",
      "Shipped a Next.js backend across 109 API routes, React Native on Expo SDK 55, PostgreSQL with pgvector over six embedding tables, Redis and AWS, with AES-256 on sensitive profile data.",
      "Built a Sentry observability facade across backend and mobile, enforced by ESLint rules and 38 tests, plus CI/CD through EAS builds and auto-deploy to AWS App Runner.",
    ],
  },
  {
    org: "Appsatile",
    title: "Founding Software Engineer",
    from: "Jun 2024",
    to: "Mar 2026",
    location: "Gateshead, on-site",
    kind: "founding",
    summary:
      "Architected the data platform and led the team building on it.",
    points: [
      "Architected a 7-layer composable data system with cross-app interoperability, type safety and versioning, and designed cell-based multi-tenancy using row-level security with dedicated cells for enterprise tenants.",
      "Reached sub-millisecond latency through 3-tier caching across Caffeine, Redis and PostgreSQL.",
      "Built a Go-based master data management platform with fuzzy matching and golden record merging, ingesting from PostgreSQL, NATS JetStream, Redis and MinIO.",
      "Recovered 165 properties and 8,395 expenses from corrupt legacy systems with safe replay, through a FastAPI and Next.js CMS on a dynamic JSONB entity framework.",
      "Built a RAG system on ChromaDB and Ollama with auto-indexing and semantic search, deployed as an MCP server, alongside governance covering classification, retention and field-level masking.",
      "Deployed production Kubernetes on AWS with Keycloak, Kafka, Prometheus and Grafana, automated through Helm and Kustomize.",
      "Led a 5-developer team and authored the 20-page platform specification with PlantUML diagrams and architecture decision records.",
    ],
  },
  {
    org: "Hexis Lab",
    title: "Data Scientist",
    from: "Apr 2024",
    to: "Jun 2024",
    location: "Newcastle upon Tyne",
    kind: "engineering",
    summary:
      "Brought generative AI into a cosmetic science platform.",
    points: [
      "Integrated GPT-4o and spaCy for ingredient analysis with sentiment scoring and trend forecasting across 30,000 European Commission regulatory data points.",
      "Prototyped a vision assistant for personalised skincare recommendations, deployed through FastAPI and Docker.",
      "Built interactive 3D molecular rendering in React and Three.js.",
    ],
  },
  {
    org: "Build My Site",
    title: "Founder",
    from: "Mar 2020",
    to: "Mar 2023",
    location: "India",
    kind: "earlier",
    summary: "A web development agency, run through university.",
    points: [
      "Delivered WordPress builds for more than 10 small business and startup clients, scoping through to deployment.",
      "Published a Flutter hybrid application to the Play Store.",
      "Held every client site above 90 on PageSpeed.",
    ],
  },
];

export const education: Study[] = [
  {
    org: "Newcastle University",
    award: "MSc Advanced Computer Science",
    from: "Sep 2023",
    to: "Aug 2024",
    grade: "Distinction",
    detail:
      "Information security and cryptography, secure software development, system security, engineering for AI, cloud computing. Dissertation on LLM-driven identification of job intent, technologies and teams.",
  },
  {
    org: "Symbiosis Institute of Computer Studies and Research",
    award: "BCA Computer Science",
    from: "Jun 2020",
    to: "Jun 2023",
    detail:
      "Vice President of the student council and cultural club. Orator's club, college magazine.",
  },
];

export const quotes: Quote[] = [
  {
    body:
      "We were faced with the complex challenge of implementing end-to-end encryption, particularly how to securely store and manage encryption keys. He devised an elegant solution that balanced security with usability: storing public keys on our servers while keeping private keys on users' local devices.",
    name: "Suleiman Muhammad Sabo",
    role: "Cybersecurity researcher",
    date: "Mar 2024",
    relationship: "Worked on the same team",
  },
  {
    body:
      "He not only delivered on assigned responsibilities but regularly went beyond expectations, investing additional time to understand underlying systems and improve solution quality.",
    name: "Joel Joseph Joy",
    role: "Azure and Databricks Engineer",
    date: "Mar 2026",
    relationship: "Managed Tushar directly at Appsatile",
  },
  {
    body:
      "Excellent skills at building data pipelines, REST APIs and Docker. A great team player who communicates effectively and shares knowledge generously.",
    name: "Srujan P",
    role: "Product and Engineering Manager",
    date: "Sep 2023",
    relationship: "Managed Tushar directly at OceanFrogs",
  },
];

export interface LedgerEntry {
  name: string;
  year: string;
  note: string;
  stack: string;
  href?: string;
  status: Status;
}

export const ledger: LedgerEntry[] = [
  {
    name: "wayfinder",
    year: "2026",
    note: "Guided space exploration for Samsung Galaxy XR, built on real Mars and Moon terrain. 72 fps on device.",
    stack: "Unity 6, OpenXR, C#",
    href: "https://github.com/laadtushar/wayfinder",
    status: "building",
  },
  {
    name: "samvriti.space",
    year: "2026",
    note: "A therapy practice site with intake forms and an admin dashboard, encrypted at rest. Client work.",
    stack: "Next.js, Vercel Blob",
    href: "https://samspace.vercel.app",
    status: "shipped",
  },
  {
    name: "rust-pair-teach",
    year: "2026",
    note: "A VS Code tutor for Rust that refuses to write your code and gives tiered hints instead.",
    stack: "TypeScript, VS Code API",
    href: "https://github.com/laadtushar/rust-pair-teach",
    status: "building",
  },
  {
    name: "end-to-end-encrypted-chat",
    year: "2024",
    note: "Asymmetric key management with private keys held on device. Written up as a paper on scalable chat encryption.",
    stack: "Vite, Firebase, WebCrypto",
    href: "https://github.com/laadtushar/end-to-end-encrypted-chat-app",
    status: "archived",
  },
  {
    name: "spark-streaming-job-market",
    year: "2026",
    note: "Lambda architecture over live job postings, hot path to Redis and cold path to Parquet.",
    stack: "PySpark, Kafka, Redis",
    href: "https://github.com/laadtushar/spark-streaming-job-market",
    status: "archived",
  },
  {
    name: "fact-check-pro",
    year: "2026",
    note: "A packaged agent skill for verifying claims against sources, with a report linter.",
    stack: "Markdown, Python",
    href: "https://github.com/laadtushar/fact-checker-AI-Skill",
    status: "shipped",
  },
];

/** Forks. Listed as contributions, never as authorship. */
export const contributions = [
  {
    name: "pluely",
    note: "Open source alternative to Cluely, a private AI assistant overlay.",
    upstream: "iamsrikanthnani/pluely",
    href: "https://github.com/laadtushar/pluely",
  },
  {
    name: "frappe_mcp_server",
    note: "An MCP server exposing Frappe document operations to agents.",
    upstream: "kiran-harbak/frappe_mcp_server",
    href: "https://github.com/laadtushar/frappe_mcp_server",
  },
];

export const publication = {
  title: "Advancing Chat Security: Asymmetric Encryption for Scalable Web Applications",
  note: "Written alongside the end-to-end encrypted chat project.",
};

export function productBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
