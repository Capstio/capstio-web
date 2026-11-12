import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, negotiateLocale } from "@/lib/i18n";

// Redirects paths without a locale prefix to the negotiated locale.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(first)) return;

  const locale = negotiateLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any path with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
