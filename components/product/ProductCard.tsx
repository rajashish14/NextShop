"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Eye, Check, Sparkles, Heart } from "lucide-react";
import { SeedProduct } from "@/lib/db/seed-data";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { ProductQuickView } from "./ProductQuickView";

export function ProductCard({ product }: { product: SeedProduct }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const productIdStr = product.id || product._id;
  const inWishlist = isInWishlist(productIdStr);
  const discount = calculateDiscount(product.originalPrice || 0, product.price);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full relative border border-slate-800/80 hover:border-indigo-500/40">
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center pointer-events-none">
          {discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/25">
              -{discount}% OFF
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-indigo-500/25 flex items-center gap-1 ml-auto">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Product Image Area */}
        <div className="relative aspect-square w-full bg-slate-900 overflow-hidden cursor-pointer">
          <Link href={`/products/${product.id || product._id}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Quick View & Wishlist Buttons overlay */}
          <div className="absolute bottom-3 right-3 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={handleWishlistToggle}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-xl ${
                inWishlist
                  ? "bg-rose-600 text-white"
                  : "bg-slate-950/80 text-slate-200 hover:text-rose-400 hover:bg-slate-900"
              }`}
              title={inWishlist ? "Saved in Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
            </button>

            <button
              onClick={() => setQuickViewOpen(true)}
              className="p-2.5 rounded-full bg-slate-950/80 text-slate-200 hover:text-white hover:bg-indigo-600 transition-all shadow-xl backdrop-blur-md"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-indigo-400 uppercase tracking-wider text-[10px]">
                {product.brand}
              </span>
              <div className="flex items-center space-x-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-slate-200">{product.rating}</span>
                <span className="text-slate-500">({product.numReviews})</span>
              </div>
            </div>

            <Link href={`/products/${product.id || product._id}`}>
              <h3 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Price & Add to Cart Action */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="text-base font-extrabold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-teal-400 font-mono">In Stock ({product.stock})</span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                added
                  ? "bg-teal-500 text-slate-950 shadow-teal-500/30"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <ProductQuickView product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
