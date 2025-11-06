"use server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { RegisterEmployeeSchemaType } from "@/schemas/employee-schema";
import { generateSecurePassword } from "@/lib/utils"; // ou utils/password.ts

export async function registerEmployee(data: RegisterEmployeeSchemaType) {
  try {
    const generatedPassword = generateSecurePassword(8);
    const hashedPassword = await hash(generatedPassword, 10);

    const employee = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: "employee",
      },
    });

    return { employee, password: generatedPassword };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message || "Impossible de créer l'employé");
  }
}
