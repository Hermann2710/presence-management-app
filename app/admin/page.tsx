import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Accueil de l'administrateur",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/employee");
  }

  return <AdminDashboard user={session.user as any} />;
}
