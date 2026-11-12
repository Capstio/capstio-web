"use client";

import { ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

// Native <select> styled to match the design: accessible and keyboard friendly
// for free. Switching keeps the current path and only swaps the locale segment.
export function LanguageSelect({
  lang,
  label,
  names,
  variant = "plain",
  className,
}: {
  lang: Locale;
  label: string;
  names: Record<Locale, string>;
  // "plain" has no border (header); "outlined" has one (footer, mobile menu).
  variant?: "plain" | "outlined";
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function onChange(next: string) {
    if (!hasLocale(next)) return;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Globe
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 size-4 text-body"
      />
      <select
        aria-label={label}
        value={lang}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "type-small h-9 w-full cursor-pointer appearance-none rounded-md bg-transparent pr-8 pl-8 font-medium text-heading transition-colors hover:bg-heading/10 motion-reduce:transition-none",
          variant === "outlined" && "h-10 border border-line",
        )}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale} className="bg-surface text-heading">
            {names[locale]}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 size-3.5 text-muted"
      />
    </div>
  );
}
