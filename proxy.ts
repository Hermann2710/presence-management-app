import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export async function proxy(req: NextRequest) {
  const session = await auth()

  const { pathname } = req.nextUrl

  // 🔓 Public routes
  if (pathname === "/login") {
    if (session) {
      const redirectUrl =
        session.user.role === "admin" ? "/admin" : "/employee"
      return NextResponse.redirect(new URL(redirectUrl, req.url))
    }
    return NextResponse.next()
  }

  // 🔒 Protected routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/employee")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    const userRole = session.user.role

    // 🚫 Access control
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/employee", req.url))
    }

    if (pathname.startsWith("/employee") && userRole !== "employee") {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
  }

  return NextResponse.next()
}

// ⚡ Important : matcher toutes les routes sauf API et assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
