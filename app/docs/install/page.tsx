import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DocsPageHeader } from "@/components/DocsPageHeader";
import { CodeBlock } from "@/components/CodeBlock";
import { shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Install — z3rno docs",
  description: "Every z3rno publish channel: pip, npm, cargo, and the GHCR server image.",
  alternates: { canonical: "/docs/install" },
};

const CHANNELS = [
  {
    label: "Python",
    cmd: "pip install z3rno",
    note: "PyO3 bindings — the SDK is the compiled engine, not an HTTP client.",
  },
  {
    label: "TypeScript",
    cmd: "npm install @z3rno/sdk",
    note: "napi-rs bindings, async-only (every I/O method returns a Promise).",
  },
  {
    label: "Rust",
    cmd: "cargo add z3rno-engine",
    note: "The core crate directly — same engine every other channel wraps.",
  },
];

export default function InstallDocs() {
  return (
    <>
      <SiteHeader />

      <main>
        <DocsPageHeader
          title="Install"
          lede="Nothing here is published on any registry yet — no packages are live. These are the exact target commands for when the first release ships."
        />

        <section className="py-10">
          <div className={shell}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CHANNELS.map((c) => (
                <div key={c.label} className="flex flex-col gap-2.5">
                  <CodeBlock label={c.label} code={c.cmd} prompt />
                  <p className="text-[12.5px] text-text-dim">{c.note}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 mb-3 text-lg font-semibold text-text">
              Server image (GHCR)
            </h2>
            <p className="mb-4 max-w-[62ch] text-[14.5px] text-text-dim">
              The multi-arch <code>z3rno-server</code> image refuses to start
              without an explicit JWT secret — it deliberately does not bake
              in an insecure default.
            </p>
            <CodeBlock
              label="docker run"
              code={`docker run -e Z3RNO_JWT_SECRET=<a-real-random-secret> \\\n  -p 8080:8080 ghcr.io/the-ai-project-co/z3rno-server`}
            />

            <p className="mt-10 max-w-[62ch] text-[13.5px] text-text-dim">
              Building from source today? See the{" "}
              <a
                href="https://github.com/the-ai-project-co/z3rno#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text underline"
              >
                root README
              </a>{" "}
              for local dev instructions across every crate and package.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
