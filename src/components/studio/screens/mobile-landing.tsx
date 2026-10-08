"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Tablet,
  Layers,
  Sparkles,
  Zap,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Wifi,
  Battery,
  ShieldCheck,
  TrendingUp,
  Download,
  Star,
  Compass,
} from "lucide-react";
import Link from "next/link";

interface MobileApp {
  id: string;
  name: string;
  category: string;
  rating: string;
  downloads: string;
  tagline: string;
  accent: string;
  bgGradient: string;
  features: string[];
  mockupData: {
    title: string;
    value: string;
    change: string;
    items: { label: string; stat: string }[];
  };
}

const APPS: MobileApp[] = [
  {
    id: "pulse",
    name: "PulseFlow AI",
    category: "Fintech & Portfolio Telemetry",
    rating: "4.9 ★",
    downloads: "240K+",
    tagline: "Sub-millisecond real-time market tracking with local biometric vault encryption.",
    accent: "text-emerald-400",
    bgGradient: "from-emerald-950/40 via-black to-zinc-950",
    features: ["Biometric Secure Enclave", "Sub-16ms Gesture Physics", "Offline-first CRDT Sync", "Native iOS Widgets"],
    mockupData: {
      title: "Portfolio Valuation",
      value: "$184,290.40",
      change: "+14.8% Today",
      items: [
        { label: "Ethereum L2", stat: "$64,200 (+8.2%)" },
        { label: "Solana Liquid", stat: "$48,910 (+22.4%)" },
        { label: "Hardware Vault", stat: "$71,180 (+3.1%)" },
      ],
    },
  },
  {
    id: "aura",
    name: "Aura Creative",
    category: "Video & Computational Shaders",
    rating: "4.95 ★",
    downloads: "180K+",
    tagline: "Direct Metal & Skia GPU accelerated camera filters with HDR 10-bit export.",
    accent: "text-purple-400",
    bgGradient: "from-purple-950/40 via-black to-zinc-950",
    features: ["Metal GPU Shaders", "LUT Color Grading", "Haptic Keyframing", "Lossless ProRes 4K"],
    mockupData: {
      title: "Export Pipeline",
      value: "60 FPS Rendered",
      change: "Zero Dropped Frames",
      items: [
        { label: "Dynamic Bitrate", stat: "120 Mbps HDR" },
        { label: "Audio Stems", stat: "48kHz 24-bit" },
        { label: "Neural Grading", stat: "Apple Neural Engine" },
      ],
    },
  },
  {
    id: "hyper",
    name: "HyperTrack",
    category: "Health & Performance HUD",
    rating: "4.8 ★",
    downloads: "95K+",
    tagline: "Ultra-low power Bluetooth telemetry syncing Apple HealthKit & Wearables.",
    accent: "text-cyan-400",
    bgGradient: "from-cyan-950/40 via-black to-zinc-950",
    features: ["HealthKit Sync", "Live Activity HUD", "Ultra-low Power BLE", "Dynamic Island Alerts"],
    mockupData: {
      title: "Heart Rate Reserve",
      value: "62 BPM (Resting)",
      change: "Vo2 Max: 54.8 Top 5%",
      items: [
        { label: "Daily Strain", stat: "14.2 Optimal" },
        { label: "Recovery Score", stat: "96% Primed" },
        { label: "Active Calories", stat: "940 kcal Burned" },
      ],
    },
  },
];

