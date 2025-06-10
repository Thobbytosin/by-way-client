import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access_Token = request.cookies.get("access_Token")?.value;

  console.log("ALL COOKIES:", request.cookies.getAll());

  console.log("Path:", pathname);
  console.log("Token exists:", Boolean(access_Token));

  const isProtected = ["/profile", "/course-class", "/admin"].some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  if (!access_Token) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/course-class/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
