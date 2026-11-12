import { NextResponse, type NextRequest } from "next/server";
import {
  hasLocale,
  localeCookie,
  localeCookieMaxAge,
  resolveLocale,
} from "@/lib/i18n";

// URLs carry no language. The locale comes from the cookie (or the browser
// language) and the request is rewritten internally to /<locale>/..., so every
// page stays statically rendered per language.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first = "", ...rest] = pathname.split("/");

  // Old links such as /en/features: drop the prefix and remember that language.
  if (hasLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${rest.join("/")}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(localeCookie, first, {
      path: "/",
      maxAge: localeCookieMaxAge,
      sameSite: "lax",
    });
    return response;
  }

  const locale = resolveLocale(
    request.cookies.get(localeCookie)?.value,
    request.headers.get("accept-language"),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  // The same URL serves both languages, so caches must key on the cookie.
  response.headers.append("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
