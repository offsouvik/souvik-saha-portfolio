import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";
import { serviceGroups, services } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, web applications, backend integration, social media management, digital marketing, and business growth services by Souvik Saha.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Capabilities"
        title="Build the digital presence. Grow the business behind it."
        description="Two connected areas of expertise for startups, businesses, and growing brands: high-performance digital products, and strategic marketing that attracts the right audience."
      />

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#000000]">
        <div className="mx-auto max-w-[1440px] space-y-24">
          {serviceGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            const groupServices = services.filter((service) => service.group === group.name);
            const isBuild = group.name === "Build";

            return (
              <section key={group.name}>
                <Reveal
                  direction="up"
                  className="grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[.45fr_1.55fr] items-start"
                >
                  <div>
                    <div
                      className={`size-12 rounded-xl border grid place-items-center ${
                        isBuild
                          ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                          : "border-purple-400/20 bg-purple-400/10 text-purple-400"
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <p
                      className={`mt-4 text-xs font-bold uppercase tracking-widest ${
                        isBuild ? "text-cyan-400" : "text-purple-400"
                      }`}
                    >
                      {group.eyebrow}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                      {group.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base text-white/65 leading-relaxed">
                      {group.copy}
                    </p>
                  </div>
                </Reveal>

                <div className="divide-y divide-white/10">
                  {groupServices.map((service, index) => {
                    const ServiceIcon = service.icon;
                    return (
                      <Reveal
                        key={service.slug}
                        direction="up"
                        delay={groupIndex * 0.05 + index * 0.06}
                        className="grid gap-7 py-12 lg:grid-cols-[.35fr_.95fr_1fr_.3fr] items-start group"
                      >
                        <div>
                          <div className="size-10 rounded-lg border border-white/10 bg-white/5 grid place-items-center text-white/80 group-hover:text-cyan-400 transition-colors">
                            <ServiceIcon size={20} />
                          </div>
                          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/40">
                            {service.label}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {service.title}
                          </h3>
                          <p className="mt-3 max-w-md text-sm text-white/60 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <ul className="grid content-start gap-2.5 text-sm text-white/70">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex gap-2.5 items-center">
                              <Check
                                size={14}
                                className={`shrink-0 ${isBuild ? "text-cyan-400" : "text-purple-400"}`}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/${service.slug}`}
                          className="inline-flex size-11 items-center justify-center self-start rounded-full border border-white/15 bg-white/5 text-white transition-all group-hover:bg-cyan-400 group-hover:text-black"
                          aria-label={`Learn about ${service.title}`}
                        >
                          <ArrowUpRight size={17} />
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#040404] px-5 py-20 sm:px-8 lg:px-12">
        <Reveal direction="up" className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Engagement Model
            </div>
            <h2 className="mt-5 text-3xl sm:text-5xl font-bold text-white tracking-tight">
              The right work starts with the right side of the problem.
            </h2>
          </div>
          <p className="max-w-xl self-end text-base text-white/65 leading-relaxed">
            Some businesses need a new digital foundation. Others need more visibility around the one they already have. Many benefit from both. The scope begins with what will create the most useful momentum now.
          </p>
        </Reveal>
      </section>
    </SiteShell>
  );
}
