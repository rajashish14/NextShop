"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Plus, Minus, ArrowRight, Loader2, Heart } from "lucide-react";
import { SeedProduct } from "@/lib/db/seed-data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { createCheckoutSessionAction } from "@/lib/actions/order-actions";
import { ProductReviewSection } from "@/components/product/ProductReviewSection";

export function ProductDetailClient({
  product,
  discount,
}: {
  product: SeedProduct;
  discount: number;
}) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const productIdStr = product.id || product._id;
  const inWishlist = isInWishlist(productIdStr);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    try {
      setIsBuyingNow(true);
      const items = [
        {
          productId: product.id || product._id || "prod-item",
          name: product.name,
          quantity,
          image: product.images[0],
          price: product.price,
        },
      ];

      const session = await createCheckoutSessionAction({ items });
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (e) {
      console.error("Buy now failed:", e);
      alert("Failed to create checkout session.");
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Media Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden glass-card border border-slate-800 bg-slate-900 shadow-2xl">
            <Image
              src={selectedImage || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{discount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-xl ${
                inWishlist ? "bg-rose-600 text-white" : "bg-slate-950/80 text-slate-200 hover:text-rose-400"
              }`}
              title={inWishlist ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? "border-indigo-500 ring-4 ring-indigo-500/20"
                      : "border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Summary & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-teal-400 uppercase tracking-widest font-mono">{product.brand}</span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono uppercase">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 text-amber-400 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-700"}`} />
                ))}
              </div>
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-slate-500">({product.numReviews || 0} reviews)</span>
            </div>
          </div>

          {/* Pricing Area */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-baseline space-x-4">
            <span className="text-3xl font-extrabold text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="text-xs text-teal-400 font-mono ml-auto">Stock Available ({product.stock})</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{product.description}</p>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Select Quantity</span>
              <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:text-indigo-400 text-slate-400"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-sm w-8 text-center text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 hover:text-indigo-400 text-slate-400"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className={`py-4 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  added
                    ? "bg-teal-500 text-slate-950 shadow-teal-500/30"
                    : "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isBuyingNow}
                className="py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 hover:opacity-95 text-white text-xs font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isBuyingNow ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    <span>Buy Now with Stripe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-400">
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-indigo-400 mx-auto" />
              <p className="font-semibold text-white">Free Express Shipping</p>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto" />
              <p className="font-semibold text-white">Stripe 256-Bit Protection</p>
            </div>
            <div className="space-y-1">
              <RefreshCw className="w-5 h-5 text-purple-400 mx-auto" />
              <p className="font-semibold text-white">30-Day Money Back</p>
            </div>
          </div>

        </div>

      </div>

      {/* Product Reviews Section */}
      <ProductReviewSection
        productId={productIdStr}
        initialReviews={product.reviews || []}
        rating={product.rating}
        numReviews={product.numReviews}
      />
    </div>
  );
}
