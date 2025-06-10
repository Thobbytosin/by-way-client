import { SERVER_URI } from "@/config/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";
  const ACCESS_TOKEN_EXPIRY = Number(process.env.ACCESS_TOKEN_EXPIRY);
  const LOGGEDIN_TOKEN_EXPIRY = Number(process.env.LOGGEDIN_TOKEN_EXPIRY);
  const REFRESH_TOKEN_EXPIRY = Number(process.env.REFRESH_TOKEN_EXPIRY);

  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "No refresh token found" },
      { status: 401 }
    );
  }

  const backendRes = await fetch(`${SERVER_URI}/refresh-tokens`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${refreshToken}`,
    },
    credentials: "include",
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const res = NextResponse.json(data);

  if (data?.accessToken) {
    res.cookies.set("access_token", data.accessToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: ACCESS_TOKEN_EXPIRY * 60,
      path: "/",
    });
  }

  if (data?.refreshToken) {
    res.cookies.set("refresh_token", data.refreshToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: REFRESH_TOKEN_EXPIRY * 24 * 60 * 60,
      path: "/",
    });
  }

  if (data?.loggedInToken) {
    res.cookies.set("_can_logged_in", data.loggedInToken, {
      httpOnly: false, // This one is readable by client
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: LOGGEDIN_TOKEN_EXPIRY * 24 * 60 * 60,
      path: "/",
    });
  }

  return res;
}
