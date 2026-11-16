import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  if (!session && (pathname.startsWith("/profile") || pathname.startsWith("/product"))) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("unauthorized", "1");
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/product/:path*"],
};