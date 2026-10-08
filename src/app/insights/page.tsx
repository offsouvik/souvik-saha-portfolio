import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";
import { insights } from "@/config/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Ideas and practical notes about web development, social media strategy, startup marketing, and Google visibility.",
};

export default function InsightsPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Insights & Perspectives"
        title="Notes on engineering and scaling digital products."
        description="Practical ideas for businesses navigating websites, digital products, social media strategy, content, promotion, and the small decisions that create a stronger presence online."
      />

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#000000]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid border-t border-white/10 md:grid-cols-2">
            {insights.map((insight, index) => (
              <Reveal
                key={insight.slug}
                direction="up"
                delay={index * 0.08}
                className="group border-b border-white/10 py-10 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  {insight.category}
                </span>
                <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                  {insight.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {insight.excerpt}
                </p>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-cyan-400 transition-colors"
                >
                  Read Article <ArrowUpRight size={15} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
