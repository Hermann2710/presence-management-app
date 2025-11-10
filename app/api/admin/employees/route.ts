// app/api/admin/employees/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }

    const employees = await prisma.user.findMany({
      where: { role: "EMPLOYEE" },
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
  } catch (error) {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
