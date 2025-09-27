import { NextResponse } from "next/server";
import admin from "./src/lib/firebaseAdmin";

const protectedRoutes = ["/dashboard", "/careers", "/scholarships", "/advice"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const sessionCookie = req.cookies.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await admin.auth().verifySessionCookie(sessionCookie, true);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/careers/", "/scholarships/", "/advice/"],
};
