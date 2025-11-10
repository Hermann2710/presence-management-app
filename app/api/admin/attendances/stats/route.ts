// app/api/admin/attendance/stats/route.ts
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
    const date =
      searchParams.get("date") || new Date().toISOString().split("T")[0];

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const [
      totalEmployees,
      presentToday,
      absentToday,
      lateToday,
      departmentStats,
    ] = await Promise.all([
      // Total employés
      prisma.user.count({ where: { role: "EMPLOYEE", status: "ACTIVE" } }),

      // Présents aujourd'hui
      prisma.attendance.count({
        where: {
          date: { gte: startDate, lt: endDate },
          status: "PRESENT",
        },
      }),

      // Absents aujourd'hui
      prisma.attendance.count({
        where: {
          date: { gte: startDate, lt: endDate },
          status: "ABSENT",
        },
      }),

      // Retards aujourd'hui
      prisma.attendance.count({
        where: {
          date: { gte: startDate, lt: endDate },
          status: "LATE",
        },
      }),

      // Stats par département
      prisma.user.groupBy({
        by: ["department"],
        where: { role: "EMPLOYEE", status: "ACTIVE" },
        _count: true,
      }),
    ]);

    const stats = {
      totalEmployees,
      presentToday,
      absentToday,
      lateToday,
      departmentStats,
      date: startDate.toISOString().split("T")[0],
    };

    return Response.json(stats);
  } catch (error) {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
