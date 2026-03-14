"use client";

import Header from "./Header";

interface BackgroundLayoutProps {
  children: React.ReactNode;
}

export default function BackgroundLayout({ children }: BackgroundLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-blue-600 to-sky-300">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
