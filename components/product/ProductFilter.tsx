"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

interface CategoryOption {
  name: string;
  slug: string;
}

export function ProductFilter({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";
  const currentSearch = searchParams.get("search") || "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => updateFilters("category", "all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentCategory === "all"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            }`}
          >
            All Products
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilters("category", cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                currentCategory === cat.slug
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <select
            value={currentSort}
            onChange={(e) => updateFilters("sort", e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {(currentCategory !== "all" || currentSearch || currentSort !== "newest") && (
            <button
              onClick={clearFilters}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              title="Reset Filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
