import type { Metadata } from "next";
import { ArrowUpRight, Blocks, Megaphone } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Digital development and growth work from Souvik Saha.",
};

export default function WorkPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Selected Work"
        title="Digital work shaped around what a business needs next."
        description="My work sits across two connected areas: building useful digital experiences and helping the businesses behind them build momentum online."
      />
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#000000]">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-2">
          <Reveal direction="up" className="h-full">
            <div className="glass-card relative flex h-full flex-col justify-between rounded-2xl p-8 sm:p-12 overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
              <div>
                <div className="size-12 rounded-xl border border-cyan-400/20 bg-cyan-400/10 grid place-items-center text-cyan-400">
                  <Blocks size={24} />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-widest text-cyan-400">
                  01 / Engineering
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Digital foundations that make the next step easier.
                </h2>
                <p className="mt-5 max-w-lg text-base text-white/65 leading-relaxed">
                  Website development, web applications, frontend craft, WebGL 3D experiences, backend integrations, and the infrastructure that supports a useful online presence.
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10">
                <Link
                  href="/web-development"
                  className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Explore Development Work <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15} className="h-full">
            <div className="glass-card relative flex h-full flex-col justify-between rounded-2xl p-8 sm:p-12 overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500" />
              <div>
                <div className="size-12 rounded-xl border border-purple-400/20 bg-purple-400/10 grid place-items-center text-purple-400">
                  <Megaphone size={24} />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-widest text-purple-400">
                  02 / Growth
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Marketing activity that has a useful place to land.
                </h2>
                <p className="mt-5 max-w-lg text-base text-white/65 leading-relaxed">
                  Social media management, digital marketing, audience promotion, content strategy, and organic discovery built around clear business goals.
                </p>
              </div>
              <div className="mt-10 pt-6 border-t border-white/10">
                <Link
                  href="/digital-marketing"
                  className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Explore Growth Work <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#040404] px-5 py-20 sm:px-8 lg:px-12">
        <Reveal direction="up" className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
              A Considered Fit
            </div>
            <h2 className="mt-5 text-3xl sm:text-5xl font-bold text-white tracking-tight">
              The right work is always specific to the business.
            </h2>
          </div>
          <p className="max-w-xl self-end text-base text-white/65 leading-relaxed">
            The most useful examples depend on the project, the stage of the business, and the problem being solved. A conversation is the best place to start.
          </p>
        </Reveal>
      </section>
    </SiteShell>
  );
}
