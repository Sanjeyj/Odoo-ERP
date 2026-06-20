"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggle } = useTheme();
  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      title="Toggle dark / light mode"
      className={`p-2 rounded-full border backdrop-blur-sm transition-all duration-200
        ${isDark
          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
          : "bg-black/10 border-black/20 text-slate-800 hover:bg-black/20"}
        ${className}`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
