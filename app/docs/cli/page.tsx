import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DocsPageHeader } from "@/components/DocsPageHeader";
import { CodeBlock } from "@/components/CodeBlock";
import { shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "CLI Reference — z3rno docs",
  description: "The z3rno CLI's five subcommands, flag tables, and the naive local embedding fallback.",
  alternates: { canonical: "/docs/cli" },
};

const COMMANDS = [
  {
    name: "z3rno init",
    body: "Bootstraps a local embedded store: opens MemoryEngine::embedded(--path) once, creating the SQLite file and schema if they don't exist yet.",
    usage: "z3rno init [--path z3rno.db] [--tenant local]",
  },
  {
    name: "z3rno serve",
    body: "Runs the real z3rno HTTP API server locally, against either the embedded backend or Postgres. --jwt-secret is optional here (unlike the standalone z3rno-server binary) — omit it and a random secret is generated for that run, printed as a warning to stderr. Local/dev convenience only: every session and token stops validating the moment the process restarts.",
    usage:
      "z3rno serve\n  [--listen-addr 0.0.0.0:8080]\n  [--database-url postgres://...]\n  [--sqlite-path z3rno.db]\n  [--cache-sqlite-path z3rno-cache.db]\n  [--jwt-secret <secret>]\n  [--superadmin-api-key <key>]",
  },
  {
    name: "z3rno store",
    body: "Stores a memory against a local embedded store. Prints the created memory's id on success.",
    usage:
      "z3rno store <content>\n  [--tenant local]\n  [--path z3rno.db]\n  [--tier semantic]      # working | episodic | semantic | procedural\n  [--embedding 0.1,0.2,...]\n  [--metadata '{\"key\":\"value\"}']",
  },
  {
    name: "z3rno recall",
    body: "Recalls up to --k memories most similar to <query>. Prints one line per result (id, tier, content); \"No memories found.\" if nothing matches.",
    usage: "z3rno recall <query>\n  [--tenant local]\n  [--path z3rno.db]\n  [--k 5]\n  [--embedding 0.1,0.2,...]",
  },
  {
    name: "z3rno forget",
    body: "Removes a memory by id. Prints a confirmation with the audit event id/hash on success, or a not-found message — a no-op, not an error, if the id doesn't exist for that tenant.",
    usage: "z3rno forget <id>\n  [--tenant local]\n  [--path z3rno.db]",
  },
];

export default function CliDocs() {
  return (
    <>
      <SiteHeader />

      <main>
        <DocsPageHeader
          title="CLI Reference"
          lede="The standalone z3rno binary (crate z3rno-cli), distributed via crates.io and npm. Every command accepts --tenant (defaults to 'local'); every z3rno serve flag also reads from a matching Z3RNO_* environment variable."
        />

        <section className="py-10">
          <div className={shell}>
            <CodeBlock
              label="Composable end to end, with no flags"
              code={"z3rno init\nz3rno store \"the user prefers dark mode\"\nz3rno recall \"dark mode\""}
            />

            <div className="mt-10 space-y-8">
              {COMMANDS.map((c) => (
                <div key={c.name}>
                  <h2 className="mb-2 font-mono text-base font-semibold text-text">
                    {c.name}
                  </h2>
                  <p className="mb-3 max-w-[68ch] text-[13.5px] leading-relaxed text-text-dim">
                    {c.body}
                  </p>
                  <CodeBlock code={c.usage} />
                </div>
              ))}
            </div>

            <h2 className="mt-12 mb-2 text-lg font-semibold text-text">
              Embeddings: the naive local hashing default
            </h2>
            <p className="max-w-[68ch] text-[13.5px] leading-relaxed text-text-dim">
              When <code>--embedding</code> is omitted, <code>store</code>{" "}
              and <code>recall</code> both embed the text themselves with a
              small feature-hashing function: lowercase + tokenize, hash
              each token into one of 128 buckets, accumulate ±1 per
              occurrence, L2-normalize. It&rsquo;s a deterministic
              bag-of-words vector, not a semantic embedding model — a local
              placeholder that makes the CLI work end to end with zero
              external services. For real semantic recall, supply real
              embeddings via <code>--embedding</code>.
            </p>

            <h2 className="mt-12 mb-2 text-lg font-semibold text-text">
              A known limitation
            </h2>
            <p className="max-w-[68ch] text-[13.5px] leading-relaxed text-text-dim">
              The embedded vector index lives entirely in process memory —
              it is not persisted to the SQLite file. A <code>store</code>{" "}
              in one process and a <code>recall</code> in a later, separate
              process will not find that memory via similarity search yet,
              even though <code>recall</code> works correctly against
              anything stored earlier in the same process (e.g. one
              long-running <code>z3rno serve</code> session). Tracked as{" "}
              <a
                href="https://github.com/the-ai-project-co/z3rno/issues/21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text underline"
              >
                z3rno#21
              </a>{" "}
              — the same class of gap already tracked for the embedded
              graph backend as{" "}
              <a
                href="https://github.com/the-ai-project-co/z3rno/issues/8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text underline"
              >
                z3rno#8
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
