import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

// Text column of the home feature sections (Figma "Feature - Unified Apps",
// "Feature - Safe Config"): kicker, title, subtitle and numbered point cards.
// Colors are the Figma section palette (--sp-* in globals.css).
export function FeatureCopy({
  headingId,
  overline,
  title,
  subtitle,
  points,
  icons,
}: {
  headingId: string;
  overline: string;
  // A "\n" in the title is a line break from the Figma copy.
  title: string;
  subtitle: ReactNode;
  points: { title: string; body: string }[];
  // Icons of the points, in dictionary order.
  icons: LucideIcon[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[0.8125rem] leading-4 font-semibold text-kicker uppercase">
        {overline}
      </p>
      <h2 id={headingId} className="type-h2 whitespace-pre-line text-strong">
        {title}
      </h2>
      <p className="text-base leading-7 text-soft">{subtitle}</p>
      <ul className="flex flex-col gap-3">
        {points.map((point, index) => {
          const Icon = icons[index];
          return (
            <li
              key={point.title}
              className="flex items-center gap-3 rounded-[14px] bg-point p-4"
            >
              <span className="w-6.5 shrink-0 font-mono text-xs text-kicker">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-point-tile text-point-icon"
              >
                {Icon && <Icon className="size-4.5" strokeWidth={1.75} />}
              </span>
              <span className="flex min-w-0 flex-col gap-1.25">
                <span className="text-[0.9375rem] leading-[1.125rem] font-semibold text-strong">
                  {point.title}
                </span>
                <span className="text-[0.8125rem] leading-4 text-soft">
                  {point.body}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
