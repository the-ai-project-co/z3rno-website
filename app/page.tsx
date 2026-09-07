import type { Metadata } from "next";
import Image from "next/image";
import { BASE_PATH, GITHUB_URL } from "@/lib/site";
import styles from "./page-classes";

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
    body: "When you outgrow a single process, an optional Axum server handles production and multi-tenant deployments, backed by a storage layer you choose.",
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

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <div className={`${styles.shell} ${styles.navInner}`}>
          <a href="#top" className={styles.brand}>
            <Image
              className={styles.brandIcon}
              src={`${BASE_PATH}/brand/z3rno-icon-dark.svg`}
              width={120}
              height={120}
              alt=""
            />
            <Image
              className={`${styles.brandWordmark} ${styles.themeDark}`}
              src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-dark.svg`}
              width={400}
              height={100}
              alt="z3rno"
            />
            <Image
              className={`${styles.brandWordmark} ${styles.themeLight}`}
              src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-light.svg`}
              width={400}
              height={100}
              alt="z3rno"
            />
          </a>
          <nav className={styles.navLinks}>
            <a href="#how-it-works">How it works</a>
            <a href="#status" className="navLink-docs">
              Status
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navGithub}
            >
              <GithubMark />
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div>
              <span className={styles.kicker}>
                <span className={styles.kickerDot} />
                pre&#8209;launch &middot; building in the open
              </span>
              <h1 className={styles.h1}>
                The memory engine your agents run <em>inside</em>, not around.
              </h1>
              <p className={styles.lede}>
                z3rno is an open-source memory engine for AI agents — a Rust
                core with native Python and TypeScript bindings. Store,
                recall, forget, and audit memory without standing up a
                service first.
              </p>
              <div className={styles.heroActions}>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  <GithubMark />
                  View on GitHub
                </a>
                <a href="#status" className={`${styles.btn} ${styles.btnGhost}`}>
                  Project status
                </a>
              </div>
              <p className={styles.heroNote}>
                Apache-2.0 licensed. No packages published yet — see status
                below.
              </p>
            </div>

            <Terminal />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>The problem</p>
              <h2 className={styles.h2}>
                Every framework re-invents agent memory
              </h2>
            </div>
            <div className={styles.problemGrid}>
              <div className={styles.problemCol}>
                <p>
                  Give an agent memory today and you&rsquo;re usually wiring
                  together a vector database, a cache layer, and hand-rolled
                  TTL logic — then doing it again in the next language your
                  team touches. Most of what calls itself a{" "}
                  <strong>memory API</strong> is a network hop to someone
                  else&rsquo;s server before your agent can even recall a
                  fact.
                </p>
              </div>
              <div className={styles.problemCol}>
                <p>
                  z3rno starts from a different premise: memory should be a
                  library, not a service. The engine is a Rust core with
                  native bindings — no client, no server, no round trip,
                  unless you decide you want one.{" "}
                  <strong>store, recall, forget, and audit</strong> are
                  function calls, not endpoints.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>How it works</p>
              <h2 className={styles.h2}>Four ideas, one engine</h2>
              <p className={styles.sectionLede}>
                z3rno is built around a small set of decisions we&rsquo;re not
                walking back.
              </p>
            </div>

            <div className={styles.pillars}>
              {PILLARS.map((p) => (
                <div className={styles.pillar} key={p.index}>
                  <p className={styles.pillarIndex}>{p.index}</p>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarBody}>{p.body}</p>
                </div>
              ))}
            </div>

            <div className={styles.tiers}>
              <span className={styles.tiersLabel}>Memory tiers</span>
              {TIERS.map((t) => (
                <span className={styles.tierChip} key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="status" className={`${styles.section} ${styles.status}`}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Status</p>
              <h2 className={styles.h2}>This is genuinely early</h2>
            </div>

            <div className={styles.statusCard}>
              <span className={styles.statusBadge}>
                <span className={styles.statusBadgeDot} />
                pre&#8209;launch
              </span>
              <div className={styles.statusText}>
                <p>
                  The monorepo just landed its{" "}
                  <strong>Cargo workspace skeleton and binding
                  scaffolds</strong>. Nothing is installable yet — no
                  packages are published on any registry.
                </p>
                <p>
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
                className={`${styles.btn} ${styles.btnGhost}`}
              >
                Follow along on GitHub ↗
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section} style={{ borderBottom: "none" }}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Install</p>
              <h2 className={styles.h2}>Coming soon</h2>
              <p className={styles.sectionLede}>
                Nothing is published yet. This is the target surface across
                all three ecosystems.
              </p>
            </div>

            <div className={styles.installGrid}>
              {INSTALLS.map((i) => (
                <div className={styles.installCard} key={i.label}>
                  <div className={styles.installCardHead}>
                    <span className={styles.installCardLabel}>{i.label}</span>
                    <span className={styles.soon}>Coming soon</span>
                  </div>
                  <pre className={styles.installCode}>
                    <span className={styles.accentText}>$</span> {i.cmd}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <Image
              className={`${styles.footerWordmark} ${styles.themeDark}`}
              src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-dark.svg`}
              width={400}
              height={100}
              alt="z3rno"
            />
            <Image
              className={`${styles.footerWordmark} ${styles.themeLight}`}
              src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-light.svg`}
              width={400}
              height={100}
              alt="z3rno"
            />
          </div>
          <div className={styles.footerLinks}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href={`${GITHUB_URL}-website/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
            >
              License
            </a>
          </div>
          <p className={styles.footerMeta}>
            Apache-2.0 licensed. Built in the open.
          </p>
        </div>
      </footer>
    </>
  );
}

function Terminal() {
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <span className={styles.terminalDot} style={{ background: "var(--error)" }} />
        <span className={styles.terminalDot} style={{ background: "var(--warning)" }} />
        <span className={styles.terminalDot} style={{ background: "var(--success)" }} />
        <span className={styles.terminalTitle}>z3rno &middot; embedded</span>
      </div>
      <pre className={styles.terminalBody}>
        <code>
          <span className={styles.prompt}>$ </span>
          <span className={styles.cmd}>cargo add z3rno-engine</span>
          {"\n\n"}
          <span className={styles.kw}>use</span> z3rno::
          <span className={styles.type}>Engine</span>;{"\n\n"}
          <span className={styles.kw}>let</span> engine ={" "}
          <span className={styles.type}>Engine</span>::
          <span className={styles.fn}>embedded</span>()?;{"\n\n"}
          engine.
          <span className={styles.fn}>store</span>(
          <span className={styles.type}>Memory</span>::
          <span className={styles.fn}>new</span>(
          <span className={styles.str}>
            &quot;user prefers dark roast coffee&quot;
          </span>
          ))?;{"\n\n"}
          <span className={styles.kw}>let</span> hits = engine.
          <span className={styles.fn}>recall</span>(
          <span className={styles.str}>
            &quot;what does the user prefer?&quot;
          </span>
          )?;{"\n\n"}
          engine.
          <span className={styles.fn}>forget</span>(hits[0].id)?;{" "}
          <span className={styles.comment}>
            {"// returns a proof of erasure"}
          </span>
          {"\n\n"}
          <span className={styles.kw}>let</span> log = engine.
          <span className={styles.fn}>audit</span>(since)?;{" "}
          <span className={styles.comment}>
            {"// hash-chained, append-only"}
          </span>
        </code>
      </pre>
    </div>
  );
}

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.6 2.29 6.65 5.47 7.72.4.08.55-.17.55-.39 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.22 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.2-3.64-.91-3.64-4.02 0-.89.31-1.61.82-2.18-.08-.2-.36-1.03.08-2.15 0 0 .67-.22 2.2.83a7.4 7.4 0 0 1 4 0c1.53-1.05 2.2-.83 2.2-.83.44 1.12.16 1.95.08 2.15.51.57.82 1.28.82 2.18 0 3.12-1.87 3.82-3.65 4.02.29.26.54.75.54 1.53 0 1.11-.01 2-.01 2.27 0 .22.15.48.55.39A8.14 8.14 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
    </svg>
  );
}
