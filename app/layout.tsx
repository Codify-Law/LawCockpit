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
  title: "Codify Law",
};

// Root layout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-Lato">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
