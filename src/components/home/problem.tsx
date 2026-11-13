import { Box, FileText, TriangleAlert, type LucideIcon } from "lucide-react";
import { Card, Container, Overline, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionaries";
import { ProblemComparison } from "./problem-comparison";

type ProblemDict = Dictionary["home"]["problem"];

const headingId = "problem-heading";

// Icon and tint of each problem card (Figma "Icon tile 1-3": amber, red, blue
// at 15%). Colors come from the status and action tokens.
const cards: {
  id: keyof ProblemDict["cards"];
  icon: LucideIcon;
  tone: string;
}[] = [
  { id: "terminal", icon: TriangleAlert, tone: "bg-warning/15 text-warning" },
  { id: "config", icon: FileText, tone: "bg-danger/15 text-danger" },
  { id: "dashboard", icon: Box, tone: "bg-action/15 text-link" },
];

// Turns "{docker rm}" in a card body into inline code.
function withCode(text: string) {
  return text.split(/\{([^}]+)\}/).map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={index}
        className="type-mono-s rounded-[5px] border border-line bg-code px-1 py-0.5 text-heading"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

// Home "The problem" section (Figma "Problem & Core Feature" desktop and
// "Problem / Mobile"): heading, three problem cards and the comparison of a
// plain terminal, a web dashboard and Capstio. Colors follow the project
// tokens rather than the navy palette of the Figma frame.
export function Problem({ dict }: { dict: ProblemDict }) {
  return (
    <Section
      surface="light"
      aria-labelledby={headingId}
      className="py-10 lg:pt-18 lg:pb-16"
    >
      <Container className="flex flex-col gap-6 lg:gap-10">
        <div className="flex flex-col items-center gap-3 text-center lg:gap-4">
          <Overline tone="muted" className="text-[0.8125rem] tracking-[0.138em]">
            {dict.overline}
          </Overline>
          {/* Figma lets these wrap naturally in 900px and 760px boxes on
              desktop; balanced wrapping only on small screens. */}
          <h2
            id={headingId}
            className="type-section-title max-w-225 text-balance text-heading lg:text-wrap"
          >
            {dict.title}
          </h2>
          <p className="max-w-190 text-base leading-[1.2] text-balance text-muted lg:text-lg lg:leading-[1.375rem] lg:text-wrap">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-3 lg:gap-6">
          {cards.map(({ id, icon: Icon, tone }) => (
            <Card key={id} className="flex flex-col gap-3.5 p-5 lg:gap-2.5 lg:p-6">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex size-11 shrink-0 items-center justify-center rounded-[12px]",
                    tone,
                  )}
                >
                  <Icon className="size-5.5" strokeWidth={1.75} />
                </span>
                <h3 className="type-h4 text-heading lg:text-[1.25rem] lg:leading-6">
                  {dict.cards[id].title}
                </h3>
              </div>
              <p className="type-small text-muted">{withCode(dict.cards[id].body)}</p>
            </Card>
          ))}
        </div>

        <ProblemComparison dict={dict.comparison} />
      </Container>
    </Section>
  );
}
