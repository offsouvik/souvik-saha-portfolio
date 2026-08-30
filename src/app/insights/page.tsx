import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";
import { insights } from "@/config/site";
export const metadata: Metadata = { title: "Insights", description: "Ideas and practical notes about web development, social media strategy, startup marketing, and Google visibility." };
export default function InsightsPage() { return <SiteShell><PageIntro eyebrow="Insights" title="Notes on building and growing a useful digital presence." description="Practical ideas for businesses navigating websites, digital products, social media strategy, content, promotion, and the small decisions that create a stronger presence online." /><section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1440px]"><div className="grid border-t border-[#d9d8d0] md:grid-cols-2">{insights.map((insight, index) => <Reveal key={insight.slug} delay={index * .08} className="group border-b border-[#d9d8d0] py-8 md:px-7 md:odd:border-r md:odd:pl-0 md:even:pr-0"><p className="eyebrow text-[#ca5b43]">{insight.category}</p><h2 className="display mt-12 max-w-xl text-3xl leading-[.98]">{insight.title}</h2><p className="mt-5 max-w-xl text-sm leading-6 text-[#68716b]">{insight.excerpt}</p><Link href={`/insights/${insight.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold hover:text-[#ca5b43]">Read insight <ArrowUpRight size={15} /></Link></Reveal>)}</div></div></section></SiteShell>; }
