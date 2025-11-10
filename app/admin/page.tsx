// app/admin/page.tsx
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
