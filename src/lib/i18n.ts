export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

// Vietnamese is the primary language of the product.
export const defaultLocale: Locale = "vi";

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
