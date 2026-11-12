export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

// Vietnamese is the primary language of the product.
export const defaultLocale: Locale = "vi";

// The chosen language lives in this cookie, not in the URL.
export const localeCookie = "capstio-lang";
export const localeCookieMaxAge = 60 * 60 * 24 * 365;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Picks the first supported language from an Accept-Language header value.
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase().split("-")[0];
    if (tag && hasLocale(tag)) return tag;
  }
  return defaultLocale;
}

// Cookie first (explicit choice), then the browser language, then the default.
export function resolveLocale(
  cookieValue: string | undefined,
  acceptLanguage: string | null,
): Locale {
  if (cookieValue && hasLocale(cookieValue)) return cookieValue;
  return negotiateLocale(acceptLanguage);
}
