import type React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/components/react-query-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.APP_TITLE,
  description: process.env.APP_DESCRIPTION,
  generator: process.env.GENERATOR,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="light">
      <SessionProvider>
        <ReactQueryProvider>
          <body className={`font-sans antialiased ${outfit.className}`}>
            <AuthProvider>{children}</AuthProvider>
            <Analytics />
          </body>
        </ReactQueryProvider>
      </SessionProvider>
    </html>
  );
}
