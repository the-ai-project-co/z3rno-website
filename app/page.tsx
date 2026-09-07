import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GithubMark } from "@/components/GithubMark";
import { BASE_PATH, GITHUB_URL } from "@/lib/site";
import { eyebrow, sectionHeading, sectionLede, shell, ghostBtn } from "@/lib/styles";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const PILLARS = [
  {
    index: "embed",
    title: "Embeddable by default",
    body: "No database to provision, no service to deploy. z3rno runs inside your process with zero required infrastructure — add the dependency and start calling store and recall.",
  },
  {
    index: "sdk",
    title: "Native bindings, not HTTP",
    body: "The Python and TypeScript SDKs aren't clients wrapping a REST API — they're native bindings to the same Rust core. The SDK is the engine, not a call to one.",
  },
  {
    index: "serve",
    title: "Pluggable production backend",
    body: "When you outgrow a single process, an optional Axum server handles production and multi-tenant deployments, backed by Postgres, pgvector, and Apache AGE.",
  },
  {
    index: "audit",
    title: "Auditable by design",
    body: "Every write is traceable. forget returns a proof of erasure, and audit queries an append-only, hash-chained history of what changed and when.",
  },
];

const TIERS = ["Working", "Episodic", "Semantic", "Procedural"];

const INSTALLS = [
  { label: "Python", cmd: "pip install z3rno" },
  { label: "TypeScript", cmd: "npm install @z3rno/sdk" },
  { label: "Rust", cmd: "cargo add z3rno-engine" },
];

const ROADMAP = [
  {
    phase: "Now",
    title: "Embedded core",
    body: "A working embedded engine — real store, recall, forget, and audit against SQLite, an embedded vector index, and an embedded graph — plus the Python/TypeScript binding scaffolds it all builds on.",
    active: true,
  },
  {
    phase: "Next",
    title: "Production backend & server",
    body: "The Postgres + pgvector + Apache AGE production backend, the Axum server, and the real four-verb API across both bindings.",
    active: false,
  },
  {
    phase: "Then",
    title: "v1.0 launch",
    body: "Simultaneous release across PyPI, npm, and crates.io, with the CLI, MCP server, and eval harness alongside it.",
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
              <h1 className="mb-6 text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.03] font-bold tracking-[-0.03em]">
                The memory engine your agents run{" "}
                <em className="text-accent not-italic">inside</em>, not around.
              </h1>
              <p className="mb-9 max-w-[50ch] text-[clamp(17px,1.6vw,19px)] leading-relaxed text-text-dim">
                z3rno is an open-source memory engine for AI agents — a Rust
                core with native Python and TypeScript bindings. Store,
                recall, forget, and audit memory without standing up a
                service first.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-[15.5px] font-semibold text-accent-text no-underline transition hover:-translate-y-px"
                >
                  <GithubMark />
                  View on GitHub
                </a>
                <a
                  href="#status"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-[15.5px] font-medium text-text no-underline transition hover:-translate-y-px hover:border-border-strong"
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
              <p className={eyebrow}>The problem</p>
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

        <section id="how-it-works" className="border-b border-border py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <p className={eyebrow}>How it works</p>
              <h2 className={sectionHeading}>Four ideas, one engine</h2>
              <p className={sectionLede}>
                z3rno is built around a small set of decisions we&rsquo;re not
                walking back.
              </p>
            </div>

            <div className="pillars-grid grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p) => (
                <div className="pillar-cell px-6 pt-7 pb-8" key={p.index}>
                  <p className="mb-4.5 font-mono text-xs text-text-dim">{p.index}</p>
                  <h3 className="mb-2.5 text-base font-semibold tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-dim">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3.5 rounded-xl border border-border px-6.5 py-5.5">
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
              <p className={eyebrow}>Architecture</p>
              <h2 className={sectionHeading}>What actually runs where</h2>
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
              <p className={eyebrow}>Roadmap</p>
              <h2 className={sectionHeading}>Where this goes from here</h2>
            </div>

            <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
              <p className={eyebrow}>Status</p>
              <h2 className={sectionHeading}>This is genuinely early</h2>
            </div>

            <div className="grid grid-cols-1 items-center gap-7 rounded-xl border border-border bg-bg p-8 sm:p-10 md:grid-cols-[auto_1fr_auto] md:text-left">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-xs tracking-[0.05em] text-warning uppercase whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                pre&#8209;launch
              </span>
              <div className="space-y-2.5 text-[15px] text-text-dim [&_strong]:text-text">
                <p>
                  The core engine now has a{" "}
                  <strong>
                    working embedded backend
                  </strong>{" "}
                  — store, recall, forget, and a hash-chained audit log, all
                  running against SQLite and in-process vector/graph
                  indexes. Nothing is installable yet — no packages are
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

        <section className="py-16 sm:py-22 lg:py-22">
          <div className={shell}>
            <div className="mb-12 max-w-[640px]">
              <p className={eyebrow}>Install</p>
              <h2 className={sectionHeading}>Coming soon</h2>
              <p className={sectionLede}>
                Nothing is published yet. This is the target surface across
                all three ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {INSTALLS.map((i) => (
                <div
                  className="overflow-hidden rounded-lg border border-border bg-bg-subtle"
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
      className={`min-w-[168px] rounded-lg border border-border bg-bg-subtle px-5.5 py-4 text-center ${
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
    <div className="terminal-card relative z-10 overflow-hidden rounded-2xl border border-border bg-bg-subtle">
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
          <span className="kw">use</span> z3rno::
          <span className="type">Engine</span>;{"\n\n"}
          <span className="kw">let</span> engine ={" "}
          <span className="type">Engine</span>::
          <span className="fn">embedded</span>()?;{"\n\n"}
          engine.
          <span className="fn">store</span>(
          <span className="type">Memory</span>::
          <span className="fn">new</span>(
          <span className="str">
            &quot;user prefers dark roast coffee&quot;
          </span>
          ))?;{"\n\n"}
          <span className="kw">let</span> hits = engine.
          <span className="fn">recall</span>(
          <span className="str">
            &quot;what does the user prefer?&quot;
          </span>
          )?;{"\n\n"}
          engine.
          <span className="fn">forget</span>(hits[0].id)?;{" "}
          <span className="comment">
            {"// returns a proof of erasure"}
          </span>
          {"\n\n"}
          <span className="kw">let</span> log = engine.
          <span className="fn">audit</span>(since)?;{" "}
          <span className="comment">
            {"// hash-chained, append-only"}
          </span>
        </code>
      </pre>
    </div>
  );
}
