import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/profile", "/course-class"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // run check only on the selected routes
  const isProtected = protectedPaths.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next(); // continue if the route is not part of the protected routes
  }

  //   get access token
  const access_Token = request.cookies.get("access_Token")?.value;

  if (!access_Token) {
    // redirect to home page if there is no token
    const homeUrl = new URL("/", request.url);
    // homeUrl.searchParams.set("authError", "true");

    return NextResponse.redirect(homeUrl);
  }

  // if there is token, user can proceed
  return NextResponse.next();
}
