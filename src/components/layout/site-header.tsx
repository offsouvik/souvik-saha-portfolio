"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (value) => setScrolled(value > 24)), [scrollY]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 sm:px-8 lg:px-12 pointer-events-none">
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full px-6 py-3.5 border transition-all duration-300 pointer-events-auto ${
          scrolled
            ? "border-white/15 bg-black/75 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
            : "border-white/10 bg-black/40 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="group relative z-10 flex items-center gap-2.5 leading-none" aria-label="Souvik Saha home">
          <span className="size-2.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform duration-300" />
          <span className="text-base font-bold tracking-tight text-white">Souvik Saha</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-cyan-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black sm:inline-flex"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={13} />
          </Link>

          <button
            type="button"
            className="relative z-10 grid size-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-[1440px] rounded-2xl border border-white/15 bg-black/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden pointer-events-auto"
            aria-label="Mobile navigation"
          >
            <div className="grid gap-3">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-black hover:bg-cyan-400 transition-colors"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
