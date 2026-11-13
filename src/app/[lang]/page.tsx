import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { UnifiedApps } from "@/components/home/unified-apps";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { home } = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={home.hero} />
      <Problem dict={home.problem} />
      <UnifiedApps dict={home.unifiedApps} />
    </>
  );
}
