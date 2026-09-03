// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ==========================================
  // ROLE & AUTH PROTECTION: /admin-dashboard
  // ==========================================
  if (pathname === '/admin-dashboard' || pathname.startsWith('/admin-dashboard/')) {
    const authToken = request.cookies.get('seo-auth-token')?.value;

    let isValid = false;
    let userRole = null;

    try {
      const decoded = JSON.parse(Buffer.from(authToken || '', 'base64').toString());
      if (decoded.exp > Date.now()) {
        isValid = true;
        userRole = decoded.role;
      }
    } catch {
      isValid = false;
    }

    // 1. If not logged in at all, redirect to login
    if (!isValid) {
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. If logged in, but lacks the ADMIN role, block/redirect them
    if (userRole !== 'ADMIN') {
      const unauthorizedUrl = new URL('/unauthorized', request.url); // Or any fallback page
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  // Header logics
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next|api|assets|icons|.*\\..*).*)",
    "/seo",
    "/seo/:path*",
  ],
};