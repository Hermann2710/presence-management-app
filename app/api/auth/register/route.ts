import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const currentUser = JSON.parse(session.value)
    if (currentUser.role !== "admin") {
      return NextResponse.json({ message: "Only admins can create users" }, { status: 403 })
    }

    const { email, password, name, role, department, position } = await request.json()

    // TODO: Replace with actual API call to your backend
    // const response = await fetch('YOUR_API_URL/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, name, role, department, position }),
    // })

    // Mock user creation
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      department,
      position,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error("[v0] Register error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
