// app/api/admin/attendance/[id]/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }

    const body = await request.json();
    const { status, notes, checkIn, checkOut } = body;

    const attendance = await prisma.attendance.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(notes && { notes }),
        ...(checkIn && { checkIn: new Date(checkIn) }),
        ...(checkOut && { checkOut: new Date(checkOut) }),
      },
      include: {
        user: {
          select: { name: true, email: true, department: true },
        },
      },
    });

    return Response.json(attendance);
  } catch (error) {
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
