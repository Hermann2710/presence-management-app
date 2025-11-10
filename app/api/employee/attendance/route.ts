// app/api/employee/attendance/route.ts
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
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = { userId: session.user.id };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const attendances = await prisma.attendance.findMany({
      where,
      orderBy: { date: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return Response.json(attendances);
  } catch (error) {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { action, message } = body; // 'checkin' ou 'checkout'

    const today = new Date();

    if (action === "checkin") {
      // Vérifier si déjà pointé aujourd'hui
      const existing = await prisma.attendance.findFirst({
        where: {
          userId: session.user.id,
          date: {
            gte: today,
            lt: new Date(today.getTime()),
          },
        },
      });

      if (existing) {
        return Response.json(
          { error: "Déjà pointé aujourd'hui" },
          { status: 400 }
        );
      }

      const checkInTime = new Date();
      let status: "PRESENT" | "LATE";
      if (checkInTime.getHours() <= 8 && checkInTime.getMinutes() <= 15) {
        status = "PRESENT";
      } else {
        status = "LATE";
      }

      const attendance = await prisma.attendance.create({
        data: {
          userId: session.user.id,
          date: today,
          checkIn: checkInTime,
          status,
          notes: message,
        },
      });

      return Response.json(attendance);
    }

    if (action === "checkout") {
      // Trouver le pointage du jour sans check-out
      const attendance = await prisma.attendance.findFirst({
        where: {
          userId: session.user.id,
          checkOut: null,
        },
      });

      if (!attendance) {
        return Response.json(
          { error: "Aucun pointage trouvé" },
          { status: 400 }
        );
      }

      const updated = await prisma.attendance.update({
        where: { id: attendance.id },
        data: { checkOut: new Date() },
      });

      return Response.json(updated);
    }

    return Response.json({ error: "Action invalide" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
