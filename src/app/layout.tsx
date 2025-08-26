import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getMetadata } from "~/lib";

const jetBrainsMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetBrainsMono.className} scroll-behavior-smooth`}
    >
      <body className="bg-stone-100">
        <Header />
        <main className="flex grow flex-col p-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
