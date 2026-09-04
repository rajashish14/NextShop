import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Database, Server, CreditCard, Cloud } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-hero-gradient">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>Next.js 14 App Router • MongoDB • Stripe • AWS S3</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Next-Gen Shopping <br />
              <span className="text-gradient">Engineered for Speed.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Explore ultra-fast tech gear, wireless audio, and computing accessories. Powered by Next.js Server Actions, full-stack MongoDB backend, Stripe Checkout, and AWS S3 storage.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 hover:opacity-95 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Shop Product Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/admin"
                className="w-full sm:w-auto px-7 py-4 rounded-xl glass-card text-slate-200 hover:text-white text-sm font-bold border border-slate-700 hover:border-indigo-500/50 flex items-center justify-center gap-2 transition-all"
              >
                <Server className="w-4 h-4 text-teal-400" />
                <span>Explore Admin Portal</span>
              </Link>
            </div>

            {/* Architecture Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-400" />
                <span>MongoDB Mongoose</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-400" />
                <span>Stripe Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-purple-400" />
                <span>AWS S3 Bucket</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>95+ Lighthouse</span>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden glass-card p-3 border border-slate-800 shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
                  alt="NextShop Featured Product"
                  fill
                  priority
                  className="object-cover"
                />
                
                {/* Floating Glassmorphic Product Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-2xl p-4 border border-slate-700/60 shadow-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-teal-400 font-bold">Best Seller</span>
                    <h4 className="text-sm font-bold text-white">Sony WH-1000XM5</h4>
                    <p className="text-xs text-indigo-300 font-mono font-bold">$348.00 <span className="text-slate-500 line-through text-[10px]">$399.99</span></p>
                  </div>
                  <Link
                    href="/products/sony-wh-1000xm5-wireless-headphones"
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    View
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
