"use server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import {
  RegisterEmployeeSchemaType,
  UpdateEmployeeSchemaType,
} from "@/schemas/employee-schema";
import { generateSecurePassword } from "@/lib/utils";

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

export async function deleteEmployee(id: string) {
  try {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message || "Impossible de supprimer l'employé");
  }
}

export async function updateEmployee(data: UpdateEmployeeSchemaType) {
  try {
    return await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message || "Impossible de modifier l'employé");
  }
}
