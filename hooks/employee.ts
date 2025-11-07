import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteEmployee,
  registerEmployee,
  updateEmployee,
} from "@/actions/employee-actions";
import {
  RegisterEmployeeSchemaType,
  UpdateEmployeeSchemaType,
} from "@/schemas/employee-schema";

export function useRegisterEmployeeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterEmployeeSchemaType) => {
      return await registerEmployee(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      toast.success("Employé enregistré avec succès !");
    },

    onError: (error: any) => {
      toast.error(error.message || "Une erreur est survenue");
    },
  });
}

export function useFetchEmployees({
  page = 1,
  limit = 10,
  search = "",
  skip = 0,
}: {
  page?: number;
  limit?: number;
  search?: string;
  skip?: number;
}) {
  return useQuery({
    queryKey: ["employees", page, limit, search, skip],
    queryFn: async ({ queryKey }) => {
      const [, page, limit, search, skip] = queryKey;

      const query = await fetch(
        `/api/employees?page=${page}&limit=${limit}&search=${search}&skip=${skip}`
      );

      const result = await query.json();

      return result;
    },
  });
}

export function useUpdateEmployeeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateEmployeeSchemaType) =>
      await updateEmployee(data),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      toast.success(`Employé ${data.name} modifié avec sussès`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}

export function useDeleteEmployeeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteEmployee(id),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      toast.success(`Employé ${data.name} supprimé avec sussès`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}
