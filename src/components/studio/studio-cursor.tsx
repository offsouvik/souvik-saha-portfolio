"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function StudioCursor({ label }: { label: string | null }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Outer Orbit */}
      <motion.div
        className="absolute rounded-full border border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[2px] transition-all"
        animate={{
          x: pos.x,
          y: pos.y,
          width: label ? 54 : 32,
          height: label ? 54 : 32,
          borderColor: label ? "rgba(56, 189, 248, 1)" : "rgba(255, 255, 255, 0.4)",
          backgroundColor: label ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.05)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.2 }}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Inner Dot */}
      <motion.div
        className="absolute size-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: label ? 1.5 : 1,
          backgroundColor: label ? "#38bdf8" : "#ffffff",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.1 }}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Hover Label */}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute left-0 top-0 pointer-events-none"
          style={{
            transform: `translate(${pos.x + 24}px, ${pos.y + 12}px)`,
          }}
        >
          <div className="rounded-md border border-cyan-400/40 bg-black/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-400 shadow-xl backdrop-blur-md">
            {label}
          </div>
        </motion.div>
      )}
    </div>
  );
}
