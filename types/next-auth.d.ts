// types/next-auth.d.ts
import { UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Personnalisation de `session.user`
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  /**
   * Personnalisation de `User` côté adapter / authorize
   */
  interface User {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /**
   * Personnalisation du JWT pour inclure le rôle
   */
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
  }
}
