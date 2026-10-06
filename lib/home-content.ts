/** Product claims and examples stay together for each content update. */
export const PILLARS = [
  {
    index: "embed",
    title: "Embeddable by default",
    body: "No database to provision, no service to deploy. z3rno runs inside your process with zero required infrastructure — add the dependency and start calling store and recall.",
    proof: "MemoryEngine::embedded(sqlite_path) — SQLite + in-process vector and graph indexes, no network call",
  },
  {
    index: "sdk",
    title: "Native bindings, not HTTP",
    body: "The Python and TypeScript SDKs aren't clients wrapping a REST API — they're native bindings to the same Rust core. The SDK is the engine, not a call to one.",
    proof: "PyO3 (z3rno) and napi-rs (z3rno-sdk-native) compile the engine directly into your process",
  },
  {
    index: "serve",
    title: "Pluggable production backend",
    body: "When you outgrow a single process, swap in Postgres, pgvector, and Apache AGE against the same trait interface — no code changes upstream.",
    proof: "MemoryEngine::postgres(database_url) — same store/recall/forget/audit, a different backend",
  },
  {
    index: "audit",
    title: "Auditable by design",
    body: "Every write is traceable. forget returns a proof of erasure, and audit queries an append-only, hash-chained history of what changed and when.",
    proof: "Postgres tier: a DB-level trigger rejects UPDATE/DELETE on audit rows outright",
  },
];

export const TIERS = ["Working", "Episodic", "Semantic", "Procedural"];

// Real, verified call shapes from each binding's own shipped source
// (engine/src/engine.rs, bindings/python/src/lib.rs,
// bindings/typescript/src/lib.rs) — re-check against those files before
// editing, never restyle from memory.
export const LANGS = [
  {
    lang: "Rust",
    file: "engine",
    code: `let engine =
    MemoryEngine::embedded(
        "z3rno.db",
    )?;

engine
    .store(
        "tenant-1",
        Tier::Episodic,
        content,
        embedding,
        metadata,
        links,
    )
    .await?;`,
  },
  {
    lang: "Python",
    file: "z3rno",
    code: `client = z3rno.Client()

client.store(
    tenant_id=
        "tenant-1",
    tier="episodic",
    content=content,
    embedding=
        embedding,
    metadata=metadata,
    links=links,
)`,
  },
  {
    lang: "TypeScript",
    file: "@z3rno/sdk",
    code: `const client =
    await Client.connect();

await client.store({
  tenantId: "tenant-1",
  tier: "episodic",
  content,
  embedding,
  metadata,
  links,
});`,
  },
];

// Real, currently-true engineering facts — re-verify against `cargo test
// --workspace` (+ bindings/python, bindings/typescript) before bumping.
// No usage/adoption metrics belong here: z3rno is pre-launch with no
// traffic to report, so this strip stays scoped to what's actually true
// of the code today, never a stand-in for real usage numbers it doesn't have.
export const STATS = [
  { value: "77", label: "tests passing" },
  { value: "4", label: "memory tiers" },
  { value: "2", label: "storage backends" },
  { value: "2", label: "language bindings" },
];

export const LADDER = [
  {
    step: "01",
    title: "Embed it",
    body: "Add the dependency, call MemoryEngine::embedded(). No provisioning, no service to run.",
    proof: "cargo add z3rno-engine",
    status: "shipped" as const,
  },
  {
    step: "02",
    title: "Go to production",
    body: "Swap in Postgres, pgvector, and Apache AGE when you need durability and multi-tenant isolation — RLS-enforced, one AGE graph per tenant. Same trait, same four verbs.",
    proof: "MemoryEngine::postgres(database_url)",
    status: "shipped" as const,
  },
  {
    step: "03",
    title: "Put it on the network",
    body: "An Axum server exposes the same engine over HTTP — JWT + API-key auth, cross-tenant budget admin, health checks, and metrics — for multi-language or multi-tenant deployments.",
    proof: "z3rno-server — the same four verbs, over HTTP",
    status: "shipped" as const,
  },
];

export const INSTALLS = [
  { label: "Python", cmd: "pip install z3rno" },
  { label: "TypeScript", cmd: "npm install @z3rno/sdk" },
  { label: "Rust", cmd: "cargo add z3rno-engine" },
  { label: "Server (GHCR)", cmd: "docker pull ghcr.io/the-ai-project-co/z3rno-server" },
];

export const ROADMAP = [
  {
    phase: "Now",
    title: "Engine, server, bindings, CLI, MCP server, eval harnesses, and a starter kit",
    body: "A working engine — store, recall, forget, and audit — against two backends behind the same trait interface (embedded SQLite by default, Postgres + pgvector + Apache AGE for production), an Axum HTTP server for multi-tenant deployments, real Python and TypeScript bindings, a standalone z3rno-cli binary, a Python MCP server exposing the same four verbs as tools, three independent eval harnesses (Rust, Python, TypeScript) scoring recall@k/MRR/faithfulness/latency against one shared golden dataset, and an installable z3rno-starter-kit package with five worked examples over the real bindings. Real publish pipelines exist for crates.io, npm, and a multi-arch GHCR server image, with SBOMs and build provenance — but no publish credentials are configured yet, so nothing is live on a registry. Everything above runs from source today.",
    active: true,
  },
  {
    phase: "Next",
    title: "New website + docs site, and a graph visualizer",
    body: "A new marketing + docs site replacing this one and the old Mintlify docs, covering install instructions for every publish channel, plus an in-monorepo frontend/ Next.js app — a graph/memory visualizer, the direct successor to the old product's /graph page, shipped as part of the product itself this time instead of bolted onto the marketing site.",
    active: false,
  },
  {
    phase: "Then",
    title: "v1.0 launch",
    body: "A simultaneous release across PyPI, npm, and crates.io, with the CLI, MCP server, eval harnesses, and starter kit alongside it, and the new site and graph visualizer live to receive it.",
    active: false,
  },
];
