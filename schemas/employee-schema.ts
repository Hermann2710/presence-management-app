import { z } from "zod";

export const RegisterEmployeeSchema = z.object({
  name: z
    .string({
      message: "Le nom de l'employé est requis!",
    })
    .min(1, "Le nom est trop court!"),
  email: z
    .string({
      message: "L'email de l'employé est requis!",
    })
    .email("Email invalide!"),
  phone: z
    .string({
      message: "Le numéro de téléphone de l'employé est requis!",
    })
    .min(1, "Le telephone est trop court"),
  department: z
    .string({
      message: "Le département de l'employé est requis!",
    })
    .min(1, "Le nom du departement est trop court!"),
  position: z.string({
    message: "Le poste de l'employé est requis!",
  }),
});

export type RegisterEmployeeSchemaType = z.infer<typeof RegisterEmployeeSchema>;

export const UpdateEmployeeSchema = z.object({
  id: z.string(),
  status: z.enum(["active", "inactive"]),
  role: z.enum(["admin", "employee"]),
  department: z.string().optional(),
  position: z.string().optional(),
});

export type UpdateEmployeeSchemaType = z.infer<typeof UpdateEmployeeSchema>;
