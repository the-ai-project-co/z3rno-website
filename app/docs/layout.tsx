import type { ReactNode } from "react";
import { SiteFrame } from "@/components/SiteFrame";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
