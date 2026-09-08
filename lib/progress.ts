// The build-in-public log shown at /progress. One entry per slice (plus the
// occasional unplanned pass, like the design iteration below) — added as
// part of that slice's own website-update step, not backfilled after the
// fact. Newest first.

export type ProgressLink = { label: string; href: string };

export type ProgressEntry = {
  tag: string;
  title: string;
  date: string;
  summary: string;
  decisions?: string[];
  links: ProgressLink[];
  note?: string;
};

const Z = "https://github.com/the-ai-project-co/z3rno";
const ZW = "https://github.com/the-ai-project-co/z3rno-website";

export const PROGRESS_ENTRIES: ProgressEntry[] = [
  {
    tag: "0009",
    title: "Starter kit",
    date: "2026-09-08",
    summary:
      "z3rno-starter-kit (starter-kit/), an installable package with five worked examples over z3rno's real bindings surface: chat memory, customer support, a SQL copilot, code memory, and a research notebook. Every example is built against store/recall/forget/advanced.audit() only, with recall taking a raw embedding vector and no server-side filtering — a much narrower surface than the pre-rewrite starter kit's HTTP client had, so every example was redesigned around it rather than mechanically ported.",
    decisions: [
      "The plan doc's premise that ingest/distill/refine 'become real binding methods this time' doesn't hold for this codebase — its citation (decision-doc 0003) is from the old pre-rewrite stack and was never carried forward. Verified directly against bindings/python/src/lib.rs before writing any example, rather than trusting the plan doc's claim.",
      "customer_support replaces the old app-level user_id filter with one tenant per customer — real backend-enforced isolation instead of a predicate that has to be trusted to be applied correctly on every query.",
      "code_memory and research_notebook replace automatic code-graph/LLM extraction (which doesn't exist in the new engine at all) with hand-described symbols/notes linked via store()'s links parameter. Those links write real graph edges but aren't queryable through the bindings yet — a real gap surfaced while writing this slice, filed as z3rno#29 — so both examples fall back to content-similarity recall.",
      "research_notebook no longer needs OPENAI_API_KEY or server feature flags at all, unlike the old version — a genuine simplification matching z3rno's zero-required-infrastructure story, not a workaround.",
      "Since every example runs against a local embedded SQLite store, the smoke tests actually call each example's main() end to end rather than only import-gating it, a stronger regression gate than the old starter kit could offer (it needed a live server CI couldn't assume was up).",
    ],
    links: [
      { label: "z3rno #30", href: `${Z}/pull/30` },
      { label: "z3rno #28 (issue)", href: `${Z}/issues/28` },
      { label: "z3rno #29 (graph links gap)", href: `${Z}/issues/29` },
    ],
  },
  {
    tag: "0008",
    title: "MCP server + evals harness",
    date: "2026-09-08",
    summary:
      "A Python MCP server (mcp/, official mcp SDK's FastMCP over stdio) exposing store/recall/forget/audit as tools, calling into the same published z3rno bindings package like any other consumer — no special access. Alongside it, three independent eval harnesses (Rust, Python, TypeScript) score recall@k, MRR, faithfulness, and latency against a shared golden dataset (evals/fixtures/golden_v1.json) through each language's real client, using one canonical naive local hashing embedding (hash-embed/) reused directly by Rust and ported byte-for-byte to Python and TypeScript so results are comparable across languages.",
    decisions: [
      "Each harness measured its own baseline against this exact pipeline and set regression thresholds with headroom below it, rather than sharing one number across languages — the embedded backend's vector search is HNSW-based approximate nearest-neighbor, rebuilt per search from a HashMap's randomized iteration order, so exact scores vary slightly run-to-run even with fully deterministic embeddings (measured directly across 20 runs of the Python harness).",
      "The mcp PyPI package jumped from 1.x to 2.2.0 with a breaking rename (FastMCP → MCPServer) partway through this slice — pinned to mcp>=1.0.0,<2.0.0 deliberately, so a bare mcp>=1.0.0 dependency doesn't silently break the server against the API this design was actually written against.",
      "The old z3rno-mcp package was chronically one feature-slice behind the SDKs because it was built in parallel with them. Building it directly against the already-finished bindings this time removes the structural reason that lag existed.",
      "Both new CI workflows (ci-mcp.yml, ci-evals-python.yml) initially failed on GitHub Actions: maturin develop (unlike maturin build) requires an active virtualenv, which bare runners don't have by default. Fixed by adding an explicit venv-creation step before the maturin develop call in both.",
    ],
    links: [
      { label: "z3rno #25", href: `${Z}/pull/25` },
      { label: "z3rno #24 (issue)", href: `${Z}/issues/24` },
    ],
  },
  {
    tag: "0007",
    title: "CLI, crates.io, and release distribution",
    date: "2026-09-08",
    summary:
      "A real z3rno-cli binary (init/serve/store/recall/forget) usable standalone against a local embedded store — store/recall fall back to a naive local hashing embedding (feature-hashing, clearly documented as a placeholder, not a semantic model) so the CLI works with zero external services out of the box. Four real distribution pipelines built: crates.io (z3rno-engine/z3rno-server/z3rno-cli, dependency-ordered, per-crate SBOMs), npm (npx z3rno via a thin wrapper + per-platform optionalDependencies), a multi-arch GHCR server image (122MB, SLSA build provenance + SBOM), and --provenance on every new npm publish step. No publish credentials configured yet — this is pipeline-readiness work, same as slice 0006.",
    decisions: [
      "The naive local hashing embedding (128-dim feature-hashing / bag-of-words, L2-normalized) is a deliberate zero-dependency default for store/recall, not a shortcut nobody was told about — the CLI's own README states plainly that it has no notion of synonyms or meaning, and that real usage should supply real embeddings via --embedding or the SDKs.",
      "z3rno serve generates a random per-run JWT secret when --jwt-secret is omitted, printing a loud warning that sessions won't survive a restart — a local/dev convenience the standalone z3rno-server binary deliberately does not offer, since it still refuses to start without one explicitly.",
      "Building store/recall surfaced that the embedded vector backend never persists to SQLite — only the memory record does — so recall silently returns nothing across separate CLI process invocations. Filed as z3rno#21, the same class of gap as the already-tracked embedded graph backend (z3rno#8, whose own text incorrectly claimed the vector backend already persisted — corrected there too). Documented as a known limitation rather than silently shipped.",
      "While making z3rno-server crates.io-publishable for the first time, found and removed several leftover doc-comment references to the private reference codebase's own name, left over unnoticed since slice 0005 — a real violation of this project's standing never-mention rule for shipped product surfaces.",
      "A completeness check against the reference codebase's own CLI (which treats forget as a first-class verb) surfaced that the CLI shipped store/recall but not forget, despite forget being one of z3rno-engine's three headline verbs and already implemented and tested — added in a same-day follow-up (z3rno#23).",
    ],
    links: [
      { label: "z3rno #22", href: `${Z}/pull/22` },
      { label: "z3rno #20 (issue)", href: `${Z}/issues/20` },
      { label: "z3rno #23 (forget follow-up)", href: `${Z}/pull/23` },
      { label: "z3rno #21 (vector persistence gap)", href: `${Z}/issues/21` },
    ],
  },
  {
    tag: "0006",
    title: "Language bindings (Python + TypeScript)",
    date: "2026-09-07",
    summary:
      "Real z3rno (PyO3) and @z3rno/sdk (napi-rs) packages over z3rno-engine directly — no server/HTTP dependency, embedded SQLite by default, a postgres backend opt-in. store/recall/forget top-level, client.advanced.audit(...) for the audit trail. A real multi-platform release pipeline builds maturin wheels and napi-rs addons across Linux/macOS/Windows (x86_64/ARM64) and publishes to PyPI and npm on a tagged release.",
    decisions: [
      "Python ships a sync-only API (a shared Tokio runtime driven internally via block_on, released with allow_threads so it doesn't hold the GIL) — PyO3's async story is less mature, and the acceptance bar is a zero-ceremony `python -c \"import z3rno; ...\"`. TypeScript ships an async-only API (native Promises via napi-rs's tokio_rt feature) — blocking Node's single-threaded event loop would be a real anti-pattern. No sync/async duality in either language, unlike the old SDK's Client/AsyncClient split.",
      "No .admin/.conversations namespaces, despite the original plan doc naming them: the Rust engine has no admin/budgets or conversations/sessions concept at all — those are server-only HTTP concerns (slice 0005), not engine-embedded ones. Built client.advanced.audit(...) only, the one advanced operation that actually exists.",
      "Two independent engineers built the Python and TypeScript bindings in parallel against the same written API contract, entirely within their own bindings/python and bindings/typescript directories — zero file overlap, so no shared-file collision risk at all this time, not just avoided by discipline.",
      "The release pipeline's multi-platform build matrix follows standard maturin-action/napi-rs conventions but hasn't been exercised against a real tag push yet — PyPI's trusted-publisher and npm's provenance trust relationships need configuring for this org first, a one-time step outside CI's control.",
    ],
    links: [
      { label: "z3rno #19", href: `${Z}/pull/19` },
      { label: "z3rno #18 (issue)", href: `${Z}/issues/18` },
    ],
  },
  {
    tag: "0005",
    title: "Server component",
    date: "2026-09-07",
    summary:
      "The z3rno-server crate: an Axum HTTP API in front of the engine, for shared, production, and multi-tenant deployments. Routes mirroring the old API's shape, JWT + API-key auth behind a frozen extractor contract, superadmin cross-tenant budget admin, and real two-tier health checks + Prometheus metrics + an opt-in OpenTelemetry bridge. 63 tests total, all passing under every feature combination.",
    decisions: [
      "Closes a real gap: the old Python server's /v1/ready unconditionally reported every component healthy with no check ever run. The new /v1/health and /v1/health/detailed run genuine probes against the live engine and cache backends, each isolated in its own timeout so a hang can't take the handler down.",
      "The shared/structural files (Cargo.toml, the router, the error type, the cache trait, the auth contract) were built directly first and verified compiling, then three engineers implemented routes/auth/observability against strictly non-overlapping files in parallel — avoiding the shared-file collision slice 0004 hit when two engineers both touched the same file.",
      "No async job queue: nothing in this slice does long-running async work, so tokio::spawn (already the pattern for health-check isolation) covers it. Revisit only if a future pipeline proves a real need.",
      "Admin/budgets stores overrides in the cache backend rather than a tenants table — this crate has no tenant registry, matching the old system's own reasoning for the same cross-tenant design ('no engine change and no privileged database role required').",
    ],
    links: [
      { label: "z3rno #17", href: `${Z}/pull/17` },
      { label: "z3rno #16 (issue)", href: `${Z}/issues/16` },
    ],
  },
  {
    tag: "0004",
    title: "Production backend (Postgres + pgvector + AGE)",
    date: "2026-09-07",
    summary:
      "PostgresEngineBackend/PostgresVectorBackend/PostgresGraphBackend implement the same traits the embedded backend does, so MemoryEngine::postgres(database_url) drops in next to MemoryEngine::embedded() with no other code caring which is active. Auto-provisions its own extensions against any stock Postgres — no bespoke image. 41 tests total, all passing against a real live instance.",
    decisions: [
      "Resolves the isolation gap slice 0002's decision doc flagged: AGE's graph tables aren't covered by Postgres RLS, so each tenant gets its own AGE graph — its own Postgres schema — instead of one shared graph filtered by a property. Structural isolation, not the filter-discipline pattern that got Neo4j+Qdrant ruled out in slice 0002.",
      "Compatibility enforcement done by making an unsupported backend combo unconstructable through the public API at all, not a runtime check — the engine's own constructor is private; embedded() and postgres() are the only ways in from outside the crate.",
      "Real bugs found and fixed against the live instance, not just the intended design work: relying on RLS alone (without an explicit WHERE tenant_id filter) let a superuser connection read cross-tenant data; LOAD 'age' turned out to require Postgres superuser, which would have broken every real non-superuser deployment; an unqualified CREATE TABLE landed in the wrong Postgres schema; a DROP-then-CREATE trigger pattern opened a real race letting a concurrent write slip past the audit-immutability guarantee.",
    ],
    links: [
      { label: "z3rno #12", href: `${Z}/pull/12` },
      { label: "z3rno #11 (issue)", href: `${Z}/issues/11` },
    ],
  },
  {
    tag: "0003",
    title: "Core engine + embedded backend",
    date: "2026-09-07",
    summary:
      "The zero-infra default is now real, not scaffolding: a MemoryEngine with store/recall/forget plus an append-only, hash-chained audit log, running against SQLite, an embedded vector index, and an embedded graph. 19 tests, including a full store → recall → forget cycle covering all four memory tiers (working, episodic, semantic, procedural).",
    decisions: [
      "Temporal/SCD-2 versioning stays a production-backend concern, not the embedded default — the hash-chained audit log is the actual “what changed and when” guarantee, matching what's already promised on this site.",
      "hnsw_rs picked over instant-distance for the vector index: it supports incremental insert, the latter is build-once with no documented delete.",
      "petgraph's StableDiGraph for the embedded graph — plain Graph silently invalidates other stored node indices on removal, StableGraph doesn't.",
      "Known gap, filed rather than shipped silently: the embedded graph has no persistence across a process restart.",
    ],
    links: [
      { label: "z3rno #9", href: `${Z}/pull/9` },
      { label: "z3rno #8 (gap)", href: `${Z}/issues/8` },
      { label: "z3rno-website #8", href: `${ZW}/pull/8` },
    ],
  },
  {
    tag: "0002",
    title: "Production backend evaluation spike",
    date: "2026-09-07",
    summary:
      "A six-criterion rubric was written before any candidate was touched. Three production-backend candidates got real, working Rust proof-of-concepts against live Docker instances — Postgres+pgvector+Apache AGE, SurrealDB, and Neo4j+Qdrant — each store-one/recall-one/traverse-one, each with an actual attempt to breach multi-tenant isolation rather than assume it holds.",
    decisions: [
      "Neo4j+Qdrant ruled out on evidence: Neo4j Community can't run multiple databases (Enterprise-only), and a search that simply omitted the tenant filter on Qdrant returned another tenant's data.",
      "SurrealDB passed isolation as cleanly as Postgres RLS, but its license (Business Source License, converts to Apache-2.0 after a delay) left an open question Postgres didn't need answered.",
      "cognee's own Rust rewrite doesn't actually use Neo4j or Qdrant at all — corrected before scoring, since “diversity like cognee” was this spike's original motivation.",
      "Decision: Postgres + pgvector + Apache AGE is what slice 0004 builds against.",
    ],
    links: [
      { label: "z3rno #5", href: `${Z}/pull/5` },
      { label: "z3rno-website #6", href: `${ZW}/pull/6` },
    ],
  },
  {
    tag: "design",
    title: "Website design pass",
    date: "2026-09-07",
    summary:
      "Direct feedback that the first landing page “looked like slop” led to a real pass: bigger hero type scale, ambient depth, an actual architecture diagram and roadmap section. A screenshot then caught a real bug — terminal code text clipping past the card edge — fixed the same day. The stylesheet was later migrated from plain CSS to Tailwind CSS v4.",
    decisions: [
      "Kept the existing CSS custom-property token system, sourced from z3rno-brand-assets, as the single source of truth — mapped into Tailwind's generated utilities rather than inventing a second palette.",
    ],
    links: [
      { label: "z3rno-website #3", href: `${ZW}/pull/3` },
      { label: "z3rno-website #4", href: `${ZW}/pull/4` },
      { label: "z3rno-website #5", href: `${ZW}/pull/5` },
    ],
    note: "Not a numbered slice — an unplanned pass driven directly by user feedback.",
  },
  {
    tag: "0001",
    title: "Monorepo bootstrap",
    date: "2026-09-07",
    summary:
      "The Cargo workspace (engine/server/cli), Python (PyO3) and TypeScript (napi-rs) binding scaffolds, and a CI skeleton landed in one PR. The website launched alongside it — first landing page, brand assets wired in, GitHub Pages deploy pipeline.",
    decisions: [
      "Branch protection with named CI status checks was set up before the first PR, so every slice since has used GitHub's native auto-merge — no manual merge step.",
      "napi-rs auto-generates index.js/index.d.ts glue files — real committed JavaScript, not a hand-authored SDK (that's a later slice) — marked linguist-generated so it stopped skewing the repo's reported language mix.",
    ],
    links: [
      { label: "z3rno #2", href: `${Z}/pull/2` },
      { label: "z3rno #3", href: `${Z}/pull/3` },
      { label: "z3rno-website #2", href: `${ZW}/pull/2` },
    ],
  },
  {
    tag: "0000",
    title: "Deprecate the old six-repo stack",
    date: "2026-09-07",
    summary:
      "The previous z3rno stack shipped as six separately-published Python repos, hard-wired to a single Postgres deployment. Deprecated across PyPI, npm, and GHCR. All thirteen old repos archived on GitHub except z3rno-brand-assets, which stays active as the ongoing source of brand truth.",
    decisions: [
      "PyPI has no metadata-only deprecate flag — required an actual version bump just to update the published description; npm's own npm deprecate handled that in place.",
    ],
    links: [],
    note: "No PRs to link — this happened to the old repos before this monorepo existed.",
  },
];
