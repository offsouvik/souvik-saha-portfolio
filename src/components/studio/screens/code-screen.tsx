"use client";

import { useState } from "react";
import {
  Code2,
  Terminal,
  FolderTree,
  FileCode,
  Layers,
  Cpu,
  Play,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  GitBranch,
  Settings,
} from "lucide-react";
import Link from "next/link";

export function CodeScreen() {
  const [activeTab, setActiveTab] = useState<"editor" | "terminal" | "architecture">("editor");
  const [activeFile, setActiveFile] = useState("3d-engine.ts");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "souvik@studio-rig:~$ neofetch",
    "OS: Ubuntu 24.04 LTS (x86_64)",
    "Kernel: Linux 6.8.0-31-generic",
    "Uptime: 4 days, 16 hours",
    "Packages: 1842 (dpkg), 14 (snap)",
    "Shell: zsh 5.9",
    "CPU: AMD Ryzen 9 7950X (32) @ 5.700GHz",
    "GPU: NVIDIA GeForce RTX 4080 16GB",
    "Memory: 18432MiB / 64240MiB",
    "Stack: Next.js 16, React 19, Three.js, WebGL, TypeScript, Tailwind",
    "Status: System operational. Ready for deployment.",
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const cmd = terminalInput.trim().toLowerCase();
    const newOutput = [...terminalOutput, `souvik@studio-rig:~$ ${terminalInput}`];

    if (cmd === "help") {
      newOutput.push(
        "Available commands: 'help', 'skills', 'projects', 'stack', 'contact', 'clear'"
      );
    } else if (cmd === "skills") {
      newOutput.push(
        "CORE CAPABILITIES:",
        " • Frontend: Next.js 16, React 19, TypeScript, Three.js, WebGL Shaders, Tailwind CSS",
        " • Backend: Node.js, Express, PostgreSQL, Prisma, Redis, REST & GraphQL APIs",
        " • Creative: 3D Scene Graph, Canvas Shaders, Motion Design, Framer Motion"
      );
    } else if (cmd === "stack") {
      newOutput.push(
        "PRODUCTION STACK:",
        " • Framework: Next.js 16 (App Router + Turbopack)",
        " • 3D Graphics: Three.js r169 with custom chromatic dispersion shaders",
        " • State & Physics: Framer Motion spring physics + quaternion rotation math",
        " • Hosting: Vercel / AWS CloudFront edge network"
      );
    } else if (cmd === "projects") {
      newOutput.push(
        "FEATURED PRODUCTIONS:",
        " [01] Design World 3D Refraction Portal",
        " [02] Full-Stack Enterprise Analytics Platform",
        " [03] MotionSites Creative UI Engine"
      );
    } else if (cmd === "contact") {
      newOutput.push("Email: contact@souviksaha.com | Location: Remote / Global");
    } else if (cmd === "clear") {
      setTerminalOutput([]);
      setTerminalInput("");
      return;
    } else {
      newOutput.push(`Command not recognized: '${cmd}'. Type 'help' for options.`);
    }

    setTerminalOutput(newOutput);
    setTerminalInput("");
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#0d1117] text-[#c9d1d9] font-mono text-sm selection:bg-cyan-500/30">
      {/* Top Window Chrome Bar */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-semibold text-[#8b949e]">
            VS Code — Souvik Studio Workspace [WSL: Ubuntu-24.04]
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-[#30363d] bg-[#0d1117] p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
              activeTab === "editor"
                ? "bg-[#21262d] text-white font-semibold"
                : "text-[#8b949e] hover:text-white"
            }`}
          >
            <Code2 size={13} className="text-cyan-400" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
              activeTab === "terminal"
                ? "bg-[#21262d] text-white font-semibold"
                : "text-[#8b949e] hover:text-white"
            }`}
          >
            <Terminal size={13} className="text-emerald-400" />
            <span>Terminal</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
              activeTab === "architecture"
                ? "bg-[#21262d] text-white font-semibold"
                : "text-[#8b949e] hover:text-white"
            }`}
          >
            <Layers size={13} className="text-purple-400" />
            <span>Architecture</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8b949e]">
          <span className="flex items-center gap-1">
            <GitBranch size={13} /> main*
          </span>
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Explorer Sidebar */}
        <div className="hidden w-64 shrink-0 flex-col border-r border-[#30363d] bg-[#0d1117] p-3 md:flex">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8b949e] mb-3">
            Explorer : Project Core
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1 text-[#8b949e] py-1 font-semibold">
              <ChevronRight size={13} />
              <span>src / core</span>
            </div>

            {[
              { name: "3d-engine.ts", icon: "TS", active: activeFile === "3d-engine.ts" },
              { name: "glass-refraction.frag", icon: "GLSL", active: activeFile === "glass-refraction.frag" },
              { name: "growth-pipeline.ts", icon: "TS", active: activeFile === "growth-pipeline.ts" },
              { name: "client-portal.tsx", icon: "TSX", active: activeFile === "client-portal.tsx" },
            ].map((file) => (
              <button
                key={file.name}
                type="button"
                onClick={() => {
                  setActiveFile(file.name);
                  setActiveTab("editor");
                }}
                className={`flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left transition-colors ${
                  file.active
                    ? "bg-[#1f242c] text-white font-semibold border-l-2 border-cyan-400"
                    : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
                }`}
              >
                <span className="text-[10px] font-bold text-cyan-400">{file.icon}</span>
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto border-t border-[#30363d] pt-3 text-[11px] text-[#8b949e]">
            <p>Node v22.10.2</p>
            <p>TypeScript 5.7.2</p>
          </div>
        </div>

        {/* Center Content Pane */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#0a0d12]">
          {activeTab === "editor" && (
            <div className="flex h-full flex-col">
              {/* File Tabs Header */}
              <div className="flex border-b border-[#30363d] bg-[#0d1117] px-2 text-xs">
                <div className="flex items-center gap-2 border-t-2 border-cyan-400 bg-[#0a0d12] px-4 py-2 font-medium text-white">
                  <FileCode size={13} className="text-cyan-400" />
                  <span>{activeFile}</span>
                </div>
              </div>

              {/* Code Display */}
              <div className="flex-1 overflow-auto p-6 font-mono leading-relaxed text-xs sm:text-sm">
                {activeFile === "3d-engine.ts" && (
                  <pre className="text-[#e6edf3]">
                    <code>{`// -----------------------------------------------------------------------------
// SOUVIK SAHA // CREATIVE COMPUTING & 3D WEBGL ENGINE
// -----------------------------------------------------------------------------
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Studio3DEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private chromaticDispersionPass: THREE.ShaderMaterial;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 10);

    // Initializing 6-Band Chromatic Glass Dispersion
    this.initRefractionPipeline();
    console.log("⚡ [Studio Engine] Ready: 60 FPS Smooth Viewport Active");
  }

  public render(dt: number) {
    // Dual-pass render target pipeline (back faces -> front faces)
    this.renderer.render(this.scene, this.camera);
  }
}`}</code>
                  </pre>
                )}

                {activeFile === "glass-refraction.frag" && (
                  <pre className="text-[#e6edf3]">
                    <code>{`// Chromatic Dispersion Fragment Shader - 6 Color Bands
