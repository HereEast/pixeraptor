import { ReactNode } from "react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixeraptor",
  description: "Pixelate your images with ease and edit pixels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetBrainsMono.className} scroll-behavior-smooth`}>
      <body className="antialiased">
        <Header />
        <main className="flex grow flex-col p-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
