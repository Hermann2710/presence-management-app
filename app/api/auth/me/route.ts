import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const user = JSON.parse(session.value)
    return NextResponse.json({ user })
  } catch (error) {
    console.error("[v0] Auth check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
