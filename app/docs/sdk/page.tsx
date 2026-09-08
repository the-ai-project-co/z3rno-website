import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DocsPageHeader } from "@/components/DocsPageHeader";
import { CodeBlock } from "@/components/CodeBlock";
import { shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "SDK / Bindings — z3rno docs",
  description: "Python and TypeScript Client usage, error semantics, and the Postgres backend opt-in.",
  alternates: { canonical: "/docs/sdk" },
};

const PYTHON_USAGE = `import z3rno

# Embedded default — opens/creates "z3rno.db" in the cwd, no external services.
client = z3rno.Client()

memory = client.store(
    tenant_id="t1",
    tier="episodic",  # "working" | "episodic" | "semantic" | "procedural"
    content="hello",
    embedding=[0.1, 0.2],   # optional — omit if unsearchable by similarity
    metadata={"k": "v"},    # optional, defaults to {}
    links=[],                # optional [(target_id, relationship), ...]
)
# memory is a dict: id/tenant_id/tier/content/metadata/created_at

memories = client.recall(tenant_id="t1", query=[0.1, 0.2], k=5)

proof = client.forget(tenant_id="t1", id=memory["id"])
# None if already gone, else a dict with audit_event_id/hash`;

const TS_USAGE = `import { Client } from "@z3rno/sdk";

// Embedded backend (default): opens/creates "z3rno.db" in the cwd.
const client = await Client.connect();

const memory = await client.store({
  tenantId: "t1",
  tier: "episodic", // "working" | "episodic" | "semantic" | "procedural"
  content: "hello",
  embedding: [0.1, 0.2, 0.3], // optional
  metadata: { source: "chat" },
  links: [], // optional graph edges: { targetId, relationship }[]
});

const memories = await client.recall({ tenantId: "t1", query: [0.1, 0.2, 0.3], k: 5 });

const proof = await client.forget({ tenantId: "t1", id: memory.id });
// proof is { auditEventId, hash }, or null if there was nothing to forget`;

const PYTHON_AUDIT = `events = client.advanced.audit(tenant_id="t1")
# list of dicts: id/tenant_id/operation/memory_id/at/prev_hash/hash`;

const TS_AUDIT = `const events = await client.advanced.audit("t1");
// each event: { id, tenantId, operation, memoryId, at, prevHash, hash }`;

const PYTHON_POSTGRES = `client = z3rno.Client(
    backend="postgres",
    connection_string="postgres://user:pass@host/db",
)`;

const TS_POSTGRES = `const client = await Client.connect({
  backend: "postgres",
  connectionString: "postgres://user:pass@host:5432/z3rno",
});`;

export default function SdkDocs() {
  return (
    <>
      <SiteHeader />

      <main>
        <DocsPageHeader
          title="SDK / Bindings"
          lede="Python (PyO3) and TypeScript (napi-rs) — native compiled bindings over z3rno-engine, not thin HTTP clients. The SDK is the engine. Python is sync-only (one shared Tokio runtime under the hood); TypeScript is async-only (every I/O call returns a Promise)."
        />

        <section className="py-10">
          <div className={shell}>
            <h2 className="mb-4 text-lg font-semibold text-text">Usage</h2>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <CodeBlock label="Python — z3rno" code={PYTHON_USAGE} />
              <CodeBlock label="TypeScript — @z3rno/sdk" code={TS_USAGE} />
            </div>

            <h2 className="mt-12 mb-2 text-lg font-semibold text-text">
              Advanced: audit
            </h2>
            <p className="mb-4 max-w-[62ch] text-[13.5px] text-text-dim">
              The one operation kept off the top-level store/recall/forget
              surface — the tenant&rsquo;s full append-only, hash-chained
              audit log, oldest first.
            </p>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <CodeBlock label="Python" code={PYTHON_AUDIT} />
              <CodeBlock label="TypeScript" code={TS_AUDIT} />
            </div>

            <h2 className="mt-12 mb-2 text-lg font-semibold text-text">
              Production backend
            </h2>
            <p className="mb-4 max-w-[62ch] text-[13.5px] text-text-dim">
              The embedded backend (SQLite + in-process vector and graph
              indexes) is the zero-infra default. For a multi-tenant
              deployment, connect to Postgres + pgvector + Apache AGE
              instead.
            </p>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <CodeBlock label="Python" code={PYTHON_POSTGRES} />
              <CodeBlock label="TypeScript" code={TS_POSTGRES} />
            </div>

            <h2 className="mt-12 mb-2 text-lg font-semibold text-text">
              Errors
            </h2>
            <p className="max-w-[62ch] text-[13.5px] text-text-dim">
              Python: a <code>store</code>/<code>forget</code> call against a
              nonexistent record raises <code>LookupError</code>; a
              storage-layer failure raises <code>RuntimeError</code>; an
              invalid <code>tier</code>, <code>backend</code>, or memory id
              string raises <code>ValueError</code> — all carrying the
              original error detail from the engine.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
