"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Film,
  Tablet,
  Code2,
  Sparkles,
  Cpu,
  Layers,
  Eye,
  Sliders,
  Volume2,
  VolumeX,
  Compass,
  Monitor,
  ExternalLink,
  X,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { StudioCursor } from "./studio-cursor";
import { MediaLanding } from "./screens/media-landing";
import { MobileLanding } from "./screens/mobile-landing";
import { CodeScreen } from "./screens/code-screen";
import { DesignScreen } from "./screens/design-screen";

export type ScreenId = 1 | 2 | 3 | 4 | null;

// Sound synthesizer via Web Audio API (zero external files required)
function playSound(freq = 520, type: OscillatorType = "sine", duration = 0.08) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export function StudioExperience() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(null);
  const [hoveredScreen, setHoveredScreen] = useState<ScreenId>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRigModal, setShowRigModal] = useState(false);
  const [showPostersModal, setShowPostersModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio trigger
  const triggerAudio = useCallback(
    (freq = 440, type: OscillatorType = "sine") => {
      if (soundEnabled) playSound(freq, type);
    },
    [soundEnabled]
  );

  // Screen enter handler
  const handleEnterScreen = useCallback(
    (id: ScreenId) => {
      if (isTransitioning || activeScreen === id) return;
      setIsTransitioning(true);
      triggerAudio(580, "triangle");
      setActiveScreen(id);
      setTimeout(() => setIsTransitioning(false), 850);
    },
    [isTransitioning, activeScreen, triggerAudio]
  );

  // Screen exit handler
  const handleExitScreen = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    triggerAudio(360, "sine");
    setActiveScreen(null);
    setTimeout(() => setIsTransitioning(false), 850);
  }, [isTransitioning, triggerAudio]);

  // Keyboard navigation: 1, 2, 3, 4 to enter/switch screens, Escape to return
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
      } else if (e.key === "4") {
        handleEnterScreen(4);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showRigModal, showPostersModal, handleEnterScreen, handleExitScreen]);

  // Compute zoom transform origin based on active screen
  const getTransformOrigin = () => {
    if (activeScreen === 1) return "17.7% 68.7%"; // Left Monitor
    if (activeScreen === 2) return "24.9% 82.8%"; // Tablet on stand
    if (activeScreen === 3) return "46.7% 65.2%"; // Center Big Monitor
    if (activeScreen === 4) return "70.7% 65.3%"; // Right ASUS Laptop
    return "50% 50%";
  };

  const getHoverLabel = () => {
    if (hoveredScreen === 1) return "DIVE INTO MEDIA LAB";
    if (hoveredScreen === 2) return "DIVE INTO MOBILE APPS";
    if (hoveredScreen === 3) return "DIVE INTO CODE LAB";
    if (hoveredScreen === 4) return "DIVE INTO CREATIVE 3D";
    return null;
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050608] text-white select-none font-sans">
      <StudioCursor label={activeScreen ? null : getHoverLabel()} />

      {/* Ambient background blur of the real studio for seamless widescreen presentation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/studio-real.jpg"
          alt="Ambient Studio Glow"
          fill
          priority
          className="object-cover scale-110 blur-3xl opacity-20 filter"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      {/* =========================================================
          THE STUDIO DESK VIEW (ZOOMABLE STAGE)
      ========================================================= */}
      <div className="relative h-full w-full flex items-center justify-center">
        <motion.div
          className="relative aspect-[1024/768] w-full h-full max-w-[calc(100vh*1024/768)] max-h-[calc(100vw*768/1024)] mx-auto shadow-2xl"
          animate={{
            scale: activeScreen ? 3.6 : 1,
            opacity: activeScreen ? 0 : 1,
            filter: activeScreen ? "blur(10px)" : "blur(0px)",
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: getTransformOrigin(),
          }}
        >
          {/* Authentic Real Studio Photo Background */}
          <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg">
            <Image
              src="/images/studio-real.jpg"
              alt="Souvik's Real 4-Screen Studio"
              fill
              priority
              quality={95}
              className="object-contain object-center"
            />

            {/* Subtle cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
          </div>

          {/* =========================================================
              LIVE DYNAMIC CONTENT RUNNING INSIDE THE 4 SCREENS
          ========================================================= */}
          {!activeScreen && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* SCREEN 1: Left Monitor Live Dynamic Video Preview */}
              <div
                className="absolute overflow-hidden rounded-[3px] bg-[#0c0d12]/95 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.25)] flex flex-col justify-between p-1 text-[7px]"
                style={{
                  left: "3.7%",
                  top: "58.3%",
                  width: "28.1%",
                  height: "20.8%",
                }}
              >
                {/* Mini YouTube bar */}
                <div className="flex items-center justify-between text-white/70 border-b border-white/10 pb-0.5">
                  <div className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-red-400">YouTube Studio</span>
                  </div>
                  <span className="text-[6px] text-white/50">4K Master • 60 FPS</span>
                </div>

                {/* Animated Spectrum & Video Info */}
                <div className="my-auto text-center px-1">
                  <p className="font-bold text-white text-[7.5px] truncate">
                    Kalank Title Track // Cinematic Narrative
                  </p>
                  <p className="text-[6px] text-white/50">4.8M Views • 94.2% Audience Retention</p>

                  {/* Audio Visualizer Waves */}
                  <div className="flex items-center justify-center gap-0.5 mt-1 h-3">
                    {[35, 75, 45, 90, 60, 100, 50, 80, 65, 95, 40, 85, 55, 70].map((h, idx) => (
                      <motion.div
                        key={idx}
                        className="w-[2px] rounded-full bg-red-500"
                        animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                        transition={{
                          duration: 0.8 + (idx % 3) * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Scrubber Timeline */}
                <div className="w-full bg-white/10 h-0.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-red-500 h-full"
                    animate={{ width: ["15%", "85%", "35%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              {/* SCREEN 2: Tablet on Stand Live Dynamic Mobile UI */}
              <div
                className="absolute overflow-hidden rounded-[4px] bg-[#08090f]/95 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)] flex flex-col justify-between p-1 text-[6.5px]"
                style={{
                  left: "16.8%",
                  top: "74.8%",
                  width: "16.2%",
                  height: "16.0%",
                }}
              >
                {/* Tablet Status Bar */}
                <div className="flex items-center justify-between text-white/60 border-b border-white/10 pb-0.5">
                  <span className="font-bold text-cyan-400">15:58</span>
                  <span className="text-[5.5px] text-emerald-400">98% ⚡</span>
                </div>

                {/* Live App Widget Preview */}
                <div className="my-auto space-y-0.5 px-0.5">
                  <div className="flex items-center justify-between rounded bg-white/5 px-1 py-0.5">
                    <span className="font-semibold text-white truncate">PulseFlow AI</span>
                    <span className="text-emerald-400 font-mono text-[6px]">+$184K</span>
                  </div>

                  {/* App Grid Icons */}
                  <div className="grid grid-cols-4 gap-0.5 pt-0.5">
                    {[
                      { bg: "bg-cyan-500", label: "Pulse" },
                      { bg: "bg-purple-500", label: "Aura" },
                      { bg: "bg-emerald-500", label: "Track" },
                      { bg: "bg-amber-500", label: "Vault" },
                    ].map((app) => (
                      <div key={app.label} className="flex flex-col items-center">
                        <div className={`size-2.5 rounded-sm ${app.bg} shadow-sm animate-pulse`} />
                        <span className="text-[5px] text-white/40">{app.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* iOS Dock */}
                <div className="mx-auto rounded-full bg-white/10 px-2 py-0.5 flex gap-1">
                  <span className="size-1 rounded-full bg-cyan-400" />
                  <span className="size-1 rounded-full bg-white/40" />
                  <span className="size-1 rounded-full bg-white/40" />
                </div>
              </div>

              {/* SCREEN 3: Center Wide Monitor Live VS Code Environment */}
              <div
                className="absolute overflow-hidden rounded-[3px] bg-[#0c1017]/95 border border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.2)] flex flex-col justify-between p-1.5 font-mono text-[7px]"
                style={{
                  left: "32.6%",
                  top: "54.0%",
                  width: "28.2%",
                  height: "22.4%",
                }}
              >
                {/* VS Code Tab Bar */}
                <div className="flex items-center justify-between border-b border-[#21262d] pb-0.5 text-white/70">
                  <div className="flex items-center gap-1">
                    <span className="text-cyan-400 font-bold">TS</span>
                    <span className="text-white text-[7px]">3d-engine.ts</span>
                  </div>
                  <div className="flex items-center gap-1 text-[6px] text-emerald-400">
                    <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Next.js 16 Active</span>
                  </div>
                </div>

                {/* Live Code Lines */}
                <div className="my-auto space-y-0.5 text-[6.5px] leading-tight text-white/80">
                  <p className="text-purple-400">import &#123; Engine &#125; from &apos;@/core/webgl&apos;;</p>
                  <p className="text-cyan-400">
                    export const <span className="text-amber-300">studio</span> = new Engine(&#123;
                  </p>
                  <p className="pl-2 text-emerald-300">fps: 120, refraction: 0.94,</p>
                  <p className="pl-2 text-white/60">screens: [&apos;Media&apos;, &apos;Mobile&apos;, &apos;Code&apos;, &apos;3D&apos;]</p>
                  <p className="text-cyan-400">&#125;);<span className="animate-ping font-bold text-cyan-300">|</span></p>
                </div>

                {/* Terminal Footer */}
                <div className="border-t border-[#21262d] pt-0.5 flex items-center justify-between text-[6px] text-white/50">
                  <span className="text-emerald-400">✓ Ready in 140ms (Turbopack)</span>
                  <span>git: main*</span>
                </div>
              </div>

              {/* SCREEN 4: Right ASUS Gaming Laptop Live Creative 3D Lab */}
              <div
                className="absolute overflow-hidden rounded-[3px] bg-[#0a0a10]/95 border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.25)] flex flex-col justify-between p-1 text-[6.5px]"
                style={{
                  left: "61.3%",
                  top: "56.6%",
                  width: "18.9%",
                  height: "17.4%",
                }}
              >
                {/* MotionSites Header */}
                <div className="flex items-center justify-between text-white/70 border-b border-white/10 pb-0.5">
                  <span className="font-bold text-purple-400 truncate">motionsites.ai</span>
                  <span className="text-[5.5px] font-mono text-cyan-400">144 FPS</span>
                </div>

                {/* 3D Wireframe / Card Graphic */}
                <div className="my-auto text-center px-0.5">
                  <span className="inline-block text-[5.5px] font-bold uppercase tracking-wider text-purple-300">
                    WISA Pitch of Legends
                  </span>
                  <div className="mt-0.5 mx-auto size-5 rounded border border-purple-400/40 bg-purple-500/10 flex items-center justify-center">
                    <motion.div
                      className="size-3 border border-cyan-400 rounded-sm"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <p className="text-[5.5px] text-white/50 mt-0.5">Chromatic WebGL Shaders</p>
                </div>

                {/* Laptop Keyboard Glow Simulation */}
                <div className="border-t border-white/10 pt-0.5 flex justify-between text-[5.5px] text-white/40">
                  <span>ASUS ROG</span>
                  <span className="text-purple-400 font-semibold">Ready</span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              INTERACTIVE HOTSPOTS & HOVER BEZELS OVER THE 4 SCREENS
          ========================================================= */}
          {!activeScreen && (
            <div className="absolute inset-0 z-20">
              {/* SCREEN 1: Left Acer Monitor Hotspot */}
              <div
                onClick={() => handleEnterScreen(1)}
                onMouseEnter={() => {
                  setHoveredScreen(1);
                  triggerAudio(440, "sine");
                }}
                onMouseLeave={() => setHoveredScreen(null)}
                className="absolute cursor-pointer group rounded-lg"
                style={{
                  left: "3.7%",
                  top: "58.3%",
                  width: "28.1%",
                  height: "20.8%",
                }}
                title="Click to enter Screen 1: Media Production & Growth Lab"
              >
                <div className="relative h-full w-full rounded-lg border-2 border-transparent group-hover:border-red-500 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300">
                  <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Floating Pill Label */}
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-red-500/40 bg-black/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-2xl whitespace-nowrap z-30">
                    [01] MEDIA &amp; GROWTH LAB &rarr;
                  </div>
                </div>
              </div>

              {/* SCREEN 2: Tablet on Stand Hotspot (Higher z-index) */}
              <div
                onClick={() => handleEnterScreen(2)}
                onMouseEnter={() => {
                  setHoveredScreen(2);
                  triggerAudio(520, "sine");
                }}
                onMouseLeave={() => setHoveredScreen(null)}
                className="absolute cursor-pointer group rounded-lg z-30"
                style={{
                  left: "16.8%",
                  top: "74.8%",
                  width: "16.2%",
                  height: "16.0%",
                }}
                title="Click to enter Screen 2: Mobile Ecosystem & Tablet Apps"
              >
                <div className="relative h-full w-full rounded-lg border-2 border-transparent group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300">
                  <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-black/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-2xl whitespace-nowrap z-30">
                    [02] MOBILE APP LAB &rarr;
                  </div>
                </div>
              </div>

              {/* SCREEN 3: Center Wide Monitor Hotspot */}
              <div
                onClick={() => handleEnterScreen(3)}
                onMouseEnter={() => {
                  setHoveredScreen(3);
                  triggerAudio(600, "sine");
                }}
                onMouseLeave={() => setHoveredScreen(null)}
                className="absolute cursor-pointer group rounded-lg"
                style={{
                  left: "32.6%",
                  top: "54.0%",
                  width: "28.2%",
                  height: "22.4%",
                }}
                title="Click to enter Screen 3: Full-Stack Code Lab & Architecture"
              >
                <div className="relative h-full w-full rounded-lg border-2 border-transparent group-hover:border-emerald-400 group-hover:shadow-[0_0_35px_rgba(52,211,153,0.5)] transition-all duration-300">
                  <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-emerald-400/40 bg-black/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-2xl whitespace-nowrap z-30">
                    [03] FULL-STACK CODE LAB &rarr;
                  </div>
                </div>
              </div>

              {/* SCREEN 4: Right ASUS Gaming Laptop Hotspot */}
              <div
                onClick={() => handleEnterScreen(4)}
                onMouseEnter={() => {
                  setHoveredScreen(4);
                  triggerAudio(680, "sine");
                }}
                onMouseLeave={() => setHoveredScreen(null)}
                className="absolute cursor-pointer group rounded-lg"
                style={{
                  left: "61.3%",
                  top: "56.6%",
                  width: "18.9%",
                  height: "17.4%",
                }}
                title="Click to enter Screen 4: Creative 3D Agency & MotionSites Lab"
              >
                <div className="relative h-full w-full rounded-lg border-2 border-transparent group-hover:border-purple-400 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300">
                  <div className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-purple-400/40 bg-black/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 shadow-2xl whitespace-nowrap z-30">
                    [04] CREATIVE 3D LAB &rarr;
                  </div>
                </div>
              </div>

              {/* EXTRA HOTSPOT: Wall Art Posters (Porsche, Marlboro, Spiderman, 7 Horses) */}
              <div
                onClick={() => {
                  triggerAudio(500, "triangle");
                  setShowPostersModal(true);
                }}
                className="absolute cursor-pointer group rounded-lg"
                style={{
                  left: "31.2%",
                  top: "2.0%",
                  width: "39.0%",
                  height: "56.0%",
                }}
                title="Click to view Wall Art &amp; Inspirations (Porsche, Marlboro, Spider-Man, 7 Horses)"
              >
                <div className="relative h-full w-full rounded-lg border border-transparent group-hover:border-white/40 group-hover:bg-white/[0.03] transition-all">
                  <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/80 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    Wall Art &amp; Passions &rarr;
                  </span>
                </div>
              </div>

              {/* EXTRA HOTSPOT: PC Gaming Rig */}
              <div
                onClick={() => {
                  triggerAudio(500, "triangle");
                  setShowRigModal(true);
                }}
                className="absolute cursor-pointer group rounded-lg"
                style={{
                  left: "73.0%",
                  top: "52.0%",
                  width: "24.0%",
                  height: "36.0%",
                }}
                title="Click to view PC Gaming Rig Specs (Ryzen 9, RTX 4080)"
              >
                <div className="relative h-full w-full rounded-lg border border-transparent group-hover:border-cyan-400/50 group-hover:bg-cyan-500/[0.03] transition-all">
                  <span className="absolute bottom-4 right-4 rounded-full border border-cyan-400/30 bg-black/80 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    PC Rig Specs &rarr;
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* =========================================================
          STUDIO HUD OVERLAY (WHEN IN ROOM VIEW)
      ========================================================= */}
      {!activeScreen && (
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-10">
          {/* Top HUD Header */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-white">
                  SOUVIK&apos;S WORKSPACE STUDIO
                </span>
                <span className="ml-2 text-[11px] text-white/50 tracking-wider hidden sm:inline">
                  // 4-SCREEN DYNAMIC COMMAND CENTER
                </span>
              </div>
            </div>

            {/* Audio & Hint Bar */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1.5 text-xs text-white/70 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-cyan-400" />
                <span>Click any screen to dive in • Keys 1–4 active</span>
              </div>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 p-2 sm:px-3 sm:py-1.5 text-xs text-white/80 hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                title={soundEnabled ? "Mute Studio Feedback" : "Enable Studio Feedback"}
              >
                {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span className="hidden sm:inline">{soundEnabled ? "Audio On" : "Muted"}</span>
              </button>
            </div>
          </div>

          {/* Left Screen Quick Switcher Pill List */}
          <div className="pointer-events-auto hidden md:flex flex-col gap-2.5 max-w-xs self-start my-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
              Interactive Display Nodes
            </span>

            {[
              { id: 1 as ScreenId, name: "Media & Growth Lab", num: "[01]", tag: "YouTube & Video Strategy", color: "hover:border-red-500", text: "text-red-400" },
              { id: 2 as ScreenId, name: "Mobile App Lab", num: "[02]", tag: "Tablet & Phone Ecosystem", color: "hover:border-cyan-400", text: "text-cyan-400" },
              { id: 3 as ScreenId, name: "Full-Stack Code Lab", num: "[03]", tag: "VS Code • Next.js • WebGL", color: "hover:border-emerald-400", text: "text-emerald-400" },
              { id: 4 as ScreenId, name: "Creative 3D Agency", num: "[04]", tag: "MotionSites • WISA Stadium", color: "hover:border-purple-400", text: "text-purple-400" },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleEnterScreen(s.id)}
                onMouseEnter={() => setHoveredScreen(s.id)}
                onMouseLeave={() => setHoveredScreen(null)}
                className={`group flex items-center justify-between rounded-xl border border-white/10 bg-black/60 p-2.5 text-left transition-all backdrop-blur-md ${s.color} hover:bg-black/90`}
              >
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                  <div>
                    <p className={`text-xs font-bold text-white group-hover:${s.text} transition-colors`}>
                      {s.name}
                    </p>
                    <p className="text-[10px] text-white/40">{s.tag}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-white/30 group-hover:text-white">
                  {s.num} &rarr;
                </span>
              </button>
            ))}
          </div>

          {/* Bottom HUD: Title & Station Stats */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-auto">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
                4-Screen Physical Workspace
              </p>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                THE STUDIO
              </h1>
              <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg">
                Explore the actual machines and displays where engineering systems, creative WebGL experiences, and audience media are designed.
              </p>
            </div>

            {/* Quick Status Box */}
            <div className="rounded-2xl border border-white/15 bg-black/70 p-4 text-xs backdrop-blur-md max-w-xs w-full divide-y divide-white/10">
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Active Displays</span>
                <span className="font-semibold text-white">4 Screens Live</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Primary Architecture</span>
                <span className="font-semibold text-white">Full-Stack + 3D Creative</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Workstation Rig</span>
                <span className="font-semibold text-white">Ryzen 9 • RTX 4080</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/50">Availability</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready For Contracts
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
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[#07080b]"
          >
            {/* Top Navigation Bar: Back to Studio & 4-Screen Switcher */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/15 bg-[#0a0c10]/95 px-6 backdrop-blur-xl">
              <button
                type="button"
                onClick={handleExitScreen}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white hover:text-black transition-all shadow-md"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Studio (Esc)</span>
              </button>

              {/* 4-Screen Switcher Pills */}
              <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/15 bg-white/5 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    triggerAudio(440);
                    setActiveScreen(1);
                  }}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    activeScreen === 1
                      ? "bg-red-500 text-white font-bold shadow-md shadow-red-500/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  [01] Media
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerAudio(520);
                    setActiveScreen(2);
                  }}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    activeScreen === 2
                      ? "bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  [02] Mobile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerAudio(600);
                    setActiveScreen(3);
                  }}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    activeScreen === 3
                      ? "bg-emerald-400 text-black font-bold shadow-md shadow-emerald-400/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  [03] Code
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerAudio(680);
                    setActiveScreen(4);
                  }}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    activeScreen === 4
                      ? "bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  [04] Creative
                </button>
              </div>

              <span className="hidden sm:inline text-xs text-white/40 font-mono">
                Press [1] [2] [3] [4] to switch • [Esc] to exit
              </span>
            </div>

            {/* Active Workspace Landing Page Container */}
            <div className="flex-1 overflow-hidden">
              {activeScreen === 1 && <MediaLanding />}
              {activeScreen === 2 && <MobileLanding />}
              {activeScreen === 3 && <CodeScreen />}
              {activeScreen === 4 && <DesignScreen />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MODAL: WALL POSTERS CLOSEUP (PORSCHE, MARLBORO, SPIDERMAN, 7 HORSES)
      ========================================================= */}
      <AnimatePresence>
        {showPostersModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setShowPostersModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full rounded-3xl border border-white/20 bg-[#0c0d12] p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowPostersModal(false)}
                className="absolute top-5 right-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white hover:text-black transition-colors z-10"
              >
                <X size={16} />
              </button>

              <div className="grid gap-6 md:grid-cols-2 items-center">
                {/* Poster Photo Closeup */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 bg-black">
                  <Image
                    src="/images/posters-closeup.jpg"
                    alt="Wall Posters Closeup"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Cultural & Philosophical Breakdown */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Studio Wall Art &amp; Creative Drivers
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      Philosophy &amp; Visual Influences
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs text-white/80 max-h-72 overflow-y-auto pr-2 divide-y divide-white/10">
                    <div className="pt-2">
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-amber-400" />
                        7 Running Horses (Top Right)
                      </p>
                      <p className="text-white/60 text-[11px] mt-0.5">
                        Symbol of relentless speed, momentum, and perpetual progress in Eastern philosophy.
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-red-400" />
                        Marlboro &ldquo;You&apos;re going to die anyway&rdquo; (Center)
                      </p>
                      <p className="text-white/60 text-[11px] mt-0.5">
                        Classic memento mori. A reminder to build ambitiously and take bold creative risks without hesitation.
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-red-500" />
                        Spider-Man Tribute (Right)
                      </p>
                      <p className="text-white/60 text-[11px] mt-0.5">
                        Stan Lee&apos;s timeless principle: &ldquo;With great power comes great responsibility&rdquo; applied to software architecture.
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-yellow-400" />
                        Porsche 911 GT3 (Bottom)
                      </p>
                      <p className="text-white/60 text-[11px] mt-0.5">
                        Pinnacle of German automotive engineering, aerodynamics, and zero-compromise precision.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MODAL: PC RIG SPECS & HARDWARE BENCHMARKS
      ========================================================= */}
      <AnimatePresence>
        {showRigModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setShowRigModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full rounded-3xl border border-white/20 bg-[#0c0d12] p-6 sm:p-8 text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowRigModal(false)}
                className="absolute top-5 right-5 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white hover:text-black transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Custom Workstation Rig
                  </span>
                  <h3 className="text-2xl font-black text-white">Hardware Specifications</h3>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                {[
                  { component: "Processor (CPU)", spec: "AMD Ryzen 9 7950X (32 Threads @ 5.7GHz)" },
                  { component: "Graphics (GPU)", spec: "NVIDIA GeForce RTX 4080 16GB GDDR6X" },
                  { component: "Memory (RAM)", spec: "64GB DDR5 6000MHz CL30 Corsair Dominator" },
                  { component: "Storage", spec: "4TB Samsung 990 Pro NVMe PCIe 4.0 (7,450 MB/s)" },
                  { component: "Displays Matrix", spec: "4 Active Displays (4K UHD + 165Hz IPS + iPad Pro)" },
                  { component: "OS Environments", spec: "Ubuntu 24.04 LTS (WSL2) + Windows 11 Pro" },
                ].map((hw) => (
                  <div key={hw.component} className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                      {hw.component}
                    </span>
                    <p className="font-semibold text-white mt-1 text-xs">{hw.spec}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
