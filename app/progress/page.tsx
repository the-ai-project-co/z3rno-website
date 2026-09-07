import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GithubMark } from "@/components/GithubMark";
import { PROGRESS_ENTRIES } from "@/lib/progress";
import { sectionLede, shell } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Progress — z3rno",
  alternates: { canonical: "/progress" },
};

export default function Progress() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="border-b border-border py-16 sm:py-22 lg:py-[88px]">
          <div className={shell}>
            <div className="max-w-[640px]">
              <h1 className="mb-3.5 text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-[-0.02em]">
                Progress: what&rsquo;s actually shipped
              </h1>
              <p className={`${sectionLede} max-w-[58ch]`}>
                Every entry below is one slice, in the order it shipped — the
                real decisions and tradeoffs made, and the actual pull
                requests, not a summary written after the fact. Each one also
                came with a README update in both repos, not itemized
                separately here.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-22 lg:py-[88px]">
          <div className={shell}>
            <ol className="flex flex-col gap-10">
              {PROGRESS_ENTRIES.map((entry) => (
                <li
                  key={entry.tag + entry.title}
                  className="grid grid-cols-1 gap-5 border-b border-border pb-10 last:border-b-0 last:pb-0 md:grid-cols-[104px_1fr] md:gap-9"
                >
                  <div className="flex items-center gap-3 md:block md:pt-1">
                    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-accent uppercase">
                      {entry.tag}
                    </span>
                    <time className="font-mono text-[12px] text-text-dim md:mt-2 md:block">
                      {entry.date}
                    </time>
                  </div>

                  <div>
                    <h2 className="mb-2.5 text-[19px] font-semibold tracking-[-0.01em]">
                      {entry.title}
                    </h2>
                    <p className="mb-4 max-w-[68ch] text-[15px] leading-relaxed text-text-dim">
                      {entry.summary}
                    </p>

                    {entry.decisions && entry.decisions.length > 0 && (
                      <div className="mb-4 rounded-lg border border-border bg-bg-subtle p-4.5">
                        <p className="mb-2 font-mono text-[11px] tracking-[0.05em] text-text-dim uppercase">
                          Key decisions
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {entry.decisions.map((d) => (
                            <li
                              key={d}
                              className="max-w-[66ch] text-[13.5px] leading-relaxed text-text-dim before:mr-2 before:text-accent before:content-['—']"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2.5">
                      {entry.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 font-mono text-[12px] text-text-dim no-underline transition hover:border-border-strong hover:text-text"
                        >
                          <GithubMark />
                          {link.label}
                        </a>
                      ))}
                      {entry.note && (
                        <span className="text-[12.5px] text-text-dim italic">{entry.note}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
