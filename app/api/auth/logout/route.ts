import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "Logged out successfully" });

  res.cookies.set("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
    path: "/",
  });

  res.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
    path: "/",
  });

  res.cookies.set("_can_logged_in", "", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 0,
    path: "/",
  });

  return res;
}
