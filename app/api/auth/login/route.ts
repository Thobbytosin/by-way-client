import { SERVER_URI } from "@/config/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const body = await req.json();

  // Forward login request to your backend server
  const backendRes = await fetch(`${SERVER_URI}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const res = NextResponse.json(data);

  //   console.log("DATA:", data);

  // ✅ Set access token and refresh token as cookies on frontend domain
  if (data.data.accessToken) {
    res.cookies.set("access_Token", data.data.accessToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 1 * 60, // 59 minutes
      path: "/",
    });
  }

  if (data.data.refreshToken) {
    res.cookies.set("refresh_Token", data.data.refreshToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60, // 1 day
      path: "/",
    });
  }

  if (data.data.loggedInToken) {
    res.cookies.set("_can_logged_t", data.data.loggedInToken, {
      httpOnly: false, // This one is readable by client
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days or whatever you want
      path: "/",
    });
  }

  return res;
}
