// hooks/useAttendance.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// === EMPLOYÉ ===

// GET - Présence du jour
export function useTodayAttendance() {
  return useQuery({
    queryKey: ["attendance", "today"],
    queryFn: async () => {
      const response = await fetch("/api/employee/attendance/today");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors du chargement");
      }
      return response.json();
    },
  });
}

// GET - Liste des présences (avec filtres optionnels)
export function useEmployeeAttendances(filters?: {
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ["attendance", "employee", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);

      const response = await fetch(`/api/employee/attendance?${params}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors du chargement");
      }
      return response.json();
    },
  });
}

// GET - Présences du mois avec statistiques
export function useMonthlyAttendance(month?: string, year?: string) {
  return useQuery({
    queryKey: ["attendance", "monthly", month, year],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (month) params.append("month", month);
      if (year) params.append("year", year);

      const response = await fetch(`/api/employee/attendance/month?${params}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors du chargement");
      }
      return response.json();
    },
  });
}

// POST - Pointage (checkin/checkout)
export function useCheckInOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: "checkin" | "checkout") => {
      const response = await fetch("/api/employee/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors du pointage");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", "today"] });
      queryClient.invalidateQueries({ queryKey: ["attendance", "monthly"] });
      queryClient.invalidateQueries({ queryKey: ["attendance", "employee"] });
    },
  });
}

// === ADMIN ===

// GET - Statistiques dashboard admin
export function useAdminStats(date?: string) {
  return useQuery({
    queryKey: ["admin", "stats", date],
    queryFn: async () => {
      const params = new URLSearchParams();
      const targetDate = date || new Date().toISOString().split("T")[0];
      params.append("date", targetDate);

      // Correction du chemin - utilisez "attendances" au pluriel
      const response = await fetch(`/api/admin/attendances/stats?${params}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors du chargement des stats");
      }

      const data = await response.json();

      // Validation des données
      return {
        totalEmployees: data.totalEmployees || 0,
        presentToday: data.presentToday || 0,
        absentToday: data.absentToday || 0,
        lateToday: data.lateToday || 0,
        noAttendance: data.noAttendance || 0,
        attendanceRate: data.attendanceRate || 0,
        departmentStats: data.departmentStats || [],
        date: data.date,
      };
    },
  });
}

// GET - Liste des présences (admin) avec filtres
export function useAdminAttendances(filters?: {
  date?: string;
  department?: string;
  userId?: string;
  status?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["admin", "attendances", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.date) params.append("date", filters.date);
      if (filters?.department) params.append("department", filters.department);
      if (filters?.userId) params.append("userId", filters.userId);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.limit) params.append("limit", filters.limit.toString());

      // Assurez-vous que l'URL correspond à votre route
      const response = await fetch(`/api/admin/attendances?${params}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Erreur lors du chargement des présences"
        );
      }
      return response.json();
    },
  });
}

// PUT - Modifier une présence (admin)
export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/admin/attendances/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la modification");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "attendances"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    },
  });
}

// GET - Liste des employés (admin)
export function useEmployees() {
  return useQuery({
    queryKey: ["admin", "employees"],
    queryFn: async () => {
      const response = await fetch("/api/admin/employees");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Erreur lors du chargement des employés"
        );
      }
      return response.json();
    },
  });
}

// GET - Détail d'un employé (admin)
export function useEmployee(id: string) {
  return useQuery({
    queryKey: ["admin", "employees", id],
    queryFn: async () => {
      const response = await fetch(`/api/admin/employees/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Erreur lors du chargement de l'employé"
        );
      }
      return response.json();
    },
    enabled: !!id, // Seulement si l'ID est fourni
  });
}
