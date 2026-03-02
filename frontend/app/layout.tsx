import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "MYLIGHTS - Professional Media Portal",
  description: "Browse images, video, and audio effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} font-sans antialiased bg-background text-primary-text min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 flex flex-col md:flex-row">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
