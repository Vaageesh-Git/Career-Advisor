import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const publicPaths = ["/", "/login"];
  const protectedPaths = ["/dashboard", "/scholarships", "/profile","/questionare",'/api'];

  const publicApiRoutes = [
    "/api/login",
    "/api/signup",
    "/api/profiles",
    '/api/db-data'
  ];

  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const isPublic = publicPaths.includes(path);
  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  const isApiRoute = path.startsWith("/api");
  const isPublicApi = publicApiRoutes.some((p) => path.startsWith(p));

  if (isApiRoute && isPublicApi) {
    return NextResponse.next();
  }

  if (isPublic && token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (err) {
      return NextResponse.next();
    }
  }

  if (isProtected) {
    if (!token) {
      if (isApiRoute) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",              
    "/login",         
    "/dashboard/:path*",
    "/scholarships/:path*",
    "/profile/:path*",
    "/questionare/:path*",
    "/api/:path*"
  ],
};