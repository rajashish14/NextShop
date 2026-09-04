"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Lock, ExternalLink, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 mt-20">
      
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-800/60 py-10 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Free Express Delivery</h4>
                <p className="text-xs text-slate-400 mt-0.5">On all orders above $99</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Stripe Secure Checkout</h4>
                <p className="text-xs text-slate-400 mt-0.5">256-Bit SSL Encryption</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">30-Day Easy Returns</h4>
                <p className="text-xs text-slate-400 mt-0.5">Hassle-free refund policy</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">AWS S3 Cloud Storage</h4>
                <p className="text-xs text-slate-400 mt-0.5">Fast & reliable product media</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">Next<span className="text-indigo-400">Shop</span></span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Full-Stack Next.js E-Commerce platform built with TypeScript, MongoDB, App Router Server Actions, Stripe Checkout, and AWS S3 bucket storage.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400 pt-2">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-teal-400 font-mono">Next.js 14</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-indigo-400 font-mono">TypeScript</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-purple-400 font-mono">MongoDB</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-blue-400 font-mono">Stripe</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Categories</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/products?category=audio-wearables" className="hover:text-indigo-400 transition-colors">Audio & Wearables</Link></li>
              <li><Link href="/products?category=laptops-computing" className="hover:text-indigo-400 transition-colors">Laptops & Tech</Link></li>
              <li><Link href="/products?category=smartphones-mobile" className="hover:text-indigo-400 transition-colors">Smartphones & Power</Link></li>
              <li><Link href="/products?category=lifestyle-apparel" className="hover:text-indigo-400 transition-colors">Lifestyle Gear</Link></li>
            </ul>
          </div>

          {/* Direct Navigation */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Navigation</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/products" className="hover:text-indigo-400 transition-colors">Product Catalog</Link></li>
              <li><Link href="/cart" className="hover:text-indigo-400 transition-colors">Shopping Cart</Link></li>
              <li><Link href="/admin" className="hover:text-indigo-400 transition-colors">Admin Portal</Link></li>
              <li><Link href="/checkout/success?session_id=demo" className="hover:text-indigo-400 transition-colors">Order Status</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4">Stay Updated</h5>
            <p className="text-xs text-slate-400 mb-3">Subscribe for exclusive flash deals and tech launches.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2 rounded-lg transition-colors shadow-lg shadow-indigo-600/20"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NextShop E-Commerce. Self Project.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" />
            <span>for Placement & Portfolio</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
