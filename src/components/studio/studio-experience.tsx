"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Monitor,
  Code2,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  Eye,
  Sliders,
  Volume2,
  VolumeX,
  Compass,
} from "lucide-react";
import Image from "next/image";
import { StudioCursor } from "./studio-cursor";
import { CodeScreen } from "./screens/code-screen";
import { DesignScreen } from "./screens/design-screen";
import { GrowthScreen } from "./screens/growth-screen";

type ScreenId = 1 | 2 | 3 | null;

export function StudioExperience() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(null);
  const [hoveredScreen, setHoveredScreen] = useState<ScreenId>(null);
  const [viewMode, setViewMode] = useState<"cinematic" | "authentic">("cinematic");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRigModal, setShowRigModal] = useState(false);
  const [showPostersModal, setShowPostersModal] = useState(false);

  // Keyboard navigation: 1, 2, 3 to enter screens, Escape to return
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "0") {
        if (showRigModal || showPostersModal) {
          setShowRigModal(false);
          setShowPostersModal(false);
        } else {
          handleExitScreen();
        }
      } else if (e.key === "1") {
        handleEnterScreen(1);
      } else if (e.key === "2") {
        handleEnterScreen(2);
      } else if (e.key === "3") {
        handleEnterScreen(3);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showRigModal, showPostersModal]);

  const handleEnterScreen = (id: ScreenId) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveScreen(id);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const handleExitScreen = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveScreen(null);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  // Compute zoom transform origin based on active screen
  const getTransformOrigin = () => {
    if (activeScreen === 1) return "21% 60%";
    if (activeScreen === 2) return "49% 59%";
    if (activeScreen === 3) return "72% 63%";
    return "50% 50%";
  };

  const getHoverLabel = () => {
    if (hoveredScreen === 1) return "DIVE INTO GROWTH ENGINE";
    if (hoveredScreen === 2) return "DIVE INTO CODE LAB";
    if (hoveredScreen === 3) return "DIVE INTO DESIGN LAB";
    return null;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#000000] text-white select-none font-sans">
      <StudioCursor label={activeScreen ? null : getHoverLabel()} />

      {/* =========================================================
          THE STUDIO DESK VIEW (ZOOMABLE CONTAINER)
      ========================================================= */}
      <motion.div
        className="relative h-full w-full"
        animate={{
          scale: activeScreen ? 3.4 : 1,
          opacity: activeScreen ? 0 : 1,
          filter: activeScreen ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformOrigin: getTransformOrigin(),
        }}
      >
        {/* Background Image: Cinematic or Raw */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={
              viewMode === "cinematic"
                ? "/images/studio-aesthetic.jpg"
                : "/images/studio-raw.jpg"
            }
            alt="Souvik's Studio"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* INTERACTIVE HOTSPOTS OVER THE 3 SCREENS */}
        {!activeScreen && (
          <div className="absolute inset-0 z-10">
            {/* SCREEN 1: Left Monitor (Growth / Media) */}
            <div
              onClick={() => handleEnterScreen(1)}
              onMouseEnter={() => setHoveredScreen(1)}
              onMouseLeave={() => setHoveredScreen(null)}
              className="absolute left-[6.2%] top-[46%] w-[29.8%] h-[31%] cursor-pointer group rounded-lg"
              title="Click to enter Screen 1: Growth Engine"
            >
              <div className="relative h-full w-full rounded-lg border-2 border-transparent group-hover:border-cyan-400 group-hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all duration-300">
                {/* HUD corner accents */}
                <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Floating Badge */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-black/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-xl whitespace-nowrap">
                  [01] Growth & Social Engine &rarr;
                </div>
              </div>
            </div>

            {/* SCREEN 2: Center Monitor (Code Lab / VS Code) */}
            <div
              onClick={() => handleEnterScreen(2)}
              onMouseEnter={() => setHoveredScreen(2)}
              onMouseLeave={() => setHoveredScreen(null)}
              className="absolute left-[36.5%] top-[46%] w-[26.8%] h-[28.5%] cursor-pointer group rounded-lg"
              title="Click to enter Screen 2: Code Lab"
            >
              <div className="relative h-full w-full rounded-lg border-2 border-transparent group-hover:border-emerald-400 group-hover:shadow-[0_0_40px_rgba(52,211,153,0.5)] transition-all duration-300">
                <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full border border-emerald-400/40 bg-black/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-xl whitespace-nowrap">
                  [02] Code Lab & Architecture &rarr;
                </div>
              </div>
            </div>

            {/* SCREEN 3: Right Laptop (Design / Motionsites) */}
            <div
              onClick={() => handleEnterScreen(3)}
              onMouseEnter={() => setHoveredScreen(3)}
              onMouseLeave={() => setHoveredScreen(null)}
              className="absolute left-[64.5%] top-[54%] w-[15%] h-[19%] cursor-pointer group rounded-lg"
              title="Click to enter Screen 3: Creative 3D Lab"
            >
              <div className="relative h-full w-full rounded-lg border-2 border-transparent group-hover:border-purple-400 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300">
                <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full border border-purple-400/40 bg-black/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-xl whitespace-nowrap">
                  [03] Design & Creative 3D &rarr;
                </div>
              </div>
            </div>

            {/* EXTRA HOTSPOT: PC Rig (Right tower) */}
            <div
              onClick={() => setShowRigModal(true)}
              className="absolute left-[79%] top-[47%] w-[17%] h-[40%] cursor-pointer group rounded-lg"
              title="Click to view PC Rig Specs"
            >
              <div className="relative h-full w-full rounded-lg border border-transparent group-hover:border-cyan-400/50 transition-all">
                <span className="absolute bottom-4 right-4 rounded-md bg-black/80 px-2 py-1 text-[10px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Rig Specs
                </span>
              </div>
            </div>

            {/* EXTRA HOTSPOT: Wall Posters */}
            <div
              onClick={() => setShowPostersModal(true)}
              className="absolute left-[30%] top-[4%] w-[40%] h-[37%] cursor-pointer group rounded-lg"
              title="Click to view Wall Art & Passions"
            >
              <div className="relative h-full w-full rounded-lg border border-transparent group-hover:border-white/30 transition-all">
                <span className="absolute top-4 right-4 rounded-md bg-black/80 px-2 py-1 text-[10px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  Art & Influences
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* =========================================================
          PLANET JUMPING STYLE STUDIO OVERLAY (WHEN IN ROOM VIEW)
      ========================================================= */}
      {!activeScreen && (
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          {/* Top Header */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-cyan-400 animate-pulse" />
              <div>
                <span className="text-sm font-bold tracking-widest uppercase text-white">
                  SOUVIK&apos;S STUDIO
                </span>
                <span className="ml-2 text-xs text-white/50 tracking-wider">
                  // TRIPLE MONITOR STATION
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setViewMode(viewMode === "cinematic" ? "authentic" : "cinematic")
                }
                className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
              >
                <Sliders size={13} />
                <span>
                  {viewMode === "cinematic" ? "Cinematic Render" : "Real Room Photo"}
                </span>
              </button>
            </div>
          </div>

          {/* Left Screen Selector HUD (Inspired by Planet List) */}
          <div className="pointer-events-auto hidden md:flex flex-col gap-3 max-w-xs self-start my-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
              Interactive Displays
            </span>

            {[
              { id: 1 as ScreenId, name: "Growth Engine", num: "[01]", tag: "Social & Meta" },
              { id: 2 as ScreenId, name: "The Code Lab", num: "[02]", tag: "Next.js & WebGL" },
              { id: 3 as ScreenId, name: "Design & Motion", num: "[03]", tag: "Creative 3D" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleEnterScreen(s.id)}
                onMouseEnter={() => setHoveredScreen(s.id)}
                onMouseLeave={() => setHoveredScreen(null)}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-3 text-left transition-all hover:border-cyan-400 hover:bg-black/80 backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5">
                  <span className="size-2 rounded-full bg-white/40 group-hover:bg-cyan-400 transition-colors" />
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {s.name}
                    </p>
                    <p className="text-[10px] text-white/40">{s.tag}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-white/30 group-hover:text-cyan-400">
                  {s.num} &rarr;
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Bar: Giant Title & Station Stats */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Click any screen to enter the computer
                </p>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("dual-engine")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="pointer-events-auto inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors underline underline-offset-4"
                >
                  <span>or scroll down for overview ↓</span>
                </button>
              </div>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none">
                THE STUDIO
              </h1>
            </div>

            {/* Station Facts (Planet Jumping Fact Table) */}
            <div className="rounded-2xl border border-white/15 bg-black/60 p-5 text-xs backdrop-blur-md max-w-sm w-full divide-y divide-white/10 pointer-events-auto">
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Primary Displays</span>
                <span className="font-semibold text-white">3 Active Monitors</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Specialization</span>
                <span className="font-semibold text-white">Engineering + Growth</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Primary Rig</span>
                <span className="font-semibold text-white">Ryzen 9 • RTX 4080</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Availability</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready for Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          FULL-SCREEN COMPUTER OPERATING ENVIRONMENT (WHEN ZOOMED IN)
      ========================================================= */}
      <AnimatePresence>
        {activeScreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[#080808]"
          >
            {/* Top Navigation Bar: Back to Studio & Screen Switcher */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/15 bg-black/90 px-6 backdrop-blur-xl">
              <button
                type="button"
                onClick={handleExitScreen}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Studio (Esc)</span>
              </button>

              {/* Quick Screen Switcher */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveScreen(1)}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    activeScreen === 1
                      ? "bg-purple-500 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  [01] Growth Engine
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreen(2)}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    activeScreen === 2
                      ? "bg-cyan-500 text-black font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  [02] Code Lab
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreen(3)}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    activeScreen === 3
                      ? "bg-blue-600 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  [03] Design Lab
                </button>
              </div>

              <span className="hidden sm:inline text-xs text-white/40 font-mono">
                Press [1], [2], [3] to switch • [Esc] to exit
              </span>
            </div>

            {/* Active Workspace Container */}
            <div className="flex-1 overflow-hidden">
              {activeScreen === 1 && <GrowthScreen />}
              {activeScreen === 2 && <CodeScreen />}
              {activeScreen === 3 && <DesignScreen />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          RIG SPECS MODAL
      ========================================================= */}
      <AnimatePresence>
        {showRigModal && (
          <div
            onClick={() => setShowRigModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-md rounded-3xl p-8 border border-white/20 text-white"
            >
              <div className="flex items-center gap-3 text-cyan-400">
                <Cpu size={24} />
                <h3 className="text-xl font-bold">Souvik&apos;s Battle Station</h3>
              </div>
              <p className="mt-2 text-xs text-white/60">
                Hardware engineered for high-throughput development, 3D WebGL rendering, and video editing.
              </p>

              <div className="mt-6 space-y-3 text-xs divide-y divide-white/10">
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Processor</span>
                  <span className="font-mono font-bold text-white">AMD Ryzen 9 7950X</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Graphics Card</span>
                  <span className="font-mono font-bold text-cyan-400">NVIDIA RTX 4080 16GB</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Memory</span>
                  <span className="font-mono font-bold text-white">64 GB DDR5 6000MHz</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Cooling</span>
                  <span className="font-mono font-bold text-white">Custom Liquid Cooled Loop</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/50">Displays</span>
                  <span className="font-mono font-bold text-white">Triple Screen Ergonomic Array</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowRigModal(false)}
                className="mt-6 w-full rounded-full bg-white py-3 text-xs font-bold text-black hover:bg-cyan-400 transition-colors"
              >
                Close (Esc)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          POSTERS / INFLUENCES MODAL
      ========================================================= */}
      <AnimatePresence>
        {showPostersModal && (
          <div
            onClick={() => setShowPostersModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-md rounded-3xl p-8 border border-white/20 text-white"
            >
              <div className="flex items-center gap-3 text-purple-400">
                <Sparkles size={24} />
                <h3 className="text-xl font-bold">Studio Wall & Influences</h3>
              </div>
              <p className="mt-2 text-xs text-white/60">
                The visual culture on Souvik&apos;s walls: Automotive engineering, precision aerodynamics, and relentless speed.
              </p>

              <div className="mt-6 space-y-2.5 text-xs">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-bold text-white">Automotive Precision (Porsche & Ferrari)</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Form following function with aerodynamic clarity.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-bold text-white">Seven Galloping Horses</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Symbol of unstoppable forward momentum and focus.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-bold text-white">Spider-Man & Graphic Art</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Creative storytelling and iconic visual impact.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPostersModal(false)}
                className="mt-6 w-full rounded-full bg-white py-3 text-xs font-bold text-black hover:bg-cyan-400 transition-colors"
              >
                Close (Esc)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
