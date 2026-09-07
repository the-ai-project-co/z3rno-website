"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GithubMark } from "@/components/GithubMark";
import { BASE_PATH, GITHUB_URL } from "@/lib/site";
import { shell } from "@/lib/styles";

/** Shared top nav. `homeAnchors` — set on the landing page only, where
 * `#how-it-works`/`#status` are real in-page sections; other pages link
 * back to those sections on `/` instead.
 *
 * Nav treatment: a bordered pill capsule of `$`-prefixed command-style
 * labels, a blinking caret, and an icon-only GitHub button — picked from
 * a 35-variant comparison (row "pill capsule", column "$ / icon circle /
 * line divider / caret"). */
export function SiteHeader({ homeAnchors = false }: { homeAnchors?: boolean }) {
  const [open, setOpen] = useState(false);
  const howItWorksHref = homeAnchors ? "#how-it-works" : `${BASE_PATH}/#how-it-works`;
  const statusHref = homeAnchors ? "#status" : `${BASE_PATH}/#status`;

  const links = [
    { label: "How it works", slug: "how-it-works", href: howItWorksHref, kind: "a" as const },
    { label: "Progress", slug: "progress", href: "/progress", kind: "link" as const },
    { label: "Status", slug: "status", href: statusHref, kind: "a" as const },
  ];

  // Escape closes the mobile panel from anywhere, not just the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/88 backdrop-blur-md">
      <div className={`${shell} flex h-[68px] items-center justify-between`}>
        <Link href="/" className="flex items-center no-underline" onClick={() => setOpen(false)}>
          <Image
            className="theme-dark h-5 w-auto"
            src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-dark.svg`}
            width={400}
            height={100}
            alt="z3rno"
          />
          <Image
            className="theme-light h-5 w-auto"
            src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-light.svg`}
            width={400}
            height={100}
            alt="z3rno"
          />
        </Link>

        <div className="hidden items-center gap-3.5 md:flex">
          <nav className="header-pill flex items-center gap-px rounded-full border border-border p-[3px] font-mono text-[13px] text-text-dim">
            {links.map((l) =>
              l.kind === "link" ? (
                <Link key={l.slug} className="rounded-full px-3 py-1.5 no-underline transition-colors hover:bg-bg-subtle hover:text-text" href={l.href}>
                  <span className="text-accent">$</span> {l.slug}
                </Link>
              ) : (
                <a key={l.slug} className="rounded-full px-3 py-1.5 no-underline transition-colors hover:bg-bg-subtle hover:text-text" href={l.href}>
                  <span className="text-accent">$</span> {l.slug}
                </a>
              ),
            )}
          </nav>
          <span className="header-caret" aria-hidden="true" />
          <div className="h-5 w-px bg-border" />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="z3rno on GitHub"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-border text-text transition hover:border-border-strong hover:bg-bg-subtle"
          >
            <GithubMark />
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text transition hover:border-border-strong md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {open ? (
              <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            ) : (
              <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="mobile-nav-panel border-t border-border md:hidden">
          <nav className={`${shell} flex flex-col py-2 font-mono`}>
            {links.map((l) =>
              l.kind === "link" ? (
                <Link
                  key={l.slug}
                  className="border-b border-border py-3.5 text-[14px] font-medium text-text no-underline last:border-b-0"
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-accent">$</span> {l.slug}
                </Link>
              ) : (
                <a
                  key={l.slug}
                  className="border-b border-border py-3.5 text-[14px] font-medium text-text no-underline last:border-b-0"
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-accent">$</span> {l.slug}
                </a>
              ),
            )}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3.5 text-[14px] font-medium text-text no-underline"
            >
              <GithubMark />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
