import React from "react";
import { getProducts, getCategories } from "@/lib/actions/product-actions";
import { ProductFilter } from "@/components/product/ProductFilter";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShoppingBag } from "lucide-react";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const sort = params.sort as any;

  const [products, categories] = await Promise.all([
    getProducts({ category, search, sort }),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4" />
          <span>NextShop Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {category ? category.replace("-", " ").toUpperCase() : "All Tech & Gear"}
        </h1>
        <p className="text-xs text-slate-400 max-w-xl">
          Showing {products.length} high-performance items available for instant purchase with Stripe Checkout.
        </p>
      </div>

      {/* Filter Toolbar */}
      <ProductFilter categories={categories} />

      {/* Products Grid */}
      <ProductGrid products={products} />

    </div>
  );
}
