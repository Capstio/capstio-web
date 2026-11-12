"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

export const themeStorageKey = "capstio-theme";

// Toggles the `dark` class on <html> and remembers the choice. Both icons are
// always rendered and swapped with CSS, so the server markup never depends on
// the active theme and there is no hydration flash.
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
  } catch {
    // Storage can be blocked; the toggle still works for this page view.
  }
}

export function ThemeToggle({
  label,
  lightLabel,
  darkLabel,
  variant = "icon",
  className,
}: {
  label: string;
  // Text of the labeled variant: shown after switching to light / to dark.
  lightLabel?: string;
  darkLabel?: string;
  variant?: "icon" | "labeled";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-body transition-colors hover:bg-heading/10 hover:text-heading motion-reduce:transition-none",
        variant === "icon"
          ? "size-9"
          : "type-small h-10 flex-1 border border-line px-3",
        className,
      )}
    >
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
      {variant === "labeled" && (
        <>
          <span className="hidden dark:inline">{lightLabel}</span>
          <span className="dark:hidden">{darkLabel}</span>
        </>
      )}
    </button>
  );
}
