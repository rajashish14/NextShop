import React from "react";
import { SeedProduct } from "@/lib/db/seed-data";
import { ProductCard } from "./ProductCard";
import { PackageX } from "lucide-react";

export function ProductGrid({ products }: { products: SeedProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto my-12 border border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 mx-auto flex items-center justify-center text-slate-500 border border-slate-800">
          <PackageX className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400">Try clearing search keywords or selecting another category filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id || product._id} product={product} />
      ))}
    </div>
  );
}
