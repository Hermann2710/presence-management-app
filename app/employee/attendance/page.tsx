// app/employee/mes-presences/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MesPresencesPage } from "@/components/employee/mes-presences-page";

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
