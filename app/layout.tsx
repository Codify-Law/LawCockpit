import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/lib/axios";
import "./globals.css";
import Providers from "./provider";

// Configure Lato font
const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

// Define metadata for the application
export const metadata: Metadata = {
  title: "Codify Law Cockpit",
};

// Root layout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className="font-Lato">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
