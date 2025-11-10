// app/api/admin/employees/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UserStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }
    // Récupérer les query params pour les filtres
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const status = searchParams.get("status");

    const statusParam: UserStatus | undefined = status
      ? (status as unknown as UserStatus)
      : undefined;

    const employees = await prisma.user.findMany({
      where: {
        role: "EMPLOYEE",
        ...(department && { department }),
        ...(statusParam && { status: statusParam }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        department: true,
        position: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            attendances: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return Response.json(employees);
    return Response.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, phone, department, position, password } = body;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "Un employé avec cet email existe déjà" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 12);

    const employee = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        department,
        position,
        password: hashedPassword,
        role: "EMPLOYEE",
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        department: true,
        position: true,
        status: true,
        createdAt: true,
      },
    });

    return Response.json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
