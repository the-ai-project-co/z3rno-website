import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DocsPageHeader } from "@/components/DocsPageHeader";
import { CodeBlock } from "@/components/CodeBlock";
import { shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "MCP Setup — z3rno docs",
  description: "Claude Desktop / Cursor config for the z3rno MCP server, its four tools, and local dev setup.",
  alternates: { canonical: "/docs/mcp" },
};

const TOOLS = [
  {
    sig: "z3rno_store(content, tier=\"semantic\", tenant_id=None, metadata=None, embedding=None) -> str",
    body: "Stores a memory. tier must be one of working/episodic/semantic/procedural. Returns the new memory's id.",
  },
  {
    sig: "z3rno_recall(query, tenant_id=None, k=5, embedding=None) -> list[dict]",
    body: "Searches for up to k memories most similar to query. Returns {id, tier, content, created_at} dicts.",
  },
  {
    sig: "z3rno_forget(id, tenant_id=None) -> str",
    body: "Erases a memory by id. Returns a confirmation naming the audit event id/hash, or a plain \"no memory found\" message — not an error.",
  },
  {
    sig: "z3rno_audit(tenant_id=None) -> list[dict]",
    body: "Returns the tenant's full audit log, oldest first — {operation, memory_id, at, hash} dicts.",
  },
];

const ENV_VARS = [
  { name: "Z3RNO_SQLITE_PATH", def: "z3rno.db", meaning: "Path to the embedded SQLite file." },
  { name: "Z3RNO_TENANT_ID", def: "local", meaning: "Default tenant used when a tool call omits tenant_id." },
  { name: "Z3RNO_DATABASE_URL", def: "(unset)", meaning: "If set, use the Postgres backend instead of embedded SQLite." },
];

const CONFIG_PUBLISHED = `{"mcpServers": {"z3rno": {"command": "z3rno-mcp", "args": [], "env": {"Z3RNO_SQLITE_PATH": "/absolute/path/to/z3rno.db"}}}}`;

const CONFIG_LOCAL = `{"mcpServers": {"z3rno": {"command": "python", "args": ["-m", "z3rno_mcp.server"], "env": {"Z3RNO_SQLITE_PATH": "/absolute/path/to/z3rno.db"}}}}`;

export default function McpDocs() {
  return (
    <>
      <SiteHeader />

      <main>
        <DocsPageHeader
          title="MCP Setup"
          lede="An MCP server that gives Claude Desktop, Cursor, Claude Code, or any other MCP client persistent memory backed by z3rno's Rust engine — the four operations exposed as tools."
        />

        <section className="py-10">
          <div className={shell}>
            <h2 className="mb-4 text-lg font-semibold text-text">
              Client config
            </h2>
            <p className="mb-4 max-w-[62ch] text-[13.5px] text-text-dim">
              Not yet published to PyPI. Once it is, this is the config:
            </p>
            <CodeBlock label="Once published — pip install z3rno-mcp" code={CONFIG_PUBLISHED} />
            <p className="mt-6 mb-4 max-w-[62ch] text-[13.5px] text-text-dim">
              For now, use the local dev path — run from inside an
              activated venv with the package installed, or point{" "}
              <code>command</code> at the absolute path to the installed
              console script.
            </p>
            <CodeBlock label="Current — local dev" code={CONFIG_LOCAL} />

            <h2 className="mt-12 mb-4 text-lg font-semibold text-text">
              Environment variables
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-[1fr_auto_2fr] border-b border-border bg-bg-subtle font-mono text-[11px] tracking-[0.06em] text-text-dim uppercase">
                <div className="px-4 py-2.5">Variable</div>
                <div className="border-l border-border px-4 py-2.5">Default</div>
                <div className="border-l border-border px-4 py-2.5">Meaning</div>
              </div>
              {ENV_VARS.map((v) => (
                <div
                  key={v.name}
                  className="grid grid-cols-[1fr_auto_2fr] border-b border-border text-[13px] last:border-b-0"
                >
                  <div className="px-4 py-3 font-mono text-text">{v.name}</div>
                  <div className="border-l border-border px-4 py-3 font-mono text-text-dim">
                    {v.def}
                  </div>
                  <div className="border-l border-border px-4 py-3 text-text-dim">
                    {v.meaning}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-12 mb-4 text-lg font-semibold text-text">
              Tools
            </h2>
            <div className="space-y-5">
              {TOOLS.map((t) => (
                <div key={t.sig}>
                  <p className="mb-1.5 overflow-x-auto whitespace-pre font-mono text-[13px] text-accent">
                    {t.sig}
                  </p>
                  <p className="max-w-[68ch] text-[13.5px] text-text-dim">
                    {t.body}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 mb-2 text-lg font-semibold text-text">
              Local dev setup
            </h2>
            <CodeBlock
              code={
                "python3 -m venv .venv && source .venv/bin/activate\n" +
                "pip install maturin\n" +
                "maturin develop --manifest-path bindings/python/Cargo.toml\n" +
                "pip install -e \"mcp[dev]\"\n\n" +
                "pytest mcp/tests"
              }
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
