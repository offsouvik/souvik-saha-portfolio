"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  TrendingUp,
  Flame,
  Users,
  Eye,
  CheckCircle2,
  ArrowUpRight,
  Film,
  Sparkles,
  Share2,
} from "lucide-react";
import Link from "next/link";

export function MediaLanding() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex h-full w-full flex-col bg-[#07070a] text-white overflow-y-auto font-sans selection:bg-red-500/30">
      {/* Top Media Bar */}
      <div className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-[#0e0e14]/90 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <Film size={14} /> Screen 01 // Media Lab & Growth Engine
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-white/60">
          <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-red-400 font-semibold">
            Live Production Stream
          </span>
        </div>
      </div>

      {/* Main Landing Content */}
      <div className="p-6 lg:p-12 max-w-6xl mx-auto w-full space-y-12">
        {/* Hero Section */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-red-950/20 via-black to-zinc-950 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-red-500/15 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
              <Sparkles size={12} />
              Cinematic Storytelling & Audience Retention
            </div>

            <h1 className="mt-6 text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Content That Commands Attention & Drives Revenue.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
              From cinematic YouTube storytelling to high-retention vertical Reels and conversion-focused campaign promotion. I build media systems that turn casual viewers into loyal clients.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-xs font-bold text-white transition-transform hover:scale-105 hover:bg-red-600 shadow-lg shadow-red-500/25"
              >
                <span>Commission Media Strategy</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/social-media-management"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition-colors"
              >
                Explore Social Framework
              </Link>
            </div>
          </div>
        </div>

        {/* Live Video / Media Player Sandbox */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                Interactive Showcase Player
              </span>
              <h3 className="mt-1 text-xl font-bold text-white">
                Cinematic Visual Direction & Rhythm
              </h3>
            </div>

            {/* Audio Wave Simulator */}
            <div className="flex items-center gap-1 h-6">
              {[40, 75, 50, 90, 60, 100, 45, 80, 65, 95, 30, 85].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-red-500 transition-all duration-300"
                  style={{
                    height: isPlaying ? `${h}%` : "15%",
                    opacity: isPlaying ? 0.9 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Media Player Screen */}
          <div className="relative mt-6 aspect-video w-full rounded-2xl bg-gradient-to-br from-zinc-900 to-black overflow-hidden border border-white/10 flex items-center justify-center group">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-black" />

            {/* Visual Screen Artwork */}
            <div className="relative z-10 text-center p-6">
              <span className="inline-block rounded-full bg-red-500/20 border border-red-500/40 px-3 py-1 text-xs font-mono text-red-400 mb-4">
                4K UHD // 60 FPS // Master Grade
              </span>
              <h4 className="text-2xl sm:text-4xl font-extrabold text-white">
                &ldquo;Kalank&rdquo; &amp; High-Retention Narrative Craft
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                Studying cinematic pacing, emotional audio cues, and lighting dynamics to create digital marketing videos that hook in the first 2 seconds.
              </p>

              {/* Play Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="mt-6 inline-flex size-14 items-center justify-center rounded-full bg-white text-black hover:scale-110 hover:bg-red-500 hover:text-white transition-all shadow-xl"
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
              </button>
            </div>

            {/* Bottom Player Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono">03:42 / 05:18</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px]">
                  1080p HD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Growth Metrics */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { metric: "+380%", label: "Organic Reach Surge", detail: "Across Instagram Reels & Meta Channels", icon: TrendingUp },
            { metric: "94.2%", label: "Audience Retention", detail: "Average view duration on hero videos", icon: Eye },
            { metric: "4.8M+", label: "Total Views Delivered", detail: "Campaigns engineered across 2024-2026", icon: Flame },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="glass-card rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 uppercase tracking-wider">{item.label}</span>
                  <Icon size={16} className="text-red-400" />
                </div>
                <p className="mt-3 text-3xl font-extrabold text-white">{item.metric}</p>
                <p className="mt-1 text-xs text-white/50">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
