import type { Metadata } from "next";
import { MessageCircleMore, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Souvik Saha to discuss website development, web applications, social media management, digital marketing, or business growth.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Get In Touch"
        title="Let's build something exceptional together."
        description="Tell me about your business, the challenge, and where you want to build more momentum. I'll use that context to start a focused, high-value conversation."
      />

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#000000]">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <Reveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Direct Inquiry
              </div>
              <h2 className="mt-5 text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                A better digital presence starts with a clear brief.
              </h2>
              <p className="mt-5 text-base text-white/65 leading-relaxed">
                Whether the work is a brand-new website, an interactive 3D platform, or an ongoing marketing engine, every collaboration begins with understanding the business context and the outcome you want to create.
              </p>

              <div className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg border border-white/10 bg-white/5 grid place-items-center text-cyan-400">
                    <Mail size={16} />
                  </div>
                  <span>Available via email for direct consultations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg border border-white/10 bg-white/5 grid place-items-center text-cyan-400">
                    <Clock size={16} />
                  </div>
                  <span>Average response time: within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg border border-white/10 bg-white/5 grid place-items-center text-cyan-400">
                    <MapPin size={16} />
                  </div>
                  <span>Working globally with remote teams</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
