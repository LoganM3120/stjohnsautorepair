import type { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St. John's Auto Repair | Mobile Mechanic in Jacksonville, FL",
  description:
    "ASE-certified mobile mechanic providing diagnostics, repairs, and preventative maintenance across Jacksonville and St. Johns County.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-shell">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
