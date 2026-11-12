"use server";

import { cookies } from "next/headers";
import { hasLocale, localeCookie, localeCookieMaxAge } from "./i18n";

// Remembers the visitor's language. Setting a cookie in a Server Action makes
// Next re-render the current page, which the proxy then rewrites to that language.
export async function setLocale(locale: string) {
  if (!hasLocale(locale)) return;
  (await cookies()).set(localeCookie, locale, {
    path: "/",
    maxAge: localeCookieMaxAge,
    sameSite: "lax",
  });
}
