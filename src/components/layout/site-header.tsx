"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useEffect(() => scrollY.on("change", (value) => setScrolled(value > 24)), [scrollY]);

  return <header className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12"><div className={`mx-auto flex max-w-[1440px] items-center justify-between border-b py-3 transition-[background-color,border-color] duration-300 ${scrolled ? "border-[#d9d8d0]/50 bg-[#f7f6f1]/55 backdrop-blur-md" : "border-transparent bg-transparent"}`}><Link href="/" className="group relative z-10 leading-none" aria-label="Souvik Saha home"><span className="display text-[1.5rem] text-[#18211d]">Souvik</span><span className="ml-1.5 text-[.67rem] font-bold uppercase tracking-[.18em] text-[#18211d]">Saha</span></Link><nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">{siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm text-[#556059] transition-colors hover:text-[#ca5b43]">{item.label}</Link>)}</nav><div className="flex items-center gap-2"><ThemeToggle /><Link href="/contact" className="hidden border border-[#18211d] px-4 py-2 text-xs font-bold text-[#18211d] transition-colors hover:bg-[#18211d] hover:text-white sm:inline-flex">Let&apos;s Talk</Link><button type="button" className="relative z-10 grid size-9 place-items-center xl:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button></div></div><AnimatePresence>{open && <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-auto max-w-[1440px] border border-[#d9d8d0] bg-[#f7f6f1]/95 p-5 shadow-xl backdrop-blur-md xl:hidden" aria-label="Mobile navigation">{siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-[#d9d8d0] py-3 text-sm text-[#18211d] last:border-0">{item.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)} className="mt-4 block bg-[#18211d] px-4 py-3 text-center text-sm font-bold text-white">Let&apos;s Talk</Link></motion.nav>}</AnimatePresence></header>;
}
