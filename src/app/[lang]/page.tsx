import { notFound } from "next/navigation";
import { Container, Overline, Section } from "@/components/ui";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

// Home page skeleton. The hero is a light block marked as a demo placeholder
// until its mockup is added.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { home } = await getDictionary(lang);

  return (
    <Section surface="light" aria-label={home.heroDemo.label}>
      <Container>
        <div className="flex min-h-[32rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong p-8 text-center">
          <Overline>{home.heroDemo.label}</Overline>
          <p className="type-small text-muted">{home.heroDemo.note}</p>
        </div>
      </Container>
    </Section>
  );
}
