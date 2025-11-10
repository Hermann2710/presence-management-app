// app/api/employee/attendance/month/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month"); // Format: '2024-01'
    const year = searchParams.get("year"); // Format: '2024'

    let startDate: Date;
    let endDate: Date;

    if (month) {
      // Si mois spécifique (ex: '2024-01')
      startDate = new Date(month + "-01");
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (year) {
      // Si année spécifique
      startDate = new Date(year + "-01-01");
      endDate = new Date(year + "-12-31");
      endDate.setHours(23, 59, 59, 999);
    } else {
      // Mois courant par défaut
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
    }

    const attendances = await prisma.attendance.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: "desc" },
      select: {
        id: true,
        date: true,
        checkIn: true,
        checkOut: true,
        status: true,
        notes: true,
      },
    });

    // Statistiques du mois
    const stats = {
      totalDays: attendances.length,
      presentDays: attendances.filter((a) => a.status === "PRESENT").length,
      lateDays: attendances.filter((a) => a.status === "LATE").length,
      absentDays: attendances.filter((a) => a.status === "ABSENT").length,
      sickLeaveDays: attendances.filter((a) => a.status === "SICK_LEAVE")
        .length,
      vacationDays: attendances.filter((a) => a.status === "VACATION").length,
    };

    return Response.json({
      attendances,
      stats,
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching monthly attendance:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
