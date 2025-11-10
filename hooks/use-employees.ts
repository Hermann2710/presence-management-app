// hooks/use-employees.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

// GET - Liste des employés
export function useEmployees(filters?: {
  department?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ["employees", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.department) params.append("department", filters.department);
      if (filters?.status) params.append("status", filters.status);

      const response = await fetch(`/api/admin/employees?${params}`);
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

// GET - Détail d'un employé
export function useEmployee(id: string) {
  return useQuery({
    queryKey: ["employee", id],
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
    enabled: !!id,
  });
}

// POST - Créer un employé
export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/admin/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la création");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}

// PUT - Modifier un employé
export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/admin/employees/${id}`, {
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", variables.id] });
    },
  });
}

// DELETE - Supprimer un employé
export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la suppression");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}
