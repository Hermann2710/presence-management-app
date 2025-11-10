import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const department = searchParams.get("department");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");

    // Construire le where clause avec typage plus strict
    const where: any = {};

    // Filtre par date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    // Filtre par département
    if (department) {
      where.user = {
        department: department,
      };
    }

    // Filtre par utilisateur
    if (userId) {
      where.userId = userId;
    }

    // Filtre par statut
    if (status) {
      where.status = status;
    }

    // Options de requête
    const findManyOptions: any = {
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            position: true,
          },
        },
      },
      orderBy: { date: "desc" },
    };

    // Limite optionnelle
    if (limit) {
      const limitNumber = parseInt(limit);
      if (!isNaN(limitNumber) && limitNumber > 0) {
        findManyOptions.take = limitNumber;
      }
    }

    const attendances = await prisma.attendance.findMany(findManyOptions);

    return Response.json(attendances);
  } catch (error) {
    console.error("Error fetching attendances:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
