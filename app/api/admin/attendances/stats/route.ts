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

    // Récupérer tous les employés actifs
    const activeEmployees = await prisma.user.findMany({
      where: {
        role: "EMPLOYEE",
        status: "ACTIVE",
      },
      select: { id: true },
    });

    const activeEmployeeIds = activeEmployees.map((emp) => emp.id);

    // Récupérer toutes les présences pour la date
    const todayAttendances = await prisma.attendance.findMany({
      where: {
        date: { gte: startDate, lt: endDate },
        userId: { in: activeEmployeeIds },
      },
      select: {
        userId: true,
        status: true,
        checkIn: true,
      },
    });

    // Calculs manuels pour plus de précision
    const presentToday = todayAttendances.filter(
      (a) => a.status === "PRESENT"
    ).length;
    const absentToday = todayAttendances.filter(
      (a) => a.status === "ABSENT"
    ).length;
    const lateToday = todayAttendances.filter(
      (a) => a.status === "LATE"
    ).length;

    // Employés sans pointage du jour sont considérés absents
    const employeesWithAttendance = new Set(
      todayAttendances.map((a) => a.userId)
    );
    const employeesWithoutAttendance = activeEmployeeIds.filter(
      (id) => !employeesWithAttendance.has(id)
    );
    const totalAbsent = absentToday + employeesWithoutAttendance.length;

    // Stats par département
    const departmentStats = await prisma.user.groupBy({
      by: ["department"],
      where: {
        role: "EMPLOYEE",
        status: "ACTIVE",
        id: { in: activeEmployeeIds },
      },
      _count: true,
    });

    const stats = {
      totalEmployees: activeEmployeeIds.length,
      presentToday,
      absentToday: totalAbsent, // Inclut les employés sans pointage
      lateToday,
      employeesWithoutAttendance: employeesWithoutAttendance.length,
      departmentStats,
      date: startDate.toISOString().split("T")[0],
    };

    return Response.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
