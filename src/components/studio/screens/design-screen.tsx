"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Maximize2,
  Layers,
  Eye,
  Compass,
  Zap,
  Globe2,
  Box,
  Monitor,
} from "lucide-react";
import Link from "next/link";

export function DesignScreen() {
  const [selectedDemo, setSelectedDemo] = useState<number>(0);

  const projects = [
    {
      id: "wisa",
      badge: "CREATIVE 3D EXPERIENCE",
      title: "WISA — Championing The Pitch Of Legends",
      subtitle: "Advanced digital portal and interactive 3D stadium experience for world-class sporting teams.",
      stats: "WebGL • 120 FPS • Custom Shaders",
      tags: ["Creative Direction", "3D Architecture", "Interactive WebGL", "Motion"],
      gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
      borderGlow: "border-orange-500/30",
    },
    {
      id: "design-world",
      badge: "CHROMATIC GLASS REFRACTION",
      title: "Design World — Explore New Ideas",
      subtitle: "Rotatable 3D rounded cuboid with 6-band chromatic dispersion and dual-pass screen-space refraction.",
      stats: "Three.js r169 • GLSL • Math Physics",
      tags: ["Optical Physics", "Shader Programming", "Quaternion Inertia"],
      gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
      borderGlow: "border-cyan-500/30",
    },
    {
      id: "ai-workers",
      badge: "DYNAMIC PRODUCT SUITE",
      title: "Autonomous Agents — Intelligence In Motion",
      subtitle: "Fluid generative interfaces that adapt dynamically to user intent and complex data flows.",
      stats: "React 19 • Next.js 16 • Turbopack",
      tags: ["Generative UI", "Framer Motion", "Real-Time Sync"],
      gradient: "from-purple-500/20 via-pink-600/10 to-transparent",
      borderGlow: "border-purple-500/30",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#050508] text-white overflow-hidden font-sans">
      {/* Top Browser Bar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-[#0a0a0f] px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-white/60">
            <Globe2 size={12} className="text-cyan-400" />
            <span>motionsites.ai / souvik-studio-showcase</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-white/70">
          <span className="text-cyan-400 flex items-center gap-1.5">
            <Zap size={13} /> Creative Lab
          </span>
          <span className="text-white/40">ASUS ROG Display</span>
        </div>
      </div>

      {/* Main Showcase Feed */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
        {/* Hero Section Banner (Motionsites Style) */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-8 sm:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <Sparkles size={13} />
              Interactive Motion Systems
            </div>
            <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Championing The Art Of Creative Code.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
              Every interface I design bridges the gap between raw technological capability and emotional design craft. High framerate WebGL 3D, physics-driven animations, and silky interactions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-black transition-transform hover:scale-105 hover:bg-cyan-400"
              >
                <span>Launch Interactive Demos</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Live Project Cards Deck */}
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => setSelectedDemo(idx)}
              className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 cursor-pointer ${
                selectedDemo === idx
                  ? `${proj.borderGlow} bg-white/[0.08] shadow-[0_0_35px_-5px_rgba(56,189,248,0.25)]`
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  {proj.badge}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  {proj.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span className="text-[11px] font-mono text-cyan-400/90">{proj.stats}</span>
                <div className="size-7 rounded-full border border-white/15 bg-white/5 grid place-items-center text-white group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-t border-white/10 bg-[#0a0a0f] px-4 text-xs text-white/50">
        <span>Display Mode: 2560x1440 @ 165Hz</span>
        <Link href="/web-applications" className="text-cyan-400 hover:underline">
          Explore Product Portals &rarr;
        </Link>
      </div>
    </div>
  );
}
