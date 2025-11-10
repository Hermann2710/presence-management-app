"use client";

import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading" && !session)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  else if (status === "unauthenticated") {
    return redirect("/login");
  } else {
    if (session?.user.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/employee");
    }
  }
}
