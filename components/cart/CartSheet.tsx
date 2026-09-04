"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import { createCheckoutSessionAction } from "@/lib/actions/order-actions";

export function CartSheet() {
  const { cart, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const freeShippingThreshold = 99;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const grandTotal = subtotal + shippingCost;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      setIsCheckingOut(true);
      const items = cart.map((item) => ({
        productId: item.product.id || item.product._id || "prod-item",
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.images[0],
        price: item.product.price,
      }));

      const session = await createCheckoutSessionAction({ items });

      if (session.url) {
        window.location.href = session.url;
      }
    } catch (err: any) {
      console.error("Checkout failed:", err);
      alert("Failed to initiate checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Your Cart ({totalItems})</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-indigo-950/40 border-b border-indigo-900/40 px-6 py-3 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-teal-400 font-medium flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> 🎉 You unlocked FREE Express Shipping!
              </p>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-indigo-200">
                  <span>Add {formatPrice(freeShippingThreshold - subtotal)} more for <strong>FREE Shipping</strong></span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-slate-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400 py-16">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 border border-slate-800">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-white font-semibold">Your shopping cart is empty</p>
                  <p className="text-xs text-slate-400">Discover premium tech gear and wearables in our store.</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id || product._id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex-shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info & Quantity controls */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-xs font-semibold text-white truncate">{product.name}</h3>
                    <p className="text-xs text-indigo-400 font-bold">{formatPrice(product.price)}</p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(product.id || product._id, quantity - 1)}
                          className="p-1 hover:text-indigo-400 text-slate-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id || product._id, quantity + 1)}
                          className="p-1 hover:text-indigo-400 text-slate-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id || product._id)}
                        className="text-slate-500 hover:text-red-400 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Est. Shipping</span>
                  <span className="text-white font-medium">
                    {shippingCost === 0 ? <strong className="text-teal-400 uppercase">FREE</strong> : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Total</span>
                  <span className="text-indigo-400">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Secure Stripe Checkout...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Checkout with Stripe</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-400" />
                Protected by Stripe 256-bit SSL Security
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
