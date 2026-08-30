"use client";

import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

export function MagneticButton({ children, className, href, onClick }: MagneticButtonProps) {
  const move = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
    target.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "translate(0, 0)";
  };

  const common = {
    onMouseMove: move,
    onMouseLeave: reset,
    className: cn(
      "inline-flex items-center justify-center gap-2 rounded-full transition-transform duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300",
      className,
    ),
  };

  if (href) {
    return <a href={href} {...common}>{children}</a>;
  }

  return <motion.button type="button" onClick={onClick} {...common}>{children}</motion.button>;
}
