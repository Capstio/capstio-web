"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  hasLocale,
  localeCookie,
  localeCookieMaxAge,
  locales,
  type Locale,
} from "@/lib/i18n";

// Custom listbox dropdown (the native <select> popup cannot be styled).
// Keyboard: Arrow keys, Home, End, Enter, Space, Escape and Tab.
// The language is stored in a cookie and the URL never changes. The proxy
// picks the language from the request cookie, so the cookie is written first
// and the page is then reloaded. A full reload, not router.refresh(): the
// language is the root layout's [lang] param, so a client refresh would
// rebuild <html> in React, which re-renders the theme <script> and makes
// React report it.
function switchLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=${localeCookieMaxAge}; samesite=lax`;
  window.location.reload();
}

export function LanguageSelect({
  lang,
  label,
  names,
  triggerNames,
  variant = "plain",
  align = "start",
  placement = "bottom",
  className,
}: {
  lang: Locale;
  label: string;
  // Full language names shown in the list.
  names: Record<Locale, string>;
  // Optional shorter names for the trigger, for example VI and EN in the header.
  triggerNames?: Record<Locale, string>;
  // "plain" has no border (header); "outlined" has one (footer, mobile menu).
  variant?: "plain" | "outlined";
  align?: "start" | "end";
  // "top" opens the list upward, for controls near the bottom of the page.
  placement?: "bottom" | "top";
  className?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // Move focus to the active option while the list is open.
  useEffect(() => {
    if (open) optionRefs.current[active]?.focus();
  }, [open, active]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openList() {
    setActive(Math.max(0, locales.indexOf(lang)));
    setOpen(true);
  }

  function select(next: Locale) {
    setOpen(false);
    buttonRef.current?.focus();
    if (next === lang || !hasLocale(next)) return;
    switchLocale(next);
  }

  function onOptionKeyDown(event: React.KeyboardEvent, locale: Locale) {
    const last = locales.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((index) => (index >= last ? 0 : index + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((index) => (index <= 0 ? last : index - 1));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(locale);
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openList();
          }
        }}
        className={cn(
          "type-small inline-flex w-full items-center gap-2 rounded-md px-2.5 font-medium text-heading transition-colors hover:bg-heading/10 motion-reduce:transition-none",
          variant === "outlined" ? "h-10 border border-line" : "h-9",
          open && "bg-heading/10",
        )}
      >
        <Globe aria-hidden="true" className="size-4 shrink-0 text-body" />
        <span className="flex-1 text-left">
          {(triggerNames ?? names)[lang]}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 shrink-0 text-muted transition-transform motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={cn(
            "absolute z-20 w-max min-w-full rounded-md border border-line bg-surface p-1 shadow-lg",
            placement === "top" ? "bottom-full mb-2" : "top-full mt-2",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {locales.map((locale, index) => (
            <li
              key={locale}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              role="option"
              aria-selected={locale === lang}
              tabIndex={-1}
              lang={locale}
              onClick={() => select(locale)}
              onKeyDown={(event) => onOptionKeyDown(event, locale)}
              className={cn(
                "type-small flex cursor-pointer items-center justify-between gap-6 rounded-sm px-3 py-2 text-body outline-none transition-colors hover:bg-heading/10 hover:text-heading focus-visible:bg-heading/10 focus-visible:text-heading motion-reduce:transition-none",
                locale === lang && "font-medium text-heading",
              )}
            >
              {names[locale]}
              {locale === lang && (
                <Check aria-hidden="true" className="size-4 text-accent" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
