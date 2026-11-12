import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Overline({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("type-overline text-accent", className)} {...props} />;
}
