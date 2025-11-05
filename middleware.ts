import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")
  const { pathname } = request.nextUrl

  // Public routes
  if (pathname === "/login") {
    if (session) {
      // Redirect to appropriate dashboard if already logged in
      const user = JSON.parse(session.value)
      const redirectUrl = user.role === "admin" ? "/admin" : "/employee"
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
    return NextResponse.next()
  }

  // Protected routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/employee")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const user = JSON.parse(session.value)

    // Role-based access control
    if (pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/employee", request.url))
    }

    if (pathname.startsWith("/employee") && user.role !== "employee") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
