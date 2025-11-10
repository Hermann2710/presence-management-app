export interface DepartmentStat {
  department: string;
  total: number;
  present: number;
  absent?: number;
  attendanceRate?: number;
}

export interface AdminStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  noAttendance: number;
  attendanceRate: number;
  departmentStats: DepartmentStat[];
  date: string;
}

export interface MonthlyStats {
  month: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

export interface DepartmentChartData {
  name: string;
  value: number;
  color: string;
  total: number;
  present: number;
}