export function MobileLanding() {
  const [selectedApp, setSelectedApp] = useState<MobileApp>(APPS[0]);
  const [activeTab, setActiveTab] = useState<"home" | "stats" | "vault">("home");

  return (
    <div className="flex h-full w-full flex-col bg-[#07080d] text-white overflow-y-auto font-sans selection:bg-cyan-500/30">
      {/* Top Tablet/Mobile Status Bar */}
      <div className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-[#0c0e14]/90 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Tablet size={14} /> Screen 02 // Tablet & Mobile Ecosystem Lab
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-white/60">
          <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-cyan-400 font-semibold flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
            iOS 18 & Android 15 Runtime
          </span>
          <span className="hidden sm:inline text-white/40 font-mono">Stand Display: 120Hz ProMotion</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 lg:p-12 max-w-6xl mx-auto w-full space-y-12">
        {/* Hero Section */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-cyan-950/20 via-black to-zinc-950 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <Sparkles size={12} />
              Mobile Engineering & Tactile UX
            </div>

            <h1 className="mt-6 text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Flawless Mobile Experiences at 120 FPS.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
              Crafting native and cross-platform mobile apps with fluid gesture physics, offline synchronization, and hardware-accelerated animations that delight hundreds of thousands of users.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-xs font-bold text-black transition-transform hover:scale-105 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
              >
                <span>Commission Mobile App</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition-colors"
              >
                Explore Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* Live Interactive Mobile/Tablet Device Showcase */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* App Switcher Tabs & Info (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                Select Active Ecosystem Application:
              </span>
              <span className="text-xs text-cyan-400 font-mono">Interactive Device Sandbox</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {APPS.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedApp(app)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    selectedApp.id === app.id
                      ? "border-cyan-400 bg-white/10 shadow-lg shadow-cyan-500/10"
                      : "border-white/10 bg-black/40 hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  <p className="text-xs font-bold text-white">{app.name}</p>
                  <p className="text-[10px] text-white/50 mt-1 line-clamp-1">{app.category}</p>
                  <div className="mt-3 flex items-center justify-between text-[10px]">
                    <span className={app.accent}>{app.rating}</span>
                    <span className="text-white/40">{app.downloads}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected App Detailed Card */}
            <div className="rounded-3xl border border-white/15 bg-black/60 p-6 sm:p-8 backdrop-blur-md space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${selectedApp.accent}`}>
                    {selectedApp.category}
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">{selectedApp.name}</h2>
                  <p className="text-sm text-white/70 mt-2 leading-relaxed">{selectedApp.tagline}</p>
                </div>
                <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                  {selectedApp.rating} App Store
                </div>
              </div>

              {/* Feature Pills */}
              <div className="grid gap-2.5 sm:grid-cols-2 pt-2 border-t border-white/10">
                {selectedApp.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={14} className={selectedApp.accent} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Technology Stack Badges */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-3">
                  Architecture & Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {["React Native", "SwiftUI", "Expo 52", "Metal Shaders", "Supabase", "Worklets", "TypeScript"].map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Phone/Tablet Virtual Frame (Right 5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] rounded-[42px] border-[5px] border-zinc-700 bg-black p-3.5 shadow-2xl shadow-cyan-950/30">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black border border-zinc-800 z-30 flex items-center justify-between px-2">
                <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="size-2 rounded-full bg-zinc-700" />
              </div>

              {/* Phone Inner Display */}
              <div className="relative rounded-[32px] overflow-hidden bg-[#0c0d12] border border-white/10 p-4 pt-10 min-h-[520px] flex flex-col justify-between select-none">
                {/* Phone Header Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-white/60 mb-4 px-1">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-2">
                    <Wifi size={12} />
                    <Battery size={14} className="text-emerald-400" />
                  </div>
                </div>

                {/* App Content Simulator */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedApp.id + activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 flex-1"
                  >
                    {/* Hero Widget in Phone */}
                    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${selectedApp.bgGradient} p-4`}>
                      <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                        {selectedApp.mockupData.title}
                      </span>
                      <p className="text-xl font-black text-white mt-1">{selectedApp.mockupData.value}</p>
                      <p className={`text-[11px] font-bold mt-1 ${selectedApp.accent}`}>
                        {selectedApp.mockupData.change}
                      </p>
                    </div>

                    {/* Data List in Phone */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block px-1">
                        Active Telemetry Feed
                      </span>
                      {selectedApp.mockupData.items.map((it) => (
                        <div
                          key={it.label}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-2.5 text-xs hover:bg-white/10 transition-colors"
                        >
                          <span className="text-white/70">{it.label}</span>
                          <span className="font-semibold text-white font-mono">{it.stat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Action Button */}
                    <button
                      type="button"
                      className="w-full rounded-xl bg-white/10 border border-white/15 py-2.5 text-xs font-bold text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-1.5"
                    >
                      <Zap size={13} className={selectedApp.accent} />
                      <span>Simulate Haptic Action</span>
                    </button>
                  </motion.div>
                </AnimatePresence>

                {/* Phone Bottom Navigation Bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-around text-white/50 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("home")}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                      activeTab === "home" ? "text-cyan-400 font-bold" : "hover:text-white"
                    }`}
                  >
                    <Smartphone size={15} />
                    <span>Apps</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("stats")}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                      activeTab === "stats" ? "text-cyan-400 font-bold" : "hover:text-white"
                    }`}
                  >
                    <Activity size={15} />
                    <span>Metrics</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("vault")}
                    className={`flex flex-col items-center gap-1 transition-colors ${
                      activeTab === "vault" ? "text-cyan-400 font-bold" : "hover:text-white"
                    }`}
                  >
                    <ShieldCheck size={15} />
                    <span>Security</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Performance Standards Grid */}
        <div className="grid gap-4 sm:grid-cols-4 pt-4">
          {[
            { label: "Frame Rate", value: "120 FPS", detail: "Zero hitch ProMotion animation", icon: Zap, color: "text-amber-400" },
            { label: "Cold Launch", value: "< 240ms", detail: "Optimized bytecode pre-bundling", icon: Cpu, color: "text-cyan-400" },
            { label: "Crash Free", value: "99.98%", detail: "Sentry & Datadog telemetry", icon: ShieldCheck, color: "text-emerald-400" },
            { label: "Store Reviews", value: "4.92 ★", detail: "Over 8,400 verified ratings", icon: Star, color: "text-purple-400" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between text-white/50 text-xs">
                  <span className="uppercase font-bold tracking-wider">{item.label}</span>
                  <Icon size={16} className={item.color} />
                </div>
                <p className="text-2xl font-black text-white mt-2">{item.value}</p>
                <p className="text-xs text-white/50 mt-1">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
