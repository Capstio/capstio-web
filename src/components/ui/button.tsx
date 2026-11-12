import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "link";
type Size = "md" | "lg";

const base =
  "type-button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary: "bg-action text-on-action hover:bg-action-hover",
  secondary:
    "border border-line-strong bg-transparent text-heading hover:bg-heading/10",
  link: "text-link hover:underline underline-offset-4",
};

const sizes: Record<Variant, Record<Size, string>> = {
  primary: { md: "h-10 px-4", lg: "h-12 px-6" },
  secondary: { md: "h-10 px-4", lg: "h-12 px-6" },
  link: { md: "h-10 px-2", lg: "h-12 px-2" },
};

type Common = { variant?: Variant; size?: Size; children: ReactNode };

function styles(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[variant][size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button
      type="button"
      className={styles(variant, size, className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "children">) {
  return <Link className={styles(variant, size, className)} {...props} />;
}
