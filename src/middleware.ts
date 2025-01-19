import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (path.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect("/login");
    } else return NextResponse.next();
  }
  if (isPublicPath && token) {
    request.cookies.set("token", "");
    return NextResponse.next();
  }
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*", "/login", "/signup"],
};


// import jwt from "jsonwebtoken";
// Middleware runs on Edge Runtime, so it does not support Node.js modules like jsonwebtoken. Use Web Crypto API or delegate verification to API routes.
// API routes in Next.js run in the Node.js environment and fully support jsonwebtoken and other Node.js modules.
// Use middleware for lightweight tasks (e.g., checking for the presence of cookies, redirecting unauthenticated users).
