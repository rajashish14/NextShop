"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, X, Sparkles, ShieldCheck, Sun, Moon, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { CartSheet } from "@/components/cart/CartSheet";

export function Navbar() {
  const router = useRouter();
  const { totalItems, toggleCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light");
    }
  };

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-indigo-200 text-xs py-2 px-4 text-center font-medium border-b border-indigo-500/20 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
        <span>Use code <strong>NEXTSHOP20</strong> for 20% OFF your first order!</span>
        <span className="hidden md:inline-block text-indigo-400">• Free express shipping on orders over $99</span>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                  Next<span className="text-gradient">Shop</span>
                </span>
                <span className="text-[10px] text-teal-400 font-mono tracking-widest uppercase">E-Commerce</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              <Link href="/products" className="hover:text-indigo-400 transition-colors">Catalog</Link>
              <Link href="/wishlist" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                <span>Wishlist</span>
              </Link>
              <Link href="/orders" className="hover:text-indigo-400 transition-colors">Track Order</Link>
              <Link href="/admin" className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">Admin Dashboard</Link>
            </nav>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-sm relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, tech..."
                className="w-full bg-slate-900/80 border border-slate-700/60 rounded-full py-2 pl-4 pr-10 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button
                type="submit"
                aria-label="Search button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={toggleCart}
                aria-label="Shopping Cart"
                className="relative p-2.5 rounded-full text-slate-200 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-center group"
              >
                <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-teal-400 text-white text-[11px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-md shadow-indigo-500/40 animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Mobile Navigation Menu"
                className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800/60 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-slate-800 py-4 px-6 space-y-4 animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm text-slate-200 placeholder-slate-400 focus:outline-none"
              />
              <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <nav className="flex flex-col space-y-3 font-medium text-slate-200">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400 py-1">Home</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400 py-1">All Products</Link>
              <Link href="/products?category=audio-wearables" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400 py-1">Audio & Wearables</Link>
              <Link href="/products?category=laptops-computing" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-400 py-1">Laptops & Tech</Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-indigo-400 py-1 font-semibold">Admin Panel</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Global Slide-Over Cart Sheet */}
      <CartSheet />
    </>
  );
}
