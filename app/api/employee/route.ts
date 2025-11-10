import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 🔹 Récupération des paramètres de la requête
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [employees, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [{ name: { contains: search }, email: { contains: search } }],
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({
        where: {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        },
      }),
    ]);

    return NextResponse.json({
      employees,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
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
