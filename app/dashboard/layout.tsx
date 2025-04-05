"use client";

import AppSidebar from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Main container with flex layout
    <div className="flex items-stretch justify-start min-h-screen">
      {/* Sidebar component */}
      <AppSidebar />
      {/* Main content wrapper */}
      <div className="w-wrapper flex flex-col items-start justify-start">
        {children}
      </div>
    </div>
  );
}
