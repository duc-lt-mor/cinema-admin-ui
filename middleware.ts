import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "react-toastify";

export function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  const hasSessionToken = request.cookies.has("next-auth.session-token");
  const isSignInRoute = redirectUrl.pathname === "/signin";

  if (hasSessionToken && isSignInRoute) {
    redirectUrl.pathname = "/film";
    return NextResponse.redirect(redirectUrl);
  } else if (!hasSessionToken && !isSignInRoute) {
    redirectUrl.pathname = "/signin";
    toast.info("Sign in to continue");
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
