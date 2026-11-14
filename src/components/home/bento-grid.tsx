import {
  ArrowLeftRight,
  ArrowRight,
  Bell,
  List,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionaries";
import { allFeaturesHref, featureHref } from "@/lib/site-nav";
import fleetDark from "../../../public/features/fleet-dark.png";
import fleetLight from "../../../public/features/fleet-light.png";

type BentoDict = Dictionary["home"]["bento"];
type StripKey = keyof BentoDict["strip"];

const headingId = "bento-heading";

// Feature strip under the cards (Figma "Feature strip"): icon, tint and page
// of each item. Logs live in the Apps feature, so they link there.
const stripItems: { id: StripKey; icon: LucideIcon; tone: string; href: string }[] = [
  { id: "logs", icon: List, tone: "bg-tile-accent/14 text-tile-accent", href: featureHref.apps },
  { id: "alerts", icon: Bell, tone: "bg-tile-warning/14 text-tile-warning", href: featureHref.alerts },
  { id: "sshSecurity", icon: ShieldCheck, tone: "bg-tile-success/14 text-tile-success", href: featureHref.sshSecurity },
  { id: "tunnels", icon: ArrowLeftRight, tone: "bg-tile-violet/14 text-tile-violet", href: featureHref.tunnels },
  { id: "ai", icon: Sparkles, tone: "bg-tile-pink/14 text-tile-pink", href: featureHref.ai },
];

// The Fleet screenshot is the app window alone (no macOS shadow, transparent
// rounded corners), so it is fitted whole into the frame: 508x280 on desktop
// in Figma, the card width minus its padding on phones.
const fleetSizes = "(min-width: 1024px) 508px, calc(100vw - 80px)";
const fleetImage = "object-contain";

// The shortcut keys drawn on the terminal card: ⌘1 … ⌘0.
const keys = ["⌘", "1", null, "⌘", "0"];

// Figma strokes sit inside the frame and take no space; CSS borders do, so
// the paddings are 1px smaller than Figma to keep the same text width.
const card =
  "rounded-[20px] border border-bento-line bg-bento-card p-4.75 lg:rounded-3xl lg:p-7.75";

const bigNumber =
  "block bg-clip-text text-5xl leading-12 font-semibold tracking-[-2px] text-transparent lg:text-[4rem] lg:leading-16 lg:tracking-[-2.5px]";

const cardText =
  "mt-5 block text-sm leading-5 font-medium text-soft lg:mt-7 lg:text-[0.9375rem] lg:leading-[1.375rem]";

// Link text followed by an arrow. The last word and the arrow never break
// apart, so the arrow does not wrap onto a line of its own.
function withArrow(text: string, arrowClassName = "size-3.5") {
  const split = text.lastIndexOf(" ") + 1;
  return (
    <>
      {text.slice(0, split)}
      <span className="whitespace-nowrap">
        {text.slice(split)}
        <ArrowRight aria-hidden="true" className={cn("ml-1 inline align-[-0.15em]", arrowClassName)} />
      </span>
    </>
  );
}

function CardLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="text-[0.8125rem] font-medium text-kicker underline-offset-4 hover:underline"
    >
      {withArrow(children)}
    </Link>
  );
}

