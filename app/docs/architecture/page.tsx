import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DocsPageHeader } from "@/components/DocsPageHeader";
import { DataFlowDiagram } from "@/components/DataFlowDiagram";
import { shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Architecture — z3rno docs",
  description:
    "The real store/recall/forget/audit data flow across z3rno's relational, vector, and graph backends.",
  alternates: { canonical: "/docs/architecture" },
};

export default function ArchitectureDocs() {
  return (
    <>
      <SiteHeader />

      <main>
        <DocsPageHeader
          title="Architecture: the data flow"
          lede="Where the landing page's diagram shows what runs where (engine, bindings, server), this is one level deeper: what each of the four operations actually does to each of the three backends. Read directly from engine/src/engine.rs, not summarized."
        />

        <section className="py-10">
          <div className={shell}>
            <DataFlowDiagram full />

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-2 text-base font-semibold text-text">
                  Tiers are a label, not a route
                </h2>
                <p className="text-[13.5px] leading-relaxed text-text-dim">
                  <code>working</code>, <code>episodic</code>,{" "}
                  <code>semantic</code>, and <code>procedural</code> are a
                  field stored on the memory record itself — every tier
                  moves through the exact same relational, vector, and graph
                  backends above. There is no separate storage path per
                  tier; the tier is metadata a caller attaches and can later
                  filter or reason about, not a routing dimension the engine
                  enforces.
                </p>
              </div>

              <div>
                <h2 className="mb-2 text-base font-semibold text-text">
                  The audit chain
                </h2>
                <p className="text-[13.5px] leading-relaxed text-text-dim">
                  <code>store</code> and <code>forget</code> each append one
                  event to the relational store, hashed against the
                  previous event in that tenant&rsquo;s chain (the first
                  event has no previous hash). <code>audit</code> lists
                  every event of kind <code>audit_event</code> for a
                  tenant and sorts them oldest-first — nothing about the
                  chain lives in the vector or graph backends.
                </p>
              </div>

              <div>
                <h2 className="mb-2 text-base font-semibold text-text">
                  Links are write-only today
                </h2>
                <p className="text-[13.5px] leading-relaxed text-text-dim">
                  <code>store</code>&rsquo;s optional <code>links</code>{" "}
                  parameter writes real edges to the graph backend
                  (<code>add_node</code> + <code>add_edge</code> per link).
                  There is no query path back through them yet — no binding,
                  no server route, no CLI command reads graph edges. Tracked
                  as{" "}
                  <a
                    href="https://github.com/the-ai-project-co/z3rno/issues/29"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text underline"
                  >
                    z3rno#29
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="mb-2 text-base font-semibold text-text">
                  Forget is best-effort outside the relational store
                </h2>
                <p className="text-[13.5px] leading-relaxed text-text-dim">
                  The relational store is the source of truth for whether a
                  memory exists — its <code>delete</code> is what decides
                  whether <code>forget</code> is a no-op. Vector and graph
                  cleanup happen afterward and are allowed to fail silently:
                  a leftover vector or graph entry is inert (never returned
                  by <code>recall</code>, which always joins back through
                  the relational store) rather than a correctness problem.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
