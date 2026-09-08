import Link from "next/link";
import { shell } from "@/lib/styles";

/** Shared header for every /docs sub-page: a breadcrumb back to the docs
 * hub, then the page's own H1 + lede — same shape on all five sub-pages,
 * so it lives once rather than five times. */
export function DocsPageHeader({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <div className={`${shell} pt-10 pb-2`}>
      <Link
        href="/docs"
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-text-dim no-underline hover:text-text"
      >
        ← Docs
      </Link>
      <h1 className="mb-3 text-[clamp(1.85rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em] text-balance">
        {title}
      </h1>
      <p className="max-w-[62ch] text-base text-text-dim">{lede}</p>
    </div>
  );
}
