import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name
      },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;

  } catch (err) {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
  }
}
