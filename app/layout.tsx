import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextShop | Full-Stack Next.js E-Commerce Platform",
  description: "Full-Stack Next.js application built with TypeScript, MongoDB, App Router Server Actions, Stripe Checkout system, and AWS S3 product image storage.",
  keywords: ["Next.js", "TypeScript", "E-Commerce", "MongoDB", "Stripe Checkout", "AWS S3", "Tailwind CSS"],
  authors: [{ name: "NextShop Self Project" }],
  openGraph: {
    title: "NextShop | Full-Stack E-Commerce Platform",
    description: "Modern e-commerce platform built with Next.js 14, TypeScript, MongoDB, Stripe, and AWS S3.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="bottom-right" richColors theme="dark" closeButton />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
