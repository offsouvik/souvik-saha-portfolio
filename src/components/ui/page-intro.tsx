import { Reveal } from "@/components/ui/reveal";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pt-44 border-b border-white/10 bg-[#000000] text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/3 size-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <Reveal direction="up" className="relative mx-auto max-w-[1440px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
          <span className="size-1.5 rounded-full bg-cyan-400" />
          {eyebrow}
        </div>
        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white leading-tight">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-white/65 leading-relaxed">
          {description}
        </p>
      </Reveal>
    </section>
  );
}
