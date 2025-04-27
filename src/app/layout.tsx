import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CardProvider } from '@/context/CardContext'
import { ScoreProvider } from "@/context/ScoreContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flashcards",
  description: "nfactorial 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CardProvider>
          <ScoreProvider>
          {children}
          </ScoreProvider>
        </CardProvider>
      </body>
    </html>
  );
}
