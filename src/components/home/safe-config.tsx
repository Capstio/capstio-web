import { Check, EyeOff, History, ShieldCheck, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionaries";
import configDark from "../../../public/features/config-dark.png";
import configLight from "../../../public/features/config-light.png";
import { FeatureCopy } from "./feature-copy";

type SafeConfigDict = Dictionary["home"]["safeConfig"];

const headingId = "safe-config-heading";

// Icons of the three points, in dictionary order (Figma "icon/syntax-guard",
// "icon/backup-history", "icon/secret-mask").
const pointIcons: LucideIcon[] = [ShieldCheck, History, EyeOff];

// The screenshot is wider than the window that shows it (Figma: 1000px image
// in a 620px window on desktop, 680px in 360px on mobile), so the window
// shows the file list and the .env editor. Phones get the tighter Figma
// mobile crop; from 768px the desktop crop applies.
const sizes =
  "(min-width: 1280px) 1000px, (min-width: 1024px) 62vw, (min-width: 768px) 150vw, 175vw";

const screenshot =
  "absolute top-[-9.23%] left-[-69.44%] h-auto w-[188.89%] max-w-none md:top-[-8.37%] md:left-[-53.23%] md:w-[161.29%]";

const callout =
  "absolute flex items-center rounded-[10px] border bg-callout text-xs leading-[0.9375rem] font-semibold text-callout-text";

// Home feature section "Safe config editor" (Figma "Feature - Safe Config"
// desktop and mobile). Desktop: the product visual on the left and the text
// on the right. Mobile: the text first, then the visual. The visual is the
// app window cropped on a glow stage, with floating callouts that repeat
// what the editor does (only the syntax one on phones, as in Figma).
export function SafeConfig({ dict }: { dict: SafeConfigDict }) {
  return (
    <Section
      surface="light"
      aria-labelledby={headingId}
      className="py-10 md:py-10 lg:py-25"
    >
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,656px)_480px] lg:items-center lg:justify-between lg:gap-16">
        <FeatureCopy
          headingId={headingId}
          overline={dict.overline}
          title={dict.title}
          subtitle={dict.subtitle}
          points={dict.points}
          icons={pointIcons}
        />

        <div className="relative mx-auto aspect-[358/260] w-full max-w-164 overflow-hidden rounded-2xl border border-stage-line bg-(image:--sp-stage) md:aspect-[656/460] md:rounded-[20px] lg:order-first lg:mx-0">
          <div className="absolute top-[12.31%] left-[8.94%] h-full w-[100.56%] overflow-hidden rounded-[10px] border border-window-line bg-window shadow-(--sp-window-shadow) md:top-[13.91%] md:left-[10.98%] md:h-[93.48%] md:w-[94.51%] md:rounded-xl">
            <Image
              src={configLight}
              alt={dict.imageAlt}
              sizes={sizes}
              placeholder="blur"
              className={cn(screenshot, "dark:hidden")}
            />
            <Image
              src={configDark}
              alt={dict.imageAlt}
              sizes={sizes}
              placeholder="blur"
              className={cn(screenshot, "hidden dark:block")}
            />
          </div>

          {/* The callouts mirror the app UI: decorative, the image alt
              already describes the screen. */}
          <div aria-hidden="true">
            <p
              className={cn(
                callout,
                "top-[78.46%] left-3.5 gap-2 border-callout-good-line py-2 pr-3 pl-2.5 shadow-(--sp-callout-good-shadow) md:top-[65.22%] md:left-7",
              )}
            >
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-callout-check text-callout-check-mark">
                <Check className="size-2.5" strokeWidth={4} />
              </span>
              {dict.syntaxValid}
            </p>

            <div
              className={cn(
                callout,
                "top-[76.52%] left-7 hidden gap-2.5 border-callout-line p-2.25 shadow-(--sp-callout-shadow) md:flex",
              )}
            >
              <span className="inline-flex size-6 items-center justify-center rounded-[7px] bg-callout-tile text-kicker">
                <History className="size-3.5" strokeWidth={2.2} />
              </span>
              <span className="flex flex-col gap-px">
                <span>{dict.backupTitle}</span>
                <span className="font-mono text-[0.65625rem] leading-3.5 font-normal text-callout-meta">
                  {dict.backupMeta}
                </span>
              </span>
              <span className="ml-2.5 rounded-md bg-callout-button px-2.25 py-1 text-[0.6875rem] leading-3.25 text-kicker">
                {dict.restore}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
