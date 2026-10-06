import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

/** Page chrome shared by marketing and docs routes. */
export function SiteFrame({
  children,
  homeAnchors = false,
}: {
  children: ReactNode;
  homeAnchors?: boolean;
}) {
  return (
    <>
      <SiteHeader homeAnchors={homeAnchors} />
      {children}
      <SiteFooter />
    </>
  );
}
