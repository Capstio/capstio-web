// Joins class names, skipping falsy values.
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

// Prefixes an app path with the active locale.
export function localizedHref(lang: string, path: string): string {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}
