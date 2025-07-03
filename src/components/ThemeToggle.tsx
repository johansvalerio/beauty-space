"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  showLabel?: boolean;
}

export function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <a
      onClick={toggleTheme}
      className="cursor-pointer px-3 py-2 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      aria-label={`Cambiar a modo ${isDark ? "claro" : "oscuro"}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-black" />
      )}
      {showLabel && (
        <span className="ml-3 dark:text-white text-black">
          {isDark ? "Light mode" : "Dark mode"}
        </span>
      )}
    </a>
  );
}
