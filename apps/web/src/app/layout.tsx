import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Forge",
  description: "Enterprise Monorepo Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
