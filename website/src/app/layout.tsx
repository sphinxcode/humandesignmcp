import type { Metadata } from "next";
import { Quicksand, Great_Vibes } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Project Ajna | Discover Your Human Design",
  description: "Uncover your cosmic blueprint with our interactive Human Design bodygraph calculator. Discover your type, authority, and unique energetic signature.",
  keywords: ["Human Design", "Bodygraph", "Chart Calculator", "Spiritual", "Self Discovery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
