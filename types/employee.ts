export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  department: string | null;
  position: string | null;
  status: string;
  createdAt: string;
  _count: {
    attendances: number;
  };
}

export interface EmployeesStats {
  total: number;
  active: number;
  inactive: number;
  withDepartment: number;
  withoutDepartment: number;
}
