import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(
    `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}authorizationToken`
  )?.value;
  const { pathname } = request.nextUrl;

  // Redirect root path to dashboard
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is NOT authenticated and tries to access a protected route, redirect to login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If the user IS authenticated and tries to access the login page, redirect them to the dashboard
  if (token && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Define protected and restricted routes
export const config = {
  matcher: ["/", "/dashboard/:path*", "/signin", "/book-a-demo"], // Added root path to matcher
};
