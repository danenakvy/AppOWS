import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppOWS - ប្រព័ន្ធគ្រប់គ្រង",
  description: "AppOWS - Cambodian Institutional Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
