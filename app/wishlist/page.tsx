"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from "lucide-react";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product: any) => {
    addItem(product, 1);
    removeFromWishlist(product.id || product._id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 mx-auto flex items-center justify-center text-slate-500 border border-slate-800">
          <Heart className="w-10 h-10 text-rose-500/50" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Wishlist is Empty</h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Explore high-tech wearables, laptops, and smartphones to save your favorites.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
        >
          <span>Discover Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div>
        <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4 fill-rose-400" />
          <span>Saved Favorites</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-1">My Wishlist ({wishlist.length})</h1>
        <p className="text-xs text-slate-400">Manage your saved items or move them directly to your shopping cart.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id || product._id}
            className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="relative aspect-square w-full rounded-xl bg-slate-900 overflow-hidden border border-slate-800">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              <button
                onClick={() => removeFromWishlist(product.id || product._id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-rose-400 hover:bg-rose-600 hover:text-white transition-all backdrop-blur-md"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-indigo-400 font-bold uppercase text-[10px]">{product.brand}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">★ {product.rating}</span>
              </div>
              <Link href={`/products/${product.id || product._id}`}>
                <h3 className="text-sm font-bold text-white hover:text-indigo-300 transition-colors line-clamp-1">{product.name}</h3>
              </Link>
              <p className="text-base font-extrabold text-indigo-400">{formatPrice(product.price)}</p>
            </div>

            <button
              onClick={() => handleMoveToCart(product)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" /> Move to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