precision highp float;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uChromatic;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 color = vec3(0.0);
  
  // Sample Red, Yellow, Green, Cyan, Blue, Violet rays across refraction vectors
  for (int i = 0; i < 16; i++) {
    float slide = float(i) / 16.0 * 0.045;
    // Chromatic optical displacement
    color.r += texture2D(uTexture, uv + vec2(slide * 1.0)).r;
    color.g += texture2D(uTexture, uv + vec2(slide * 2.0)).g;
    color.b += texture2D(uTexture, uv + vec2(slide * 3.0)).b;
  }
  color /= 16.0;
  gl_FragColor = vec4(color, 1.0);
}`}</code>
                  </pre>
                )}

                {activeFile === "growth-pipeline.ts" && (
                  <pre className="text-[#e6edf3]">
                    <code>{`export const GrowthPipeline = {
  client: "Ambitious Brand / Startup",
  objective: "Triple organic engagement & customer discovery",
  architecture: [
    "01. Instagram & Meta visual storytelling system",
    "02. Conversion-optimized landing page architecture",
    "03. Google Discoverability & Local SEO footprint",
    "04. Data attribution & funnel velocity analysis"
  ],
  resultsBenchmark: {
    organicReachMultiplier: "3.8x",
    leadConversionRate: "+42%",
    pageSpeedScore: "99/100"
  }
};`}</code>
                  </pre>
                )}

                {activeFile === "client-portal.tsx" && (
                  <pre className="text-[#e6edf3]">
                    <code>{`export function ClientPortal() {
  return (
    <div className="studio-dashboard">
      <header className="flex justify-between items-center py-4">
        <h1>Live Production Stream</h1>
        <Badge variant="active">All Systems Operational</Badge>
      </header>
      <main className="grid grid-cols-3 gap-6">
        <MetricsCard title="Throughput" value="1.2M req/day" />
        <MetricsCard title="Page Load Time" value="0.4s" />
        <MetricsCard title="Client Satisfaction" value="100%" />
      </main>
    </div>
  );
}`}</code>
                  </pre>
                )}
              </div>
            </div>
          )}

          {activeTab === "terminal" && (
            <div className="flex h-full flex-col bg-[#05070a] p-4 text-xs font-mono">
              <div className="flex-1 overflow-y-auto space-y-1.5 pb-2">
                {terminalOutput.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.startsWith("souvik@")
                        ? "text-cyan-400 font-bold"
                        : line.startsWith("⚡")
                        ? "text-yellow-400"
                        : "text-[#8b949e]"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-[#30363d] pt-3">
                <span className="text-cyan-400 font-bold">souvik@studio-rig:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help', 'skills', 'stack', 'projects'..."
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-[#484f58]"
                  autoFocus
                />
              </form>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Full-Stack Digital Architecture</h3>
                  <p className="mt-1 text-xs text-[#8b949e]">
                    How Souvik structures high-performance digital platforms from database to interface.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Layer 1 : Interface & Canvas
                    </h4>
                    <p className="mt-2 text-xs text-[#c9d1d9] leading-relaxed">
                      Next.js 16 App Router, React 19 concurrent features, WebGL Three.js shaders, and Framer Motion spring physics.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      Layer 2 : Backend & Services
                    </h4>
                    <p className="mt-2 text-xs text-[#c9d1d9] leading-relaxed">
                      Edge compute routes, TypeScript micro-services, PostgreSQL / Prisma data modeling, and secure authentication flows.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live Production Metrics
                  </h4>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-[#0d1117] p-2.5">
                      <p className="text-base font-bold text-white">100</p>
                      <p className="text-[10px] text-[#8b949e]">Lighthouse Performance</p>
                    </div>
                    <div className="rounded-lg bg-[#0d1117] p-2.5">
                      <p className="text-base font-bold text-white">&lt;0.5s</p>
                      <p className="text-[10px] text-[#8b949e]">First Contentful Paint</p>
                    </div>
                    <div className="rounded-lg bg-[#0d1117] p-2.5">
                      <p className="text-base font-bold text-white">60-120</p>
                      <p className="text-[10px] text-[#8b949e]">WebGL FPS Target</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex h-7 shrink-0 items-center justify-between border-t border-[#30363d] bg-[#161b22] px-3 text-[11px] text-[#8b949e]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Cpu size={12} /> Live Engine
          </span>
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/web-development" className="text-cyan-400 hover:underline">
            View Web Development Services &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
