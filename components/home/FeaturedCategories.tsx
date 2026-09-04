import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "@/lib/actions/product-actions";

export async function FeaturedCategories() {
  const categories = await getCategories();

  return (
    <section className="py-16 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest">Collections</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Shop by Category</h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
          >
            <span>Browse All Products</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group glass-card rounded-2xl overflow-hidden relative border border-slate-800 hover:border-indigo-500/40 p-5 flex flex-col justify-between h-64 transition-all duration-300"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 bg-slate-900 z-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 opacity-40 group-hover:opacity-60 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              </div>

              {/* Top Tag */}
              <div className="relative z-10 self-start">
                <span className="bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                  {cat.productCount || 4}+ Items
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-300 group-hover:translate-x-0.5 transition-all" />
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">{cat.description}</p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
