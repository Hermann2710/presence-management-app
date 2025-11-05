import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock users - In production, this would query your external API
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@company.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "employee@company.com",
    password: "employee123",
    name: "John Doe",
    role: "employee" as const,
    department: "Engineering",
    position: "Developer",
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // TODO: Replace with actual API call to your backend
    // const response = await fetch('YOUR_API_URL/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })

    // Mock authentication
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("session", JSON.stringify(userWithoutPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
