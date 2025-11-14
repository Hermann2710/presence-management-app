import type React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    <SessionProvider>
      <ReactQueryProvider>
        <html suppressHydrationWarning lang="fr">
          <body className={`font-sans antialiased ${outfit.className}`}>
            {children}
            <Analytics />
          </body>
        </html>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
