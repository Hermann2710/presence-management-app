import { z } from "zod";

export const RegisterEmployeeSchema = z.object({
  name: z.string({
    message: "Le nom de l'employé est requis!",
  }),
  email: z
    .string({
      message: "L'email de l'employé est requis!",
    })
    .email("Email invalide!"),
  phone: z.string({
    message: "Le numéro de téléphone de l'employé est requis!",
  }),
  department: z.string({
    message: "Le département de l'employé est requis!",
  }),
  position: z.string({
    message: "Le poste de l'employé est requis!",
  }),
});

export type RegisterEmployeeSchemaType = z.infer<typeof RegisterEmployeeSchema>;
