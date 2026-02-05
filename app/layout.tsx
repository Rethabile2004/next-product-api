import type { Metadata } from "next";
import { Geist } from "next/font/google"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Next Products API",
  description: "Simple, clean REST-ish API for products, reviews & users – built with Next.js, Prisma & PostgreSQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-dvh bg-[#f0f0f0] text-gray-950">
        {children}
      </body>
    </html>
  );
}