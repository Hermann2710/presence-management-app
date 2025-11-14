import { AdminEmployesPage } from "@/components/admin/admin-employes-page";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Employés",
  description: "Employés de l'administrateur",
};

export default async function AdminEmployes() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/employee");
  }

  return <AdminEmployesPage user={session.user as any} />;
}
