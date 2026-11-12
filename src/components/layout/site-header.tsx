"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, DownloadButton, Logo } from "@/components/ui";
import { cn, localizedHref } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import {
  allFeaturesHref,
  downloadHref,
  featureHref,
  featureKeys,
  solutionHref,
  solutionKeys,
  topLinkHref,
} from "@/lib/site-nav";
import { FeaturesMenu, SolutionsMenu } from "./header-menus";
import { LanguageSelect } from "./language-select";
import { ThemeToggle } from "./theme-toggle";

type MenuId = "features" | "solutions";

type SiteHeaderProps = {
  lang: Locale;
  dict: Pick<
    Dictionary,
    | "common"
    | "header"
    | "features"
    | "solutions"
    | "languages"
    | "languagesShort"
  >;
  announcement?: boolean;
};

const navTrigger =
  "type-small inline-flex h-9 items-center gap-1 rounded-md px-3 font-medium text-body transition-colors hover:text-heading motion-reduce:transition-none";

export function SiteHeader({
  lang,
  dict,
  announcement = true,
}: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);

  // After 24px of scroll the bar becomes a floating glass pill. The glass picks
  // the color context of the block it floats over, not only the page theme.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth >= 1024) setMobileOpen(false);
      setScrolled(window.scrollY > 24);

      const pill = pillRef.current;
      const header = headerRef.current;
      if (!pill || !header) return;
      const rect = pill.getBoundingClientRect();
      const stack = document.elementsFromPoint(
        window.innerWidth / 2,
        rect.top + rect.height / 2,
      );
      const surfaceEl = stack
        .filter((el) => !header.contains(el))
        .map((el) => el.closest("[data-surface]"))
        .find(Boolean);
      const surface = surfaceEl?.getAttribute("data-surface");
      setOverDark(
        surface === "dark" ||
          document.documentElement.classList.contains("dark"),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const themeObserver = new MutationObserver(schedule);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      themeObserver.disconnect();
    };
  }, []);

  // Close menus on outside click or Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const compact = scrolled && !mobileOpen;
  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };
  const href = (path: string) => localizedHref(lang, path);
  const showBar = announcement && !compact && !mobileOpen;

  const ctaButton = (className?: string) => (
    <DownloadButton
      href={href(downloadHref)}
      onClick={closeAll}
      className={className}
    >
      {dict.common.ctaDownload}
    </DownloadButton>
  );

  const names = dict.languages;
  const toggleMenu = (id: MenuId) =>
    setOpenMenu((current) => (current === id ? null : id));

  return (
    <header
      ref={headerRef}
      // Reserves the space of the bar so the fixed header never covers content.
      className={cn(
        "relative z-50",
        announcement ? "h-26 lg:h-28" : "h-16 lg:h-18",
      )}
    >
      <div
        className={cn(
          "fixed inset-x-0 top-0 transition-[padding] duration-200 ease-out motion-reduce:transition-none",
          compact && "px-3 pt-3 lg:px-4 lg:pt-4",
        )}
      >
        {showBar && (
          <div
            data-surface="dark"
            className="type-caption flex h-10 items-center justify-center gap-3 border-b border-line px-4 text-center text-white"
          >
            <span>{dict.header.announcement}</span>
            <Link
              href={href(topLinkHref.releaseNotes)}
              className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
            >
              {dict.header.announcementLink}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </div>
        )}

        <div
          ref={pillRef}
          data-surface={compact && overDark ? "dark" : undefined}
          className={cn(
            "mx-auto w-full transition-[max-width,height,border-radius,box-shadow] duration-200 ease-out motion-reduce:transition-none",
            compact
              ? "header-glass h-14 max-w-300 rounded-full shadow-md lg:h-16"
              : "h-16 max-w-[2400px] border-b border-line bg-page lg:h-18",
          )}
        >
          <div
            className={cn(
              "flex h-full items-center gap-6",
              compact
                ? "px-4 lg:px-5"
                : "px-[max(1rem,calc((100%-1200px)/2))] md:px-[max(2rem,calc((100%-1200px)/2))]",
            )}
          >
            <Link href={href("/")} aria-label={dict.common.home} onClick={closeAll}>
              <Logo />
            </Link>

            <nav
              aria-label={dict.common.mainNav}
              className="hidden items-center gap-1 lg:flex"
            >
              {(["features", "solutions"] as const).map((id) => (
                <div key={id} className="relative">
                  <button
                    type="button"
                    aria-expanded={openMenu === id}
                    aria-controls={`menu-${id}`}
                    onClick={() => toggleMenu(id)}
                    className={cn(
                      navTrigger,
                      openMenu === id && "bg-heading/10 text-heading",
                    )}
                  >
                    {dict.header.nav[id]}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-4 text-muted transition-transform motion-reduce:transition-none",
                        openMenu === id && "rotate-180",
                      )}
                    />
                  </button>
                  {openMenu === id &&
                    (id === "features" ? (
                      <FeaturesMenu lang={lang} dict={dict} onNavigate={closeAll} />
                    ) : (
                      <SolutionsMenu lang={lang} dict={dict} onNavigate={closeAll} />
                    ))}
                </div>
              ))}
              {(["compare", "insights", "releaseNotes"] as const).map((id) => (
                <Link
                  key={id}
                  href={href(topLinkHref[id])}
                  className={navTrigger}
                >
                  {dict.header.nav[id]}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <LanguageSelect
                lang={lang}
                label={dict.common.language}
                names={dict.languagesShort}
              />
              <ThemeToggle label={dict.common.theme} />
              {ctaButton()}
            </div>

            <Button
              variant="secondary"
              aria-label={mobileOpen ? dict.common.closeMenu : dict.common.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((open) => !open)}
              className="ml-auto size-10 border-0 p-0 lg:hidden"
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-page px-4 pb-8 lg:hidden"
          >
            <details className="group border-b border-line" open>
              <summary className="type-body flex h-12 cursor-pointer list-none items-center justify-between font-medium text-heading">
                {dict.header.nav.features}
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform group-open:rotate-180"
                />
              </summary>
              <ul className="grid grid-cols-2 gap-x-4 pb-4">
                {featureKeys.map((key) => (
                  <li key={key}>
                    <Link
                      href={href(featureHref[key])}
                      onClick={closeAll}
                      className="type-small block py-2 text-body hover:text-heading"
                    >
                      {dict.features[key].title}
                    </Link>
                  </li>
                ))}
                <li className="col-span-2 pt-1">
                  <Link
                    href={href(allFeaturesHref)}
                    onClick={closeAll}
                    className="type-small font-medium text-link"
                  >
                    {dict.header.allFeatures}
                  </Link>
                </li>
              </ul>
            </details>

            <details className="group border-b border-line">
              <summary className="type-body flex h-12 cursor-pointer list-none items-center justify-between font-medium text-heading">
                {dict.header.nav.solutions}
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform group-open:rotate-180"
                />
              </summary>
              <ul className="pb-4">
                {solutionKeys.map((key) => (
                  <li key={key}>
                    <Link
                      href={href(solutionHref[key])}
                      onClick={closeAll}
                      className="type-small block py-2 text-body hover:text-heading"
                    >
                      {dict.solutions[key].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            {(["compare", "insights", "releaseNotes"] as const).map((id) => (
              <Link
                key={id}
                href={href(topLinkHref[id])}
                onClick={closeAll}
                className="type-body flex h-12 items-center border-b border-line font-medium text-heading"
              >
                {dict.header.nav[id]}
              </Link>
            ))}

            <div className="mt-6 flex gap-3">
              <LanguageSelect
                lang={lang}
                label={dict.common.language}
                names={names}
                variant="outlined"
                className="flex-1"
              />
              <ThemeToggle
                variant="labeled"
                label={dict.common.theme}
                lightLabel={dict.common.themeLight}
                darkLabel={dict.common.themeDark}
              />
            </div>
            {ctaButton("mt-3 w-full")}
          </div>
        )}
      </div>
    </header>
  );
}
