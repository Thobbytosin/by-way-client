import { SERVER_URI } from "@/config/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const ACCESS_TOKEN_EXPIRY = Number(process.env.ACCESS_TOKEN_EXPIRY);
  const LOGGEDIN_TOKEN_EXPIRY = Number(process.env.LOGGEDIN_TOKEN_EXPIRY);
  const REFRESH_TOKEN_EXPIRY = Number(process.env.REFRESH_TOKEN_EXPIRY);

  const body = await req.json();

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

  if (data.data.accessToken) {
    res.cookies.set("access_token", data.data.accessToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: ACCESS_TOKEN_EXPIRY * 60,
      path: "/",
    });
  }

  if (data.data.refreshToken) {
    res.cookies.set("refresh_token", data.data.refreshToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: REFRESH_TOKEN_EXPIRY * 24 * 60 * 60,
      path: "/",
    });
  }

  if (data.data.loggedInToken) {
    res.cookies.set("_can_logged_in", data.data.loggedInToken, {
      httpOnly: false, // This one is readable by client
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: LOGGEDIN_TOKEN_EXPIRY * 24 * 60 * 60,
      path: "/",
    });
  }

  return res;
}
