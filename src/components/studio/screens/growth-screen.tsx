"use client";

import { useState } from "react";
import {
  TrendingUp,
  Share2,
  Instagram,
  Search,
  Users,
  Target,
  BarChart3,
  ArrowUpRight,
  Sparkles,
  Flame,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export function GrowthScreen() {
  const [activeMetricTab, setActiveMetricTab] = useState<"overview" | "content" | "campaigns">("overview");

  return (
    <div className="flex h-full w-full flex-col bg-[#07090e] text-white overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-[#0e121a] px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-semibold text-white/70">
            Growth Command Center // Analytics & Content Architecture
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-0.5 text-emerald-400 font-bold">
            Live Stream
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
        {/* Metric Highlights */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Organic Reach Growth", value: "+380%", trend: "vs previous quarter", icon: TrendingUp, color: "text-emerald-400" },
            { label: "Audience Retention", value: "94.2%", trend: "Consistent view time", icon: Users, color: "text-cyan-400" },
            { label: "Engagement Multiplier", value: "4.2x", trend: "High-value interactions", icon: Flame, color: "text-purple-400" },
            { label: "Conversion Velocity", value: "+46%", trend: "Inquiry to client", icon: Target, color: "text-amber-400" },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="glass-card rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 uppercase tracking-wider">{m.label}</span>
                  <Icon size={16} className={m.color} />
                </div>
                <p className={`mt-3 text-3xl font-extrabold ${m.color}`}>{m.value}</p>
                <p className="mt-1 text-[11px] text-white/40">{m.trend}</p>
              </div>
            );
          })}
        </div>

        {/* Content Pillars & Social Strategy Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          {/* Card 1: Social Content Engine */}
          <div className="glass-card rounded-3xl p-8 border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  Social Presence Framework
                </span>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  Content That Earns Recognition Before Attention
                </h3>
              </div>
              <Instagram size={24} className="text-pink-400" />
            </div>

            <p className="mt-4 text-sm text-white/65 leading-relaxed">
              Consistency is not merely frequency—it is the practice of showing up with the same level of clarity, visual care, and relevance over time.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-xs">
              {[
                "Visual storytelling & high-retention Reels",
                "Community engagement & comment systems",
                "Audience targeting & Meta promotional ads",
                "Brand familiarity & positioning cadence",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
                  <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                  <span className="text-white/80">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <Link
                href="/social-media-management"
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Social Media Strategy Services &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: Discoverability & Search Presence */}
          <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="size-11 rounded-xl border border-cyan-400/20 bg-cyan-400/10 grid place-items-center text-cyan-400">
                <Search size={20} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                Google Presence & Local Discoverability
              </h3>
              <p className="mt-3 text-xs text-white/65 leading-relaxed">
                Local discovery is often shaped before a customer ever visits a website. Search results, business profiles, and authoritative signals determine whether people decide to engage.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-white/75">
                <p>• Google Business Profile Strategy</p>
                <p>• Local SEO & High-Intent Discovery</p>
                <p>• Search-Facing Landing Architecture</p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <Link
                href="/digital-marketing"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Explore Digital Marketing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-t border-white/10 bg-[#0e121a] px-4 text-xs text-white/50">
        <span>Channel: Instagram / Meta / Google Engine</span>
        <Link href="/contact" className="text-purple-400 hover:underline">
          Book a Growth Consultation &rarr;
        </Link>
      </div>
    </div>
  );
}
