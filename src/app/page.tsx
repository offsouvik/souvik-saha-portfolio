import { StudioExperience } from "@/components/studio/studio-experience";
import { HomeSections } from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <main className="relative bg-[#000000] text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Primary Hero Experience: Souvik's Studio 3-Screen Interactive Portal */}
      <section className="relative h-screen w-screen overflow-hidden">
        <StudioExperience />
      </section>

      {/* Comprehensive Portfolio Narrative & Case Studies Below */}
      <HomeSections />
    </main>
  );
}
