import { notFound } from "next/navigation";
import {
  ButtonLink,
  CodeStrip,
  Container,
  DownloadButton,
  Overline,
  Section,
  StatusBadge,
} from "@/components/ui";
import { localizedHref } from "@/lib/cn";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { downloadHref } from "@/lib/site-nav";

// Placeholder home page: shows the tokens and basic components inside the
// shared header and footer until the real homepage blocks are built.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { common, home } = await getDictionary(lang);

  return (
    <Section surface="dark" className="py-24 lg:py-32">
      <Container>
        <Overline>{home.overline}</Overline>
        <h1 className="type-display mt-4 max-w-4xl text-heading">{home.title}</h1>
        <p className="type-body-l mt-6 max-w-2xl text-body">{home.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <DownloadButton href={localizedHref(lang, downloadHref)} size="lg">
            {common.ctaDownload}
          </DownloadButton>
          <ButtonLink
            href={localizedHref(lang, "/features")}
            variant="link"
            size="lg"
          >
            {home.secondaryCta}
          </ButtonLink>
        </div>
        <p className="type-small mt-4 text-muted">{home.requirement}</p>
        <div className="mt-10 max-w-xl space-y-4">
          <CodeStrip>cd /opt/demo-api &amp;&amp; docker compose restart</CodeStrip>
          <StatusBadge>{home.statusRunning}</StatusBadge>
        </div>
      </Container>
    </Section>
  );
}
