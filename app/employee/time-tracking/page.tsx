// app/employee/pointage/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PointagePage } from "@/components/employee/pointage-page";

export default async function Pointage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return <PointagePage user={session.user as any} />;
}
