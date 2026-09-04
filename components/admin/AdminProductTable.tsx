"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, Edit3, Plus, Search, Sparkles, PackageCheck, AlertCircle } from "lucide-react";
import { SeedProduct } from "@/lib/db/seed-data";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/lib/actions/product-actions";
import { ProductModal } from "./ProductModal";

export function AdminProductTable({ initialProducts }: { initialProducts: SeedProduct[] }) {
  const [products, setProducts] = useState<SeedProduct[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SeedProduct | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id && p._id !== id));
  };

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inventory by title or brand..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-4 pr-10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>

      </div>

      {/* Table Container */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 border-b border-slate-800 uppercase font-mono text-[10px] text-slate-400">
              <tr>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Rating</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No products matched your search filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id || prod._id} className="hover:bg-slate-900/40 transition-colors">
                    
                    {/* Item title & thumbnail */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-lg bg-slate-900 overflow-hidden border border-slate-800 flex-shrink-0">
                          <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-white truncate max-w-xs">{prod.name}</p>
                          <span className="text-[10px] text-indigo-400 font-mono">{prod.brand}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 font-medium capitalize text-slate-400">
                      {prod.category.replace("-", " ")}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-white">
                      {formatPrice(prod.price)}
                    </td>

                    {/* Stock status badge */}
                    <td className="py-3.5 px-4">
                      {prod.stock > 10 ? (
                        <span className="px-2 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800 text-[10px] font-bold">
                          {prod.stock} in stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold">
                          Low Stock ({prod.stock})
                        </span>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4 text-amber-400 font-bold">
                      ★ {prod.rating}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(prod.id || prod._id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            // refresh product state
            window.location.reload();
          }}
        />
      )}

    </div>
  );
}
