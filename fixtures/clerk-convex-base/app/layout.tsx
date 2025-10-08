import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clerk Convex Template Harness",
  description: "Fixture app used to test the Clerk + Convex registry template.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
