import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Changed from Geist
import "./globals.css";

// Initialize Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full Circle Cafe | Wood-Fired Perfection",
  description: "Experience the art of wood-fired pizza at Full Circle Cafe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-[#1a1a1a] text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
