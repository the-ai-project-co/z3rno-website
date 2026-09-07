import Image from "next/image";
import Link from "next/link";
import { GithubMark } from "@/components/GithubMark";
import { BASE_PATH, GITHUB_URL } from "@/lib/site";
import { shell } from "@/lib/styles";

/** Shared top nav. `homeAnchors` — set on the landing page only, where
 * `#how-it-works`/`#status` are real in-page sections; other pages link
 * back to those sections on `/` instead. */
export function SiteHeader({ homeAnchors = false }: { homeAnchors?: boolean }) {
  const howItWorksHref = homeAnchors ? "#how-it-works" : `${BASE_PATH}/#how-it-works`;
  const statusHref = homeAnchors ? "#status" : `${BASE_PATH}/#status`;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/88 backdrop-blur-md">
      <div className={`${shell} flex h-16 items-center justify-between`}>
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            className="h-[26px] w-[26px] rounded-md"
            src={`${BASE_PATH}/brand/z3rno-icon-dark.svg`}
            width={120}
            height={120}
            alt=""
          />
          <Image
            className="theme-dark h-[18px] w-auto"
            src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-dark.svg`}
            width={400}
            height={100}
            alt="z3rno"
          />
          <Image
            className="theme-light h-[18px] w-auto"
            src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-light.svg`}
            width={400}
            height={100}
            alt="z3rno"
          />
        </Link>
        <nav className="flex items-center gap-7 text-sm text-text-dim">
          <a className="no-underline transition-colors hover:text-text" href={howItWorksHref}>
            How it works
          </a>
          <Link className="no-underline transition-colors hover:text-text" href="/progress">
            Progress
          </Link>
          <a
            className="hidden no-underline transition-colors hover:text-text sm:inline"
            href={statusHref}
          >
            Status
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-1.5 font-medium text-text no-underline transition hover:border-border-strong"
          >
            <GithubMark />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
