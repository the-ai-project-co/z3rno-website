import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GithubMark } from "@/components/GithubMark";
import { BASE_PATH, GITHUB_URL } from "@/lib/site";
import { sectionHeading, sectionLede, shell, ghostBtn } from "@/lib/styles";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const PILLARS = [
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

const TIERS = ["Working", "Episodic", "Semantic", "Procedural"];

// Real, verified call shapes from each binding's own shipped source
// (engine/src/engine.rs, bindings/python/src/lib.rs,
// bindings/typescript/src/lib.rs) — re-check against those files before
// editing, never restyle from memory.
const LANGS = [
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
const STATS = [
  { value: "77", label: "tests passing" },
  { value: "4", label: "memory tiers" },
  { value: "2", label: "storage backends" },
  { value: "2", label: "language bindings" },
];

const LADDER = [
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

const INSTALLS = [
  { label: "Python", cmd: "pip install z3rno" },
  { label: "TypeScript", cmd: "npm install @z3rno/sdk" },
  { label: "Rust", cmd: "cargo add z3rno-engine" },
  { label: "Server (GHCR)", cmd: "docker pull ghcr.io/the-ai-project-co/z3rno-server" },
];

const ROADMAP = [
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

export default function Home() {
  return (
    <>
      <SiteHeader homeAnchors />

      <main id="top">
        <section className="hero-glow relative overflow-hidden border-b border-border px-0 py-16 sm:py-24 lg:py-[136px] lg:pb-[104px]">
          <div className={`${shell} relative z-10 grid grid-cols-1 items-center gap-11 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
            <div>
              <span className="mb-5.5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs tracking-[0.06em] uppercase text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                pre&#8209;launch &middot; building in the open
              </span>
              <h1 className="mb-6 text-[clamp(3rem,7vw,5.75rem)] leading-[0.99] font-bold tracking-[-0.035em] text-balance">
                Persistent memory for AI agents,{" "}
                <em className="text-accent not-italic">compiled into your process</em>.
              </h1>
              <p className="mb-9 max-w-[50ch] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-text-dim">
                z3rno is an open-source Rust core with native Python and
                TypeScript bindings — no client, no server. Store, recall,
                forget, and audit are direct function calls, not API calls.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15.5px] font-semibold text-accent-text no-underline transition hover:-translate-y-px"
                >
                  <GithubMark />
                  View on GitHub
                </a>
                <a
                  href="#status"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-[15.5px] font-medium text-text no-underline transition hover:-translate-y-px hover:border-border-strong"
                >
                  Project status
                </a>
              </div>
              <p className="mt-5.5 text-[13px] text-text-dim">
                Apache-2.0 licensed. No packages published yet — see status
                below.
              </p>

              <div className="mt-11 flex flex-wrap gap-x-10 gap-y-7 border-t border-border pt-7">
                <SpecItem label="License" value="Apache-2.0" />
                <SpecItem label="Core" value="Rust" />
                <SpecItem label="Bindings" value="Python · TypeScript" />
                <SpecItem label="Required infra" value="None" />
              </div>
            </div>

            <Terminal />
          </div>
        </section>

        <section className="border-b border-border px-0 py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>
                Every framework re-invents agent memory
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-10">
              <div className="text-text-dim">
                <p>
                  Give an agent memory today and you&rsquo;re usually wiring
                  together a vector database, a cache layer, and hand-rolled
                  TTL logic — then doing it again in the next language your
                  team touches. Most of what calls itself a{" "}
                  <strong className="text-text">memory API</strong> is a
                  network hop to someone else&rsquo;s server before your agent
                  can even recall a fact.
                </p>
              </div>
              <div className="text-text-dim">
                <p>
                  z3rno starts from a different premise: memory should be a
                  library, not a service. The engine is a Rust core with
                  native bindings — no client, no server, no round trip,
                  unless you decide you want one.{" "}
                  <strong className="text-text">
                    store, recall, forget, and audit
                  </strong>{" "}
                  are function calls, not endpoints.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>How far you can take one engine</h2>
              <p className={sectionLede}>
                The same trait interface, three capability tiers. All three
                are real.
              </p>
            </div>

            <ol className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-[28px] border border-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {LADDER.map((l) => (
                <li
                  key={l.step}
                  className={`px-6.5 py-7.5 ${l.status === "shipped" ? "ladder-step-shipped" : ""}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="ladder-step-index font-mono text-[13px]">{l.step}</span>
                    <span
                      className={`ladder-step-tag rounded-full border border-border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.05em] ${
                        l.status === "shipped" ? "" : "text-warning"
                      }`}
                    >
                      {l.status === "shipped" ? "Shipped" : "Next"}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold tracking-[-0.01em]">{l.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-dim">{l.body}</p>
                  <p className="font-mono text-[12.5px] text-text-dim">
                    {l.status === "shipped" && <span className="text-accent">$ </span>}
                    {l.proof}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-border py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>How z3rno actually works</h2>
              <p className={sectionLede}>
                Four decisions we&rsquo;re not walking back, each with the
                mechanism that makes it true today, not a claim to take on
                faith.
              </p>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-border">
              {PILLARS.map((p, i) => (
                <div
                  className={`pillar-row grid grid-cols-1 gap-2.5 px-6.5 py-7 md:grid-cols-[200px_1fr] md:gap-8 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                  key={p.index}
                >
                  <h3 className="text-base font-semibold tracking-[-0.01em]">{p.title}</h3>
                  <div>
                    <p className="mb-3 max-w-[62ch] text-sm leading-relaxed text-text-dim">
                      {p.body}
                    </p>
                    <p className="pillar-proof font-mono text-[12.5px]">{p.proof}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3.5 rounded-[28px] border border-border px-6.5 py-5.5">
              <span className="font-mono text-xs tracking-[0.06em] text-text-dim uppercase">
                Memory tiers
              </span>
              {TIERS.map((t) => (
                <span
                  className="inline-flex items-center gap-2 text-sm text-text before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent before:content-['']"
                  key={t}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>One engine, called three ways</h2>
              <p className={sectionLede}>
                Same verb, same signature, same tenant/tier/embedding
                shape — a compiled call in every language, not a client
                wrapping an API.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {LANGS.map((l) => (
                <div
                  key={l.lang}
                  className="overflow-hidden rounded-[28px] border border-border bg-bg-subtle"
                >
                  <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <span className="text-[14px] font-semibold text-text">{l.lang}</span>
                    <span className="font-mono text-[12px] text-text-dim">{l.file}</span>
                  </div>
                  <pre className="overflow-x-auto px-6 py-6 font-mono text-[12.5px] leading-[1.75] text-text-dim">
                    {l.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>The architecture: what runs where</h2>
              <p className={sectionLede}>
                One core, called directly by default — a server only enters
                the picture once you ask for it.
              </p>
            </div>

            <div className="flex flex-col items-center gap-0">
              <DiagramNode
                title="z3rno-engine"
                meta="Rust core · store / recall / forget / audit"
                core
              />
              <div className="my-0.5 h-8 w-px bg-border-strong" />
              <div className="flex flex-wrap justify-center gap-4.5">
                <DiagramNode title="Python bindings" meta="PyO3 · in-process" />
                <DiagramNode title="TypeScript bindings" meta="napi-rs · in-process" />
                <DiagramNode title="Server (optional)" meta="Axum · production / multi-tenant" />
              </div>
              <div className="my-0.5 h-8 w-px bg-border-strong" />
              <DiagramNode
                title="Storage backend"
                meta="Embedded by default · Postgres + pgvector + AGE for production"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>Where this goes from here</h2>
            </div>

            <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-[28px] border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {ROADMAP.map((r) => (
                <div
                  key={r.phase}
                  className={`px-6.5 py-7.5 ${r.active ? "roadmap-step-active" : ""}`}
                >
                  <p className="mb-2.5 font-mono text-[11px] tracking-[0.07em] text-accent uppercase">
                    {r.phase}
                  </p>
                  <h3 className="mb-2 text-base font-semibold tracking-[-0.01em]">
                    {r.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-text-dim">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="status" className="border-b border-border bg-bg-subtle py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>This is genuinely early</h2>
            </div>

            <div className="grid grid-cols-1 items-center gap-7 rounded-[28px] border border-border bg-bg p-8 sm:p-10 md:grid-cols-[auto_1fr_auto] md:text-left">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-xs tracking-[0.05em] text-warning uppercase whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                pre&#8209;launch
              </span>
              <div className="space-y-2.5 text-[15px] text-text-dim [&_strong]:text-text">
                <p>
                  The core engine now runs against{" "}
                  <strong>two complete backends</strong> — store, recall,
                  forget, and a hash-chained audit log, working identically
                  against an embedded default (SQLite, in-process vector and
                  graph indexes) and Postgres + pgvector + Apache AGE for
                  production. Nothing is installable yet — no packages are
                  published on any registry.
                </p>
                <p className="max-w-[62ch]">
                  z3rno is a from-scratch rewrite of an earlier, more complex
                  version, driven by direct feedback that the architecture
                  needed to be simpler and embeddable by default.
                  We&rsquo;re building the new version in the open from here.
                </p>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={ghostBtn + " w-fit"}
              >
                Follow along on GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <section id="install" className="border-b border-border py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <h2 className={sectionHeading}>Installing z3rno — coming soon</h2>
              <p className={sectionLede}>
                Nothing is published yet. This is the target surface across
                every channel —{" "}
                <Link href="/docs/install" className="text-text underline">
                  full install docs
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {INSTALLS.map((i) => (
                <div
                  className="overflow-hidden rounded-2xl border border-border bg-bg-subtle"
                  key={i.label}
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
                    <span className="text-[13px] text-text-dim">{i.label}</span>
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10.5px] tracking-[0.05em] text-warning uppercase">
                      Coming soon
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-4 py-4.5 font-mono text-[13.5px] text-text-dim">
                    <span className="text-accent">$</span> {i.cmd}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="flex flex-col items-start gap-5 rounded-[28px] border border-border bg-bg-subtle p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="max-w-[52ch]">
                <h2 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-text">
                  z3rno Cloud, planned
                </h2>
                <p className="text-[14px] leading-relaxed text-text-dim">
                  A managed, hosted version of the production backend is the
                  intended path to sustaining this as an open-source project
                  — not built yet, and not the only way to run z3rno.
                  Embedding it directly or running your own server stays
                  fully supported either way.
                </p>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={ghostBtn + " w-fit shrink-0"}
              >
                Follow along on GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[11px] tracking-[0.07em] text-text-dim uppercase">
        {label}
      </span>
      <span className="text-[15px] font-semibold text-text">{value}</span>
    </div>
  );
}

function DiagramNode({
  title,
  meta,
  core,
}: {
  title: string;
  meta: string;
  core?: boolean;
}) {
  return (
    <div
      className={`min-w-[168px] rounded-2xl border border-border bg-bg-subtle px-5.5 py-4 text-center ${
        core ? "diagram-node-core" : ""
      }`}
    >
      <p className="mb-1 text-sm font-semibold text-text">{title}</p>
      <p className="font-mono text-[11.5px] text-text-dim">{meta}</p>
    </div>
  );
}

function Terminal() {
  return (
    <div className="terminal-card relative z-10 overflow-hidden rounded-[28px] border border-border bg-bg-subtle">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--error)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--warning)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--success)" }} />
        <span className="ml-2 font-mono text-xs text-text-dim">z3rno &middot; embedded</span>
      </div>
      <pre className="terminal-body px-5 pt-5.5 pb-6 font-mono text-[13px] leading-[1.8] break-words whitespace-pre-wrap">
        <code>
          <span className="prompt">$ </span>
          <span className="cmd">cargo add z3rno-engine</span>
          {"\n\n"}
          <span className="kw">use</span> z3rno_engine::
          <span className="type">MemoryEngine</span>;{"\n\n"}
          <span className="kw">let</span> engine ={" "}
          <span className="type">MemoryEngine</span>::
          <span className="fn">embedded</span>(
          <span className="str">&quot;z3rno.db&quot;</span>)?;{"\n\n"}
          engine.
          <span className="fn">store</span>(
          <span className="str">&quot;tenant-1&quot;</span>, Tier::Episodic,{"\n"}
          {"  "}
          <span className="str">
            &quot;user prefers dark roast coffee&quot;
          </span>
          .into(), embedding, metadata, links).await?;{"\n\n"}
          <span className="kw">let</span> hits = engine.
          <span className="fn">recall</span>(
          <span className="str">&quot;tenant-1&quot;</span>, embedding, 5).await?;
          {"\n\n"}
          engine.
          <span className="fn">forget</span>(
          <span className="str">&quot;tenant-1&quot;</span>, hits[0].id).await?;{" "}
          <span className="comment">
            {"// returns a proof of erasure"}
          </span>
          {"\n\n"}
          engine.advanced().
          <span className="fn">audit</span>(
          <span className="str">&quot;tenant-1&quot;</span>).await?;{" "}
          <span className="comment">
            {"// hash-chained, append-only"}
          </span>
        </code>
      </pre>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border px-5 py-4.5 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-mono text-[19px] font-semibold text-text tabular-nums">
              {s.value}
            </p>
            <p className="text-[11.5px] tracking-[0.02em] text-text-dim uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