// Home section "All in one Mac app" (Figma "Feature - Bento Grid" desktop and
// mobile). Desktop: the Fleet card on the left, the Recipes and Agentless
// number cards over the Terminal card on the right, and a strip of five
// smaller features below. Mobile: the same blocks stacked, the number cards
// side by side and the strip in two columns.
export function BentoGrid({ dict }: { dict: BentoDict }) {
  return (
    <Section
      surface="light"
      aria-labelledby={headingId}
      className="py-10 md:py-10 lg:py-30"
    >
      <Container className="flex flex-col gap-8 lg:gap-16">
        <div className="flex flex-col gap-4 lg:items-center lg:text-center">
          <p className="text-[0.8125rem] leading-4 font-semibold text-kicker uppercase">
            {dict.overline}
          </p>
          <h2 id={headingId} className="type-h2 text-strong">
            {dict.title}
          </h2>
          <p className="max-w-170 text-base leading-6 text-soft lg:leading-[1.1875rem]">
            {dict.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {/* Fleet (Figma "Card / Fleet (hero)"): the All VPS window, shown
                whole and centred in the image frame below the text. */}
            <div className="flex min-h-100 flex-col justify-between gap-6 rounded-[20px] border border-bento-line bg-(image:--sp-bento-hero) px-5.75 pt-6.75 pb-5.75 lg:min-h-130 lg:gap-8 lg:rounded-3xl lg:p-9.75">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-kicker uppercase">
                  {dict.fleet.overline}
                </p>
                <h3 className="text-2xl font-bold text-strong lg:text-[1.875rem]">
                  {dict.fleet.title}
                </h3>
                <p className="max-w-110 text-[0.9375rem] leading-6 text-soft">
                  {dict.fleet.body}
                </p>
                <Link
                  href={allFeaturesHref}
                  className="w-fit text-sm font-medium text-kicker underline-offset-4 hover:underline"
                >
                  {withArrow(dict.fleet.link)}
                </Link>
              </div>
              <div className="relative min-h-43 flex-1 lg:max-h-70">
                <Image
                  src={fleetLight}
                  alt={dict.fleet.imageAlt}
                  fill
                  sizes={fleetSizes}
                  className={cn(fleetImage, "filter-(--sp-fleet-shadow) dark:hidden")}
                />
                <Image
                  src={fleetDark}
                  alt={dict.fleet.imageAlt}
                  fill
                  sizes={fleetSizes}
                  className={cn(fleetImage, "hidden dark:block")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-6">
              <div className={cn(card, "lg:min-h-62")}>
                <p>
                  <span className={cn(bigNumber, "bg-(image:--sp-number)")}>24</span>
                  <span className={cardText}>{dict.recipes.body}</span>
                </p>
                <p className="mt-2.5">
                  <CardLink href={featureHref.recipes}>{dict.recipes.link}</CardLink>
                </p>
              </div>

              <div className={cn(card, "lg:min-h-62")}>
                <p>
                  <span className={cn(bigNumber, "bg-(image:--sp-number-good)")}>0</span>
                  <span className={cardText}>{dict.agentless.body}</span>
                </p>
              </div>

              <div
                className={cn(
                  card,
                  "col-span-2 flex flex-col gap-6 p-5.75 lg:min-h-62 lg:justify-between lg:gap-2",
                )}
              >
                <div aria-hidden="true" className="flex items-center gap-2.5">
                  {keys.map((key, index) =>
                    key === null ? (
                      <span key={index} className="text-[1.375rem] font-medium text-key-sep">
                        …
                      </span>
                    ) : (
                      <kbd
                        key={index}
                        className="inline-flex size-15 items-center justify-center rounded-[14px] border border-key-line bg-(image:--sp-key) pb-1 font-sans text-2xl font-medium text-key-glyph shadow-(--sp-key-shadow)"
                      >
                        {key}
                      </kbd>
                    ),
                  )}
                </div>
                <div className="flex max-w-100 flex-col gap-2.5">
                  <p className="text-sm leading-[1.3125rem] font-medium text-soft lg:text-[0.9375rem] lg:leading-[1.375rem]">
                    {dict.terminal.body}
                  </p>
                  <p>
                    <CardLink href={featureHref.terminal}>{dict.terminal.link}</CardLink>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature strip: two columns on phones, three on tablets and small
              laptops, one row with dividers from 1280px. Each item is a link
              to its feature page. */}
          <ul className="grid grid-cols-2 gap-x-3.5 gap-y-7 rounded-[20px] border border-bento-line bg-bento-card px-5 py-6 md:grid-cols-3 md:gap-x-6 lg:rounded-3xl lg:px-8 lg:py-7 xl:grid-cols-5 xl:gap-0 xl:divide-x xl:divide-bento-line xl:px-2">
            {stripItems.map(({ id, icon: Icon, tone, href }) => (
              <li key={id} className="xl:px-6">
                <Link href={href} className="group flex flex-col gap-2.5">
                  <span
                    aria-hidden="true"
                    className={cn("inline-flex size-10 items-center justify-center rounded-[10px]", tone)}
                  >
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <span className="text-[0.9375rem] font-semibold text-strong group-hover:underline group-hover:underline-offset-4 lg:text-base">
                    {withArrow(dict.strip[id].title, "size-4")}
                  </span>
                  <span className="text-[0.8125rem] leading-[1.1875rem] text-soft lg:text-sm lg:leading-[1.3125rem]">
                    {dict.strip[id].body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
