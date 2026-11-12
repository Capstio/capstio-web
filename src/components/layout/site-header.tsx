"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, DownloadButton, Logo } from "@/components/ui";
import { cn } from "@/lib/cn";
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
};

const navTrigger =
  "type-small inline-flex h-9 items-center gap-1 rounded-md px-3 font-medium text-body transition-colors hover:text-heading motion-reduce:transition-none";

export function SiteHeader({ lang, dict }: SiteHeaderProps) {
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

  const ctaButton = (className?: string) => (
    <DownloadButton
      href={downloadHref}
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
      className="relative z-50 h-16 lg:h-18"
    >
      <div className="fixed inset-x-0 top-0">
        {/*
          One element morphs between the full-width bar and the floating pill. Its
          edges, height, radius and inner padding all transition together, so the
          content glides inward with the background instead of jumping first.
        */}
        <div
          ref={pillRef}
          data-surface={compact && overDark ? "dark" : undefined}
          className={cn(
            "header-glass absolute flex items-center gap-6 border-b transition-[left,right,top,height,padding,border-radius,background-color,border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none",
            compact
              ? "top-3 right-[max(0.75rem,calc((100%-1200px)/2))] left-[max(0.75rem,calc((100%-1200px)/2))] h-14 rounded-[1.75rem] border-transparent bg-(--glass-tint) px-4 shadow-md lg:top-4 lg:right-[max(1rem,calc((100%-1200px)/2))] lg:left-[max(1rem,calc((100%-1200px)/2))] lg:h-16 lg:rounded-[2rem] lg:px-5"
              : "top-0 right-0 left-0 h-16 rounded-none border-line bg-page px-[max(1rem,calc((100%-1200px)/2))] shadow-none md:px-[max(2rem,calc((100%-1200px)/2))] lg:h-18",
          )}
        >
          <Link href="/" aria-label={dict.common.home} onClick={closeAll}>
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
                    <FeaturesMenu dict={dict} onNavigate={closeAll} />
                  ) : (
                    <SolutionsMenu dict={dict} onNavigate={closeAll} />
                  ))}
              </div>
            ))}
            {(["compare", "insights", "releaseNotes"] as const).map((id) => (
              <Link
                key={id}
                href={topLinkHref[id]}
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
              names={dict.languages}
              triggerNames={dict.languagesShort}
              align="end"
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
                      href={featureHref[key]}
                      onClick={closeAll}
                      className="type-small block py-2 text-body hover:text-heading"
                    >
                      {dict.features[key].title}
                    </Link>
                  </li>
                ))}
                <li className="col-span-2 pt-1">
                  <Link
                    href={allFeaturesHref}
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
                      href={solutionHref[key]}
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
                href={topLinkHref[id]}
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
