// components/attendances/types.ts
export interface Attendance {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  notes?: string;
  user: {
    id: string;
    name: string;
    email: string;
    department: string;
    position: string;
  };
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
}
