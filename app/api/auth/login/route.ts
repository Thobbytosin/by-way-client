import { SERVER_URI } from "@/config/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Forward login request to your backend server
  const backendRes = await fetch(`${SERVER_URI}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include", // Include backend cookies if needed
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const res = NextResponse.json(data);

  // ✅ Set access token and refresh token as cookies on frontend domain
  if (data.data.accessToken) {
    res.cookies.set("access_token", data.data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1 * 60, // 30 minutes
      path: "/",
    });
  }

  if (data.data.refreshToken) {
    res.cookies.set("refresh_token", data.data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60, // 1 day
      path: "/",
    });
  }

  if (data.data.loggedInToken) {
    res.cookies.set("_can_logged_in", data.data.loggedInToken, {
      httpOnly: false, // This one is readable by client
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60, // 7 days or whatever you want
      path: "/",
    });
  }

  return res;
}
