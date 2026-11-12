import { cn } from "@/lib/cn";

// Brand mark. The ring and the signal dot take their colors from --logo-ring and
// --logo-dot, so the mark switches between mark-color and mark-color-on-dark with
// the theme and with data-surface="dark" blocks.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="150 150 724 724"
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
    >
      <path
        d="M772.1 701.0 A321.54 321.54 0 1 1 772.1 323.0 A53.25 53.25 0 0 1 686.0 385.6 A215.04 215.04 0 1 0 686.0 638.4 A53.25 53.25 0 0 1 772.1 701.0 Z"
        fill="var(--logo-ring)"
      />
      <circle cx="770" cy="512" r="65.5" fill="var(--logo-dot)" />
    </svg>
  );
}

// Mark plus the "Capstio" wordmark (Inter semibold, always spelled Capstio).
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[1.25rem] leading-7 font-semibold tracking-tight text-heading">
        Capstio
      </span>
    </span>
  );
}
