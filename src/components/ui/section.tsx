import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type Surface = "light" | "subtle" | "dark";

// A page block that uses exactly one color context (see globals.css).
// Vertical rhythm: 96px desktop, 80px tablet, 64px mobile.
export function Section({
  surface = "light",
  className,
  ...props
}: ComponentProps<"section"> & { surface?: Surface }) {
  return (
    <section
      data-surface={surface}
      className={cn("py-16 md:py-20 lg:py-24", className)}
      {...props}
    />
  );
}
