import type { Metadata } from "next";
import { ArrowUpRight, CircleCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About Souvik Saha",
  description:
    "About Souvik Saha, a digital development and growth professional for startups and growing businesses.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="About Souvik Saha"
        title="A practical partner for the product and the growth around it."
        description="I work across digital development and marketing, helping businesses build useful online experiences and create the momentum that helps people find them."
      />

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#000000]">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                The Philosophy
              </div>
              <h2 className="mt-5 text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Technology and growth work better when they are connected.
              </h2>
            </div>
          </Reveal>

          <div className="grid content-center gap-6">
            <Reveal direction="right" delay={0.08} className="max-w-2xl text-lg leading-relaxed text-white/70">
              <p>
                I develop websites, web applications, and digital experiences that give businesses a clearer, more authoritative place to show up online.
              </p>
              <p className="mt-5">
                At the same time, I work on the marketing around that presence: social media, content systems, promotion, and digital activity that helps the right people find it and understand its value.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.14} className="border-t border-white/10 pt-6 text-sm leading-relaxed text-white/50">
              The aim is straightforward: build work that is useful, then give it the attention and direction it needs to make an enduring difference.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#040404] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-3">
          {[
            ["How I work", "With curiosity, practical thinking, and a close eye on the details that shape how a business is experienced online."],
            ["Who I help", "Startups, small businesses, brands, and growing teams that need considered support with digital development or growth."],
            ["What I value", "Clarity over jargon, honest communication over inflated claims, and work that remains useful after it is launched."],
          ].map(([title, copy], index) => (
            <Reveal key={title} direction="up" delay={index * 0.1}>
              <div className="glass-card rounded-2xl p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-xl border border-cyan-400/20 bg-cyan-400/10 grid place-items-center text-cyan-400">
                    <CircleCheck size={18} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white tracking-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 bg-[#000000]">
        <Reveal direction="up" className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 rounded-3xl border border-white/15 bg-white/[0.02] p-10 sm:p-14 md:flex-row md:items-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-xl">
            Let&apos;s make the next part of your digital presence more useful.
          </h2>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-cyan-400"
          >
            Contact Souvik <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
    </SiteShell>
  );
}
