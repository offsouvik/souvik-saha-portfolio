import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-white/20 selection:text-white">
      <SiteHeader />
      <main className="w-full">{children}</main>
      <SiteFooter />
    </div>
  );
}
