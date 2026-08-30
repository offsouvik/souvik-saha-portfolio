import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { Reveal } from "@/components/ui/reveal";
import { insights } from "@/config/site";
type Params = { slug: string };
export function generateStaticParams() { return insights.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> { const { slug } = await params; const insight = insights.find((entry) => entry.slug === slug); return { title: insight?.title ?? "Insight", description: insight?.excerpt }; }
export default async function InsightPage({ params }: { params: Promise<Params> }) { const { slug } = await params; const insight = insights.find((entry) => entry.slug === slug); if (!insight) notFound(); return <SiteShell><article><section className="grain px-5 pb-20 pt-36 sm:px-8 lg:px-12 lg:pt-44"><div className="mx-auto max-w-4xl"><Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-[#59645d] hover:text-[#ca5b43]"><ArrowLeft size={16} />All insights</Link><Reveal><p className="eyebrow mt-12 text-[#ca5b43]">{insight.category}</p><h1 className="display mt-6 text-balance text-5xl leading-[.94] sm:text-7xl">{insight.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#59645d]">{insight.excerpt}</p></Reveal></div></section><section className="px-5 py-20 sm:px-8 lg:px-12"><Reveal className="mx-auto max-w-2xl text-lg leading-8 text-[#59645d]">{insight.body.map((paragraph) => <p key={paragraph} className="mt-7 first:mt-0">{paragraph}</p>)}</Reveal></section></article></SiteShell>; }
