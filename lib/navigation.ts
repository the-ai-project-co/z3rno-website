import { BASE_PATH } from "@/lib/site";

type RouteTarget = { kind: "route"; href: string };
type HomeAnchorTarget = { kind: "home-anchor"; id: string };

export type NavItem = {
  label: string;
  slug: string;
  target: RouteTarget | HomeAnchorTarget;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "How it works", slug: "how-it-works", target: { kind: "home-anchor", id: "how-it-works" } },
  { label: "Docs", slug: "docs", target: { kind: "route", href: "/docs" } },
  { label: "Progress", slug: "progress", target: { kind: "route", href: "/progress" } },
  { label: "Status", slug: "status", target: { kind: "home-anchor", id: "status" } },
];

/** Anchor targets need the deployment base path only when leaving the home page. */
export function resolveNavTarget(target: NavItem["target"], homeAnchors: boolean) {
  if (target.kind === "route") return { kind: "route" as const, href: target.href };
  return {
    kind: "anchor" as const,
    href: homeAnchors ? `#${target.id}` : `${BASE_PATH}/#${target.id}`,
  };
}
