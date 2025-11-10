// app/admin/rapports/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminRapportsPage } from "@/components/admin/admin-rapports-page";

export default async function AdminRapports() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/employee");
  }

  return <AdminRapportsPage user={session.user as any} />;
}
