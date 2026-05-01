import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the landing page to be visible without the beta gate
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow Next/internal assets so the app can load correctly
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/web-app-manifest-192x192.png" ||
    pathname === "/web-app-manifest-512x512.png" ||
    pathname.startsWith("/branding") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  const auth = request.headers.get("authorization");

  const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASS;

  if (!username || !password) {
    return new Response("Basic auth is not configured", { status: 500 });
  }

  if (!auth) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="TruWork Private Beta"',
      },
    });
  }

  const encoded = auth.split(" ")[1];
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(":");

  if (user === username && pass === password) {
    return NextResponse.next();
  }

  return new Response("Access denied", { status: 403 });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};