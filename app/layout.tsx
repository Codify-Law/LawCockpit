import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/lib/axios";
import "./globals.css";
import Providers from "./provider";
import { Toaster } from "@/components/ui/sonner";

// Configure Lato font
const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

// Define metadata for the application
export const metadata: Metadata = {
  title: "CodyLex Cockpit",
};

// Root layout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} bg-gray-50`}>
      <body className="font-Lato">
        <Providers>{children}</Providers>
        <Toaster position="top-center" theme="light" />
      </body>
    </html>
  );
}
