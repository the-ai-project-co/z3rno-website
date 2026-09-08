import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DataFlowDiagram } from "@/components/DataFlowDiagram";
import { shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Docs — z3rno",
  description:
    "How z3rno's four operations move data through its three backends, install instructions for every channel, and reference docs for the SDKs, CLI, and MCP server.",
  alternates: { canonical: "/docs" },
};

const CATEGORIES = [
  {
    href: "/docs/sdk",
    title: "SDK / Bindings",
    body: "Python and TypeScript Client usage, error semantics, and the Postgres backend opt-in.",
  },
  {
    href: "/docs/cli",
    title: "CLI Reference",
    body: "All five z3rno subcommands, flag tables, and the naive local embedding fallback.",
  },
  {
    href: "/docs/mcp",
    title: "MCP Setup",
    body: "Claude Desktop / Cursor config, the four exposed tools, and local dev setup.",
  },
  {
    href: "/docs/architecture",
    title: "Architecture",
    body: "The full store / recall / forget / audit data flow across all three backends.",
  },
];

export default function DocsLanding() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="border-b border-border py-14 sm:py-18">
          <div className={shell}>
            <p className="mb-3 font-mono text-[11px] tracking-[0.07em] text-text-dim uppercase">
              How it fits together
            </p>
            <DataFlowDiagram />
            <Link
              href="/docs/architecture"
              className="mt-3 inline-block text-[13px] text-text-dim no-underline hover:text-text"
            >
              See the full data flow and per-operation notes →
            </Link>
          </div>
        </section>

        <section className="py-14 sm:py-18">
          <div className={shell}>
            <Link
              href="/docs/install"
              className="mb-6 block overflow-hidden rounded-[28px] border border-border bg-bg-subtle p-7 no-underline transition hover:border-border-strong sm:p-9"
            >
              <h1 className="mb-2 text-[clamp(1.6rem,2.8vw,2.1rem)] font-semibold tracking-[-0.02em] text-text">
                Get started: install z3rno
              </h1>
              <p className="max-w-[58ch] text-[14.5px] text-text-dim">
                Every publish channel — pip, npm, cargo, and the GHCR server
                image — with the exact commands and required configuration.
              </p>
            </Link>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-2xl border border-border bg-bg-subtle p-6 no-underline transition hover:border-border-strong"
                >
                  <h2 className="mb-1.5 text-base font-semibold text-text">
                    {c.title}
                  </h2>
                  <p className="text-[13.5px] leading-relaxed text-text-dim">
                    {c.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
