// Verified directly against engine/src/engine.rs (MemoryEngine::store/
// recall/forget, Advanced::audit) — re-check against that file before
// editing, never restyle from memory. `tier` (working/episodic/semantic/
// procedural) is a label stored on the Memory record, not a routing
// dimension: all four tiers move through the same three backends below.
const OPERATIONS = [
  {
    op: "store",
    relational: "write Memory record",
    vector: "upsert (if embedding given)",
    graph: "add_node + add_edge per link",
    note: "Always appends a Store event to the audit chain last.",
  },
  {
    op: "recall",
    relational: "get, by id, per match",
    vector: "search(query, k) → ids",
    graph: "—",
    note: "Similarity search only — recall never reads the graph.",
  },
  {
    op: "forget",
    relational: "delete (source of truth)",
    vector: "delete (best-effort)",
    graph: "remove_node (best-effort)",
    note: "Appends a Forget event to the audit chain; returns None if there was nothing to delete.",
  },
  {
    op: "audit",
    relational: "list(kind = audit_event)",
    vector: "—",
    graph: "—",
    note: "Sorted oldest-first — the append-only, hash-chained history.",
  },
] as const;

const COLS = [
  { key: "relational", label: "Relational" },
  { key: "vector", label: "Vector" },
  { key: "graph", label: "Graph" },
] as const;

/** The real store/recall/forget/audit data flow across z3rno's three
 * backends — `full` adds the per-operation note row; the compact form
 * (used on the /docs landing page, orienting before categorizing) omits
 * it. */
export function DataFlowDiagram({ full = false }: { full?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border">
      <div className="grid grid-cols-[1fr_repeat(3,1fr)] border-b border-border bg-bg-subtle font-mono text-[11px] tracking-[0.06em] text-text-dim uppercase">
        <div className="px-5 py-3">Operation</div>
        {COLS.map((c) => (
          <div key={c.key} className="border-l border-border px-5 py-3">
            {c.label}
          </div>
        ))}
      </div>
      {OPERATIONS.map((row) => (
        <div key={row.op} className="border-b border-border last:border-b-0">
          <div className="grid grid-cols-[1fr_repeat(3,1fr)]">
            <div className="px-5 py-4 font-mono text-[13.5px] font-semibold text-accent">
              {row.op}
            </div>
            <div className="border-l border-border px-5 py-4 text-[13px] text-text-dim">
              {row.relational}
            </div>
            <div className="border-l border-border px-5 py-4 text-[13px] text-text-dim">
              {row.vector}
            </div>
            <div className="border-l border-border px-5 py-4 text-[13px] text-text-dim">
              {row.graph}
            </div>
          </div>
          {full && (
            <p className="border-t border-border bg-bg-subtle px-5 py-2.5 text-[12.5px] text-text-dim">
              {row.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
