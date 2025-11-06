import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerEmployee } from "@/actions/employee-actions";
import { RegisterEmployeeSchemaType } from "@/schemas/employee-schema";

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
