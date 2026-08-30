"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return <button type="button" onClick={toggleTheme} className="grid size-8 place-items-center text-[#18211d] transition-colors hover:text-[#ca5b43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ca5b43]" aria-label={`Switch to ${isDark ? "light" : "dark"} theme`} title={`Switch to ${isDark ? "light" : "dark"} theme`}>{isDark ? <Sun size={17} strokeWidth={1.7} /> : <Moon size={17} strokeWidth={1.7} />}</button>;
}
