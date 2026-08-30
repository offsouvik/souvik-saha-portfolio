"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) { return <motion.div className={cn(className)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55, delay }}>{children}</motion.div>; }
