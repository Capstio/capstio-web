import { Container, DownloadButton, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { downloadHref } from "@/lib/site-nav";
import { HeroModes } from "./hero-modes";
import { HeroPoster } from "./hero-poster";

const headingId = "hero-heading";

// Home hero (Figma "Hero / Desktop" and "Hero / Mobile"): headline, subtitle
// that follows the Apps / Docker / Terminal switch, download button and the
// product film. Colors follow the active theme.
export function Hero({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary["home"]["hero"];
}) {
  return (
    <Section
      surface="light"
      aria-labelledby={headingId}
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="hero-dots pointer-events-none absolute inset-x-0 top-0 hidden h-130 md:block"
      />

      <Container className="relative flex flex-col items-center gap-8 md:gap-10">
        {/* Display size from Figma: 64/72 from tablet up, 40/48 on mobile; the
            longer Vietnamese headline uses 34/42 on mobile (the H1 size). Each
            Figma line is its own block and wraps, balanced, only when the
            screen is too narrow for it at full size. */}
        <h1
          id={headingId}
          className={cn(
            "type-display text-center text-balance text-heading max-md:-mb-2",
            lang === "vi" && "max-md:type-h1",
          )}
        >
          <span className="md:block">{dict.title}</span>{" "}
          <span className="block text-link">{dict.titleAccent}</span>
        </h1>

        <HeroModes dict={dict} poster={<HeroPoster alt={dict.videoAlt} />}>
          <div className="flex w-full flex-col items-center gap-4">
            <DownloadButton
              href={downloadHref}
              size="lg"
              className="h-13 w-full md:w-60"
            >
              {dict.cta}
            </DownloadButton>
            <p className="type-caption text-center text-muted">
              {dict.requirement}
            </p>
          </div>
        </HeroModes>
      </Container>
    </Section>
  );
}
