export type UserRole = "admin" | "employee"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

export interface Employee extends User {
  role: "employee"
  department?: string
  position?: string
}

export interface Admin extends User {
  role: "admin"
}

export interface Attendance {
  id: string
  employeeId: string
  employeeName: string
  date: string
  checkIn: string
  checkOut?: string
  status: "present" | "absent" | "late"
  notes?: string
}

export interface AttendanceStats {
  totalDays: number
  presentDays: number
  absentDays: number
  lateDays: number
  attendanceRate: number
}
