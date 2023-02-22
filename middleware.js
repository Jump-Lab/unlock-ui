// middleware.ts
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";

const regexURL = new RegExp("/((?!user).*)");

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    //match everything except /user
    "/bid",
    "/blog/:path*",
    "/carrers/:path*",
    "/case-studies/:path*",
    "/collection/:path*",
    "/contact/:path*",
    "/create/:path*",
    "/help-center/:path*",
    "/home/:path*",
    "/item/:path*",
    "/login",
    "/maintenance",
    "/newsletter/:path*",
    "/partners/:path*",
    "/platform_status",
    "/rankkings",
    "/single_post/:path*",
    "/tarms",
    "/wallet",
  ],
};
