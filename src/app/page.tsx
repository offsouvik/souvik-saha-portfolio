import { DesignWorldHero } from "@/components/home/design-world-hero";
import { HomeSections } from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <main className="bg-[#000000] text-white selection:bg-white/20 selection:text-white">
      <DesignWorldHero />
      <HomeSections />
    </main>
  );
}
