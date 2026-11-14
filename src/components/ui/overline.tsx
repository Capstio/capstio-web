import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "accent" | "muted";

// accent: mint label (default). muted: blue-grey label above home section
// titles (Figma "Sub-badge").
const tones: Record<Tone, string> = {
  accent: "text-accent",
  muted: "text-eyebrow",
};

export function Overline({
  tone = "accent",
  className,
  ...props
}: ComponentProps<"p"> & { tone?: Tone }) {
  return <p className={cn("type-overline", tones[tone], className)} {...props} />;
}
