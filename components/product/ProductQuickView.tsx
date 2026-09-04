"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { SeedProduct } from "@/lib/db/seed-data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";

export function ProductQuickView({
  product,
  onClose,
}: {
  product: SeedProduct;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" />

      <div className="relative w-full max-w-3xl glass-panel border border-slate-800 rounded-3xl overflow-hidden text-slate-100 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Column */}
        <div className="p-6 bg-slate-900/60 flex flex-col justify-between space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <Image
              src={selectedImage || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Image Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden border transition-all flex-shrink-0 ${
                    selectedImage === img ? "border-indigo-500 ring-2 ring-indigo-500/40" : "border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-teal-400 uppercase font-mono">{product.brand}</span>
              <div className="flex items-center space-x-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-slate-200">{product.rating}</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white leading-tight">{product.name}</h2>

            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-extrabold text-indigo-400">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{product.description}</p>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Quantity</span>
              <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:text-indigo-400 text-slate-400 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 hover:text-indigo-400 text-slate-400 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                added
                  ? "bg-teal-500 text-slate-950 shadow-teal-500/30"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Add to Cart ({formatPrice(product.price * quantity)})
                </>
              )}
            </button>

            <Link
              href={`/products/${product.id || product._id}`}
              onClick={onClose}
              className="block text-center text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View Full Details Page →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
