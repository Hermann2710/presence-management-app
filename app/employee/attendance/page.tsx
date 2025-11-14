import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MesPresencesPage } from "@/components/employee/mes-presences-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Présences",
  description: "Présences de l'employé",
};

export default async function MesPresences() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return <MesPresencesPage user={session.user as any} />;
}
