import type React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "sonner";

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
    <SessionProvider>
      <ReactQueryProvider>
        <html lang="fr" className="dark">
          <body className={`font-sans antialiased ${outfit.className}`}>
            {children}
            <Analytics />
            <Toaster />
          </body>
        </html>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
