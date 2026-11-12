import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

// Status pill with a leading dot: running, needs confirmation, dangerous.
export function StatusBadge({
  tone = "success",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "type-caption inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium",
        tones[tone],
      )}
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-current" />
      {children}
    </span>
  );
}
