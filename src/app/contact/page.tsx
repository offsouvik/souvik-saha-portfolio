import type { Metadata } from "next";
import { MessageCircleMore } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";
export const metadata: Metadata = { title: "Contact", description: "Contact Souvik Saha to discuss website development, web applications, social media management, digital marketing, or business growth." };
export default function ContactPage() { return <SiteShell><PageIntro eyebrow="Contact" title="Let&apos;s talk about what your business needs next." description="Tell me about the business, the challenge, and where you want to build more momentum. I&apos;ll use that context to start a more useful conversation." /><section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.7fr_1.3fr]"><Reveal><p className="eyebrow text-[#ca5b43]">Start here</p><h2 className="display mt-5 max-w-md text-5xl leading-[.95]">A better digital presence starts with a clear brief.</h2><div className="mt-10 border-t border-[#d9d8d0] pt-6"><MessageCircleMore size={19} strokeWidth={1.4} className="text-[#ca5b43]" /><p className="mt-5 text-sm leading-6 text-[#68716b]">Whether the work is a website, application, social presence, or campaign, the first conversation starts with the business context and the outcome you want to create.</p></div></Reveal><Reveal delay={.1}><ContactForm /></Reveal></div></section></SiteShell>; }
