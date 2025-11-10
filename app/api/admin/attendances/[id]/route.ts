import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params est une Promise
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }

    // Déballer les params avec await
    const { id } = await params;

    if (!id) {
      return Response.json(
        { error: "ID de présence manquant" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, notes, checkIn, checkOut } = body;

    // Validation des données
    if (!status && !notes && !checkIn && !checkOut) {
      return Response.json(
        { error: "Aucune donnée à mettre à jour" },
        { status: 400 }
      );
    }

    const attendance = await prisma.attendance.update({
      where: { id: id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }), // Permet de mettre notes à null
        ...(checkIn && { checkIn: new Date(checkIn) }),
        ...(checkOut && { checkOut: new Date(checkOut) }),
      },
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
    });

    return Response.json(attendance);
  } catch (error) {
    console.error("Error updating attendance:", error);

    // Gestion d'erreurs plus spécifique
    if (error instanceof Error) {
      if (error.message.includes("Record to update not found")) {
        return Response.json(
          { error: "Présence non trouvée" },
          { status: 404 }
        );
      }
      if (error.message.includes("Invalid `prisma.attendance.update()`")) {
        return Response.json(
          { error: "Données de présence invalides" },
          { status: 400 }
        );
      }
    }

    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
