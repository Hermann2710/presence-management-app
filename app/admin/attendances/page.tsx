import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminPresencesPage } from "@/components/admin/admin-presences-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Présences",
  description: "Présences de l'administrateur",
};

export default async function AdminPresences() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/employee");
  }

  return <AdminPresencesPage user={session.user as any} />;
}
