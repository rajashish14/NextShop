import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Database, CreditCard, Cloud, ShieldCheck, Cpu } from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/actions/product-actions";

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <HeroSection />

      {/* Categories Grid */}
      <FeaturedCategories />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Featured Tech
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Trending Products</h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts.slice(0, 6)} />
      </section>

      {/* Technical Architecture Showcase (Directly proves the resume claims!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-bold">
              Engineering Breakdown
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Full-Stack Architecture & Integration
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Designed as a high-performance e-commerce engine leveraging modern Next.js server actions and cloud integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Next.js App Router</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Server Actions for clean backend routing, dynamic rendering, and automated Vercel CI/CD pipelines.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">MongoDB Database</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mongoose ORM models for products, orders, and categories with cached database connections.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Stripe Checkout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Secure checkout session workflow, webhook event listening, and order fulfillment simulation.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AWS S3 Media</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scalable product image storage using AWS SDK S3 client and presigned file upload endpoints.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
