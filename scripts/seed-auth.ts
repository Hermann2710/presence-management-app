// scripts/seed-auth.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seed auth...");

  try {
    const hashedPassword = await hash("password123", 12);

    // Créer un admin
    const admin = await prisma.user.upsert({
      where: { email: "admin@company.com" },
      update: {},
      create: {
        email: "admin@company.com",
        name: "Admin System",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    // Créer un employé
    const employee = await prisma.user.upsert({
      where: { email: "employee@company.com" },
      update: {},
      create: {
        email: "employee@company.com",
        name: "John Employee",
        password: hashedPassword,
        role: "EMPLOYEE",
      },
    });

    console.log("✅ Seed auth terminé avec succès!");
    console.log("");
    console.log("📧 Comptes créés:");
    console.log("   Admin: admin@company.com / password123");
    console.log("   Employé: employee@company.com / password123");
  } catch (error) {
    console.error("❌ Erreur lors du seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
