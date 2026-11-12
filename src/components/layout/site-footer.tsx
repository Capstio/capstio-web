import Link from "next/link";
import { ButtonLink, Container, Logo } from "@/components/ui";
import { localizedHref } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { ctaHref, footerColumns } from "@/lib/site-nav";
import { AppleIcon } from "./apple-icon";
import { LanguageSelect } from "./language-select";
import { ThemeToggle } from "./theme-toggle";

type SiteFooterProps = {
  lang: Locale;
  dict: Pick<
    Dictionary,
    "common" | "footer" | "features" | "solutions" | "languages"
  >;
  cta?: "beta" | "download";
};

export function SiteFooter({ lang, dict, cta = "beta" }: SiteFooterProps) {
  const { footer } = dict;

  return (
    <footer className="border-t border-line bg-page py-12 lg:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[19rem_repeat(5,minmax(0,1fr))] lg:gap-x-6">
          <div>
            <Link href={localizedHref(lang, "/")} aria-label={dict.common.home}>
              <Logo />
            </Link>
            <p className="type-body mt-4 max-w-72 text-heading">
              {footer.tagline}
            </p>
            <p className="type-small mt-4 text-muted">{footer.requirement}</p>
            <ButtonLink
              href={localizedHref(lang, ctaHref[cta])}
              size="md"
              className="mt-6 w-full lg:w-auto"
            >
              {cta === "download" && <AppleIcon className="size-4" />}
              {cta === "download" ? dict.common.ctaDownload : dict.common.ctaBeta}
            </ButtonLink>
          </div>

          <nav
            aria-label={dict.common.footerNav}
            className="grid grid-cols-2 gap-x-4 gap-y-8 lg:col-span-5 lg:grid-cols-5 lg:gap-x-6"
          >
            {footerColumns.map((column) => (
              <div key={column.id}>
                <h2 className="type-small font-semibold text-heading">
                  {footer.columns[column.id]}
                </h2>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={localizedHref(lang, link.href)}
                        className="type-small text-muted transition-colors hover:text-heading motion-reduce:transition-none"
                      >
                        {linkLabel(dict, link.id)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 lg:order-2">
            <LanguageSelect
              lang={lang}
              label={dict.common.language}
              names={dict.languages}
              variant="outlined"
            />
            <ThemeToggle
              label={dict.common.theme}
              className="border border-line"
            />
          </div>
          <p className="type-caption text-muted lg:order-1">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}

// Feature and solution links reuse the titles of the header menus; the rest are
// footer-only labels.
function linkLabel(dict: SiteFooterProps["dict"], id: string): string {
  if (id in dict.features) {
    return dict.features[id as keyof typeof dict.features].title;
  }
  if (id in dict.solutions) {
    return dict.solutions[id as keyof typeof dict.solutions].title;
  }
  return dict.footer.links[id as keyof typeof dict.footer.links];
}
