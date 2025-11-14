import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return Response.json({ error: "Non autorisé" }, { status: 403 });
    }

    // Déballer les params avec await
    const { id } = await params;

    const employee = await prisma.user.findUnique({
      where: {
        id: id,
        role: "EMPLOYEE",
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
        updatedAt: true,
        attendances: {
          take: 10,
          orderBy: { date: "desc" },
          select: {
            id: true,
            date: true,
            checkIn: true,
            checkOut: true,
            status: true,
          },
        },
        _count: {
          select: {
            attendances: true,
          },
        },
      },
    });

    if (!employee) {
      return Response.json({ error: "Employé non trouvé" }, { status: 404 });
    }

    return Response.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

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
      return Response.json({ error: "ID employé manquant" }, { status: 400 });
    }

    const body = await request.json();
    const { name, phone, department, position, status } = body;

    const employee = await prisma.user.update({
      where: {
        id: id,
        role: "EMPLOYEE",
      },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(department && { department }),
        ...(position && { position }),
        ...(status && { status }),
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
        updatedAt: true,
      },
    });

    return Response.json(employee);
  } catch (error) {
    console.error("Error updating employee:", error);

    // Gestion d'erreurs plus spécifique
    if (error instanceof Error) {
      if (error.message.includes("Record to update not found")) {
        return Response.json({ error: "Employé non trouvé" }, { status: 404 });
      }
    }

    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
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

    // Vérifier si l'employé existe
    const employee = await prisma.user.findUnique({
      where: {
        id: id,
        role: "EMPLOYEE",
      },
    });

    if (!employee) {
      return Response.json({ error: "Employé non trouvé" }, { status: 404 });
    }

    // Supprimer l'employé (les présences seront supprimées via CASCADE)
    await prisma.user.delete({
      where: { id: id },
    });

    return Response.json({
      success: true,
      message: "Employé supprimé avec succès",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
