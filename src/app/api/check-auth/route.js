import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
    return NextResponse.json({ loggedIn: true });
  } catch (err) {
    return NextResponse.json({ loggedIn: false });
  }
}
