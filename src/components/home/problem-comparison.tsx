import {
  ArrowRight,
  Check,
  Globe,
  Lock,
  Minus,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionaries";
import { topLinkHref } from "@/lib/site-nav";

type ComparisonDict = Dictionary["home"]["problem"]["comparison"];
type Column = keyof ComparisonDict["columns"];
type Status = "good" | "bad" | "warn" | "neutral" | "secure";

const columns: Column[] = ["terminal", "dashboard", "capstio"];

// Verdict of each cell, by row then column (terminal, dashboard, capstio).
// It is not copy, so it lives here rather than in the dictionaries.
const statuses: Status[][] = [
  ["warn", "good", "good"], // remembering syntax
  ["good", "bad", "good"], // agent on each server
  ["good", "neutral", "good"], // seeing the command
  ["neutral", "neutral", "secure"], // where the SSH key lives
];

const statusStyles: Record<Status, { tone: string; icon: LucideIcon | null }> = {
  good: { tone: "bg-signal/18 text-signal", icon: Check },
  secure: { tone: "bg-signal/18 text-signal", icon: Lock },
  bad: { tone: "bg-danger/18 text-danger", icon: X },
  neutral: { tone: "bg-muted/18 text-muted", icon: Minus },
  warn: { tone: "bg-warning/18 text-warning", icon: null },
};

function StatusIcon({ status }: { status: Status }) {
  const { tone, icon: Icon } = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full",
        tone,
      )}
    >
      {Icon ? (
        <Icon className="size-3" strokeWidth={2.5} />
      ) : (
        <span className="text-[0.6875rem] leading-none font-bold">!</span>
      )}
    </span>
  );
}

const headerIcons: Record<Column, ReactNode> = {
  terminal: <Terminal className="size-6 text-muted" strokeWidth={1.6} />,
  dashboard: <Globe className="size-6 text-muted" strokeWidth={1.6} />,
  capstio: <LogoMark className="size-6" />,
};

// Comparison card of the problem section (Figma "Comparison / Card").
// From 1280px: a label column and three column cards on one grid, rows 64px
// high (Figma desktop). 1024-1279px: the three column cards sit
// side by side and each cell repeats its row label, so long Vietnamese copy
// can wrap. Below 1024px: the same cards stack (Figma mobile).
// The visual grid is hidden from screen readers, which get a real table.
export function ProblemComparison({ dict }: { dict: ComparisonDict }) {
  return (
    <div className="rounded-[20px] border border-line bg-surface p-4 shadow-md lg:px-10 lg:pt-7 lg:pb-5 dark:shadow-[0_0_40px_-12px_rgb(47_91_211/0.45)]">
      <div className="flex flex-col items-center gap-3 text-center lg:gap-2.5">
        <p className="type-caption font-semibold text-link uppercase">
          {dict.overline}
        </p>
        <p className="text-[0.9375rem] leading-6 text-muted">{dict.subtitle}</p>
      </div>

      {/* sr-only goes on a wrapper: a table ignores the 1px box and would
          widen the page. */}
      <div className="sr-only">
        <table>
          <caption>{dict.overline}</caption>
          <thead>
            <tr>
              <td />
              {columns.map((column) => (
                <th key={column} scope="col">
                  {dict.columns[column]}
                  {column === "capstio" && ` (${dict.badge})`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dict.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {columns.map((column) => (
                  <td key={column}>
                    {row[column].main}. {row[column].sub}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        aria-hidden="true"
        className="mt-3 flex flex-col gap-3 lg:mt-8 lg:grid lg:grid-cols-3 lg:items-start lg:gap-4 xl:grid-cols-[220px_repeat(3,minmax(0,1fr))] xl:items-stretch"
      >
        {/* Row labels, wide screens only. The spacer matches the column header. */}
        <div className="hidden xl:block">
          <div className="h-20" />
          {dict.rows.map((row, index) => (
            <div
              key={row.label}
              className={cn(
                "flex h-16 items-center text-sm font-medium text-body",
                index > 0 && "border-t border-line",
              )}
            >
              {row.label}
            </div>
          ))}
        </div>

        {columns.map((column, columnIndex) => {
          const highlight = column === "capstio";
          return (
            <div
              key={column}
              className={cn(
                "relative rounded-[14px] border p-4 xl:p-0",
                highlight
                  ? "border-action bg-action/8 shadow-[0_8px_28px_-8px_rgb(47_91_211/0.45)] dark:bg-action/12"
                  : "border-line bg-heading/3",
              )}
            >
              <div className="flex flex-col gap-2 xl:h-20 xl:px-5 xl:pt-6">
                <div className="flex items-center gap-3">
                  {headerIcons[column]}
                  <span className="text-[0.9375rem] leading-6 font-semibold text-heading">
                    {dict.columns[column]}
                  </span>
                </div>
                {highlight && (
                  <span className="type-caption inline-flex h-6 w-fit items-center rounded-full bg-action px-5 font-semibold text-on-action xl:absolute xl:-top-3 xl:left-1/2 xl:-translate-x-1/2 xl:px-4">
                    {dict.badge}
                  </span>
                )}
              </div>

              <div className="mt-3.5 flex flex-col gap-3.5 xl:mt-0 xl:gap-0">
                {dict.rows.map((row, rowIndex) => (
                  <div
                    key={row.label}
                    className={cn(
                      "flex items-center gap-3 xl:h-16 xl:px-5",
                      rowIndex > 0 &&
                        (highlight
                          ? "xl:border-t xl:border-action/20"
                          : "xl:border-t xl:border-line"),
                    )}
                  >
                    <StatusIcon status={statuses[rowIndex][columnIndex]} />
                    <div className="min-w-0">
                      <p className="type-caption text-muted xl:hidden">{row.label}</p>
                      <p className="text-sm leading-5 font-semibold text-heading">
                        {row[column].main}
                      </p>
                      <p className="type-caption text-muted">{row[column].sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 text-center lg:mt-7">
        <Link
          href={topLinkHref.compare}
          className="type-small inline-flex items-center gap-1 font-semibold text-link underline-offset-4 hover:underline"
        >
          {dict.link}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
