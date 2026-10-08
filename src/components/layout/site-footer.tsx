import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#000000] px-5 pb-10 pt-16 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_.8fr_.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white">
              <span className="size-2.5 rounded-full bg-cyan-400" />
              Souvik Saha
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/50 leading-relaxed">
              Digital development & growth partner for businesses ready to build an authoritative presence online.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Navigation</p>
            <div className="mt-4 grid gap-2.5 text-sm text-white/70">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40">Capabilities</p>
            <div className="mt-4 grid gap-2.5 text-sm text-white/70">
              <Link href="/web-development" className="transition-colors hover:text-cyan-400">
                Website Development
              </Link>
              <Link href="/web-applications" className="transition-colors hover:text-cyan-400">
                Web Applications
              </Link>
              <Link href="/social-media-management" className="transition-colors hover:text-cyan-400">
                Social Media Strategy
              </Link>
              <Link href="/digital-marketing" className="transition-colors hover:text-cyan-400">
                Digital Marketing
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Souvik Saha. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
