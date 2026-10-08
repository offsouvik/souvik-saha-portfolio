"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Megaphone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Compass,
  Database,
  CircleGauge,
  LayoutTemplate,
  Layers,
  TrendingUp,
  Globe,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HomeSections() {
  return (
    <div className="relative w-full bg-[#000000] text-white overflow-hidden">
      {/* Ambient Gradient Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 size-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-[30%] -right-40 size-[700px] rounded-full bg-purple-600/10 blur-[160px]" />
      <div className="pointer-events-none absolute top-[65%] -left-40 size-[650px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* ========================================================
          1. THE DUAL ENGINE (BUILD & GROW)
      ======================================================== */}
      <section id="dual-engine" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  The Dual Engine
                </div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                  Two disciplines. One unified partner.
                </h2>
              </div>
              <p className="max-w-md text-base text-white/60 leading-relaxed">
                A digital presence needs both exceptional engineering to earn trust and strategic marketing to attract the right audience. I build both.
              </p>
            </div>
          </Reveal>

          {/* Dual Cards Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* CARD 1: BUILD */}
            <Reveal direction="up" delay={0.2} className="h-full">
              <div className="glass-card relative flex h-full flex-col justify-between rounded-2xl p-8 sm:p-12 overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_30px_-5px_rgba(56,189,248,0.3)]">
                      <Code2 size={26} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400/80">
                      01 / Engineering
                    </span>
                  </div>

                  <h3 className="mt-8 text-3xl font-bold text-white tracking-tight sm:text-4xl">
                    Build the digital foundation.
                  </h3>
                  <p className="mt-4 text-base text-white/65 leading-relaxed">
                    Custom websites, web applications, and interactive experiences engineered with modern technology, silky animations, and high-performance speed.
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Next.js 16", "React 19", "Three.js / WebGL", "TypeScript", "Tailwind CSS", "Node.js"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition-colors group-hover:border-cyan-500/30 group-hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <ul className="mt-8 space-y-3.5 border-t border-white/10 pt-6 text-sm text-white/70">
                    {[
                      "Bespoke High-Fidelity UI/UX & Responsive Web",
                      "Full-Stack Web Applications & Client Portals",
                      "3D WebGL Refraction & Creative Micro-Interactions",
                      "Robust API Integrations, Databases & Performance",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <Link
                    href="/web-development"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Explore Development Services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* CARD 2: GROW */}
            <Reveal direction="up" delay={0.3} className="h-full">
              <div className="glass-card relative flex h-full flex-col justify-between rounded-2xl p-8 sm:p-12 overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]">
                      <Megaphone size={26} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400/80">
                      02 / Growth
                    </span>
                  </div>

                  <h3 className="mt-8 text-3xl font-bold text-white tracking-tight sm:text-4xl">
                    Grow the business behind it.
                  </h3>
                  <p className="mt-4 text-base text-white/65 leading-relaxed">
                    Purposeful promotion, consistent social media systems, search discoverability, and campaign strategies that transform attention into measurable growth.
                  </p>

                  {/* Growth channels pills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Instagram & Meta", "Social Media Strategy", "Google Visibility", "Campaign Planning", "Startup Growth"].map((channel) => (
                      <span
                        key={channel}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition-colors group-hover:border-purple-500/30 group-hover:text-white"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <ul className="mt-8 space-y-3.5 border-t border-white/10 pt-6 text-sm text-white/70">
                    {[
                      "End-to-End Social Media Management & Content Rhythms",
                      "Targeted Digital Marketing & Promotional Campaigns",
                      "Google Business Profile & Search Discoverability",
                      "Early-Stage Startup Launch & Audience Positioning",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <Link
                    href="/digital-marketing"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Explore Marketing Services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SELECTED WORKS SHOWCASE
      ======================================================== */}
      <section id="work" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36 border-t border-white/10 bg-[#040404]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                  <Sparkles size={13} className="text-cyan-400" />
                  Selected Work
                </div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                  Crafted for impact. Built to scale.
                </h2>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
              >
                View All Projects <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>

          {/* Project Cards */}
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Design World Platform",
                category: "3D Web Experience / WebGL",
                desc: "Interactive 3D glass refraction landing platform built with custom WebGL chromatic dispersion shaders.",
                tech: ["Three.js", "WebGL", "Next.js", "GLSL"],
                metric: "60 FPS Interactive",
                link: "/work",
              },
              {
                title: "Apex Brand System",
                category: "Social Media / Content Engine",
                desc: "Complete visual storytelling and content distribution framework that quadrupled organic social reach.",
                tech: ["Meta Marketing", "Content Strategy", "Instagram"],
                metric: "3.8x Reach Multiplier",
                link: "/social-media-management",
              },
              {
                title: "Orbit SaaS Dashboard",
                category: "Web Application / Product Architecture",
                desc: "High-performance analytics portal with real-time data sync, user journey optimization, and responsive dashboards.",
                tech: ["React 19", "TypeScript", "Tailwind CSS"],
                metric: "Zero-Latency UI",
                link: "/web-applications",
              },
            ].map((proj, idx) => (
              <Reveal key={proj.title} direction="up" delay={idx * 0.15}>
                <div className="glass-card group relative flex h-full flex-col justify-between rounded-2xl p-7 sm:p-9">
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/50 uppercase tracking-widest">
                      <span>{proj.category}</span>
                      <span className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-cyan-400 font-semibold border border-cyan-400/20">
                        {proj.metric}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">
                      {proj.desc}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span key={t} className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs font-semibold text-white/50 group-hover:text-white transition-colors">
                      Case Study
                    </span>
                    <Link
                      href={proj.link}
                      className="size-9 rounded-full border border-white/15 bg-white/5 grid place-items-center text-white group-hover:bg-cyan-400 group-hover:text-black transition-colors"
                      aria-label={`View ${proj.title}`}
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. THE 6-STEP PROCESS / METHOD
      ======================================================== */}
      <section id="approach" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36 border-t border-white/10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal direction="up">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                <Compass size={13} className="text-purple-400" />
                The Method
              </div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                A clear path from concept to sustained growth.
              </h2>
              <p className="mt-4 text-base text-white/60 leading-relaxed max-w-xl">
                Every project follows a transparent, outcome-oriented roadmap designed to eliminate friction and guarantee craft.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { num: "01", title: "Discover", desc: "Uncover core objectives, audience friction points, and the unique competitive advantage of your business." },
              { num: "02", title: "Plan", desc: "Define technical architecture, visual art direction, marketing channels, and measurable KPIs." },
              { num: "03", title: "Build", desc: "Engineer the website, application, or content systems with meticulous precision and performance." },
              { num: "04", title: "Launch", desc: "Orchestrate an impactful deployment across digital touchpoints with zero downtime and crisp messaging." },
              { num: "05", title: "Measure", desc: "Analyze audience reception, retention metrics, and conversion funnels against defined growth benchmarks." },
              { num: "06", title: "Scale", desc: "Iterate features, expand promotional reach, and compound momentum through continuous refinement." },
            ].map((step, idx) => (
              <Reveal key={step.num} direction="up" delay={idx * 0.1}>
                <div className="glass-card group relative rounded-2xl p-8 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-white/20 group-hover:text-cyan-400 transition-colors">
                      {step.num}
                    </span>
                    <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-6 h-0.5 w-8 bg-white/15 group-hover:w-full group-hover:bg-cyan-400 transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CORE CAPABILITIES / PHILOSOPHY
      ======================================================== */}
      <section id="capabilities" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36 border-t border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal direction="up">
            <div className="border-b border-white/10 pb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                <CircleGauge size={13} className="text-cyan-400" />
                Philosophy
              </div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
                Guiding principles in practice.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: LayoutTemplate,
                title: "Build What People Need",
                desc: "Design is not superficial decoration. Every interaction and layout structure is shaped around clarity, function, and ease of use.",
              },
              {
                icon: Database,
                title: "Connect The Useful Parts",
                desc: "Interfaces without strong systems fail. We build clean data foundations, reliable integrations, and scalable code that stands the test of time.",
              },
              {
                icon: TrendingUp,
                title: "Grow With Intention",
                desc: "Traffic without resonance is meaningless. We build marketing systems that attract genuine interest and build enduring loyalty.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} direction="up" delay={idx * 0.15}>
                  <div className="glass-card rounded-2xl p-8 sm:p-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="size-12 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-cyan-400">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-8 text-2xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm text-white/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. ABOUT SOUVIK SAHA
      ======================================================== */}
      <section id="about" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36 border-t border-white/10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <Reveal direction="left">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  About Souvik Saha
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                  A digital professional with both sides in view.
                </h2>
                <p className="mt-6 text-lg text-white/70 leading-relaxed">
                  I develop websites, web applications, and interactive digital experiences that give businesses an authoritative presence online.
                </p>
                <p className="mt-4 text-base text-white/60 leading-relaxed">
                  At the same time, I direct the promotional strategy around that presence: social media, content systems, search visibility, and strategic marketing that connects the business to its ideal clients.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan-400"
                  >
                    Read More About Souvik <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <div className="glass-card relative rounded-3xl p-8 sm:p-12 border border-white/15 overflow-hidden">
                <div className="absolute top-0 right-0 size-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <span className="text-6xl text-cyan-400 leading-none font-serif">“</span>
                <p className="mt-2 text-2xl sm:text-3xl font-medium text-white leading-snug">
                  Build what matters.<br />Grow what works.
                </p>
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs uppercase tracking-widest text-white/50">
                  <span>Souvik Saha</span>
                  <span>Development & Growth</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. HIGH-IMPACT FINAL CTA
      ======================================================== */}
      <section id="contact" className="relative px-5 py-28 sm:px-8 lg:px-12 lg:py-36 border-t border-white/10 bg-[#030303]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal direction="up">
            <div className="glass-card relative rounded-3xl p-10 sm:p-16 lg:p-20 text-center overflow-hidden border border-white/15">
              {/* Aurora gradient backdrops */}
              <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-cyan-500/15 blur-[120px]" />
              <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-purple-500/15 blur-[120px]" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available For New Projects
                </div>

                <h2 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white">
                  Have something to build—or a business ready to grow?
                </h2>
                <p className="mt-6 text-lg text-white/65 leading-relaxed max-w-xl mx-auto">
                  Let&apos;s talk about the website, product, or growth strategy that can give your next step unstoppable momentum.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-transform duration-300 hover:scale-105 hover:bg-cyan-400 shadow-[0_0_35px_-5px_rgba(255,255,255,0.4)]"
                  >
                    Start a Conversation <ArrowUpRight size={18} />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Explore Selected Work
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          7. LUXURY DARK FOOTER
      ======================================================== */}
      <footer className="border-t border-white/10 bg-[#000000] px-5 pb-10 pt-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 md:grid-cols-[1.4fr_.8fr_.8fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white">
                <span className="size-3 rounded-full bg-cyan-400" />
                Souvik Saha
              </Link>
              <p className="mt-4 max-w-sm text-sm text-white/50 leading-relaxed">
                Digital development & growth partner for businesses ready to build a lasting presence online.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">Navigation</p>
              <div className="mt-4 grid gap-2.5 text-sm text-white/70">
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                <Link href="/work" className="hover:text-cyan-400 transition-colors">Selected Work</Link>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
                <Link href="/approach" className="hover:text-cyan-400 transition-colors">The Method</Link>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">Services</p>
              <div className="mt-4 grid gap-2.5 text-sm text-white/70">
                <Link href="/web-development" className="hover:text-cyan-400 transition-colors">Website Development</Link>
                <Link href="/web-applications" className="hover:text-cyan-400 transition-colors">Web Applications</Link>
                <Link href="/social-media-management" className="hover:text-cyan-400 transition-colors">Social Media Strategy</Link>
                <Link href="/digital-marketing" className="hover:text-cyan-400 transition-colors">Digital Marketing</Link>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Souvik Saha. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
