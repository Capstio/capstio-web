import { ScanSearch, ScrollText, SlidersHorizontal, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type { Dictionary } from "@/lib/dictionaries";
import appsDark from "../../../public/features/apps-dark.png";
import appsLight from "../../../public/features/apps-light.png";
import { FeatureCopy } from "./feature-copy";
import { withCode } from "./inline-code";

type UnifiedAppsDict = Dictionary["home"]["unifiedApps"];

const headingId = "unified-apps-heading";

// Icons of the three points, in dictionary order (Figma "icon/auto-discovery",
// "icon/standardized-controls", "icon/instant-log-stream").
const pointIcons: LucideIcon[] = [ScanSearch, SlidersHorizontal, ScrollText];

const chip =
  "rounded-md bg-chip-solid px-1.5 py-0.5 font-mono text-sm whitespace-nowrap text-chip-text";

// The screenshot is twice as wide as the window that shows it (Figma: 1500px
// image in a 776px window on desktop, 780px in 374px on mobile), so about
// half of the app shows: sidebar, apps list and the start of the detail pane.
// Both are capped (window 1000px, image 1800px) so very wide screens do not
// zoom into the sidebar; there the window stops before the viewport edge and
// its right side fades out. The window's height follows the Figma ratio,
// capped at 480px / 636px.
const sizes = "(min-width: 1024px) min(110vw, 1800px), 210vw";

// Home feature section "Unified apps view" (Figma "Feature - Unified Apps"
// desktop and mobile). Text on the left; the Apps tab screenshot bleeds off
// the right edge of the page and the bottom of the section, so only about
// half of the window shows, as on git-tower.com. Colors are the Figma section
// palette (--sp-* in globals.css).
export function UnifiedApps({ dict }: { dict: UnifiedAppsDict }) {
  return (
    <Section
      surface="light"
      aria-labelledby={headingId}
      className="overflow-hidden pt-10 pb-0 md:pt-10 md:pb-0 lg:pt-25 lg:pb-0"
    >
      <Container className="grid gap-8 lg:grid-cols-[480px_minmax(0,1fr)] lg:items-center lg:gap-16">
        <FeatureCopy
          headingId={headingId}
          overline={dict.overline}
          title={dict.title}
          subtitle={withCode(dict.subtitle, chip)}
          points={dict.points}
          icons={pointIcons}
        />

        {/* The outer box bleeds to the right edge of the viewport (the negative
            margin is the gutter plus whatever the centred 1264px container
            leaves free) and is a size container: the window's width and
            height follow its real width, and the fade only applies once the
            window is narrower than that box. */}
        <div className="@container -mr-4 md:-mr-8 lg:mr-[calc(-1*(max(0px,(100vw-1264px)/2)+2rem))] lg:self-end">
          <div className="relative h-[min(117.6cqw,30rem)] max-w-250 overflow-hidden rounded-tl-2xl lg:h-[min(82cqw,39.75rem)] lg:rounded-tl-3xl @min-[62.5625rem]:[mask-image:linear-gradient(to_right,#000_75%,transparent)]">
            <Image
              src={appsLight}
              alt={dict.imageAlt}
              sizes={sizes}
              placeholder="blur"
              className="absolute top-0 left-0 h-auto w-[208%] max-w-450 lg:w-[200%] dark:hidden"
            />
            <Image
              src={appsDark}
              alt={dict.imageAlt}
              sizes={sizes}
              placeholder="blur"
              className="absolute top-0 left-0 hidden h-auto w-[208%] max-w-450 lg:w-[200%] dark:block"
            />
            {/* The window is cut by the end of the section; fade its lower
                part into the page background so it does not end on a hard
                edge above the next section. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-page"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
