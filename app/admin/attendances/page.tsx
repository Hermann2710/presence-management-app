// app/admin/presences/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminPresencesPage } from "@/components/admin/admin-presences-page";

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
