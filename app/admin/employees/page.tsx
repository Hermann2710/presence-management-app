// app/admin/employes/page.tsx
import { AdminEmployesPage } from "@/components/admin/admin-employes-page";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
