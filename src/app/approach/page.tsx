import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";
import { approachSteps } from "@/config/site";

export const metadata: Metadata = {
  title: "My Approach",
  description:
    "Souvik Saha's practical process for social media management, digital marketing, and business promotion.",
};

export default function ApproachPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="The Method"
        title="A calm, structured process for building real digital momentum."
        description="The work is structured to reduce guesswork, make decisions straightforward, and leave your business with an authoritative digital foundation."
      />

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#000000]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal direction="up" className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[.65fr_1.35fr]">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              The Process / 01—06
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">
              No two businesses start in exactly the same place. The process creates enough structure to move forward with confidence while staying responsive to the realities of your market and audience.
            </p>
          </Reveal>

          <div className="divide-y divide-white/10">
            {approachSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction="up"
                delay={index * 0.08}
                className="grid gap-5 py-10 sm:grid-cols-[120px_1fr_1fr] sm:gap-8 items-start group"
              >
                <span className="text-2xl font-black text-white/30 group-hover:text-cyan-400 transition-colors">
                  {step.number}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform">
                  {step.title}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-white/60">
                  {step.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#040404] px-5 py-20 text-white sm:px-8 lg:px-12">
        <Reveal direction="up" className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              A Useful Partnership
            </div>
            <h2 className="mt-5 text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Clear on what matters. Flexible where it counts.
            </h2>
          </div>
          <p className="max-w-xl self-end text-base text-white/65 leading-relaxed">
            The purpose of the process is not to add ceremony. It is to ensure that development, content, and promotion keep serving the business rather than becoming a separate stream of busywork.
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-24 text-center sm:px-8 lg:px-12 bg-[#000000]">
        <Reveal direction="up">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Start with the first conversation
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-3 text-3xl sm:text-5xl font-extrabold text-white hover:text-cyan-400 transition-colors tracking-tight"
          >
            <span>Let&apos;s talk about your next step</span>
            <ArrowUpRight size={32} />
          </Link>
        </Reveal>
      </section>
    </SiteShell>
  );
}
