import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Récupération des paramètres de la requête
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
