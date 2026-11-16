import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MarqueeComp from "@/components/MarqueeComp";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের বাজারদর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের বাজারদর জানুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f3f7f3]">
        <Toaster position="top-center" />
        <Navbar />
        <MarqueeComp />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}