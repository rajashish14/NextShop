"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Loader2, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { createCheckoutSessionAction } from "@/lib/actions/order-actions";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const shippingCost = subtotal >= 99 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, subtotal + shippingCost - discountAmount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "NEXTSHOP20") {
      setDiscountAmount(subtotal * 0.2);
    } else {
      alert("Invalid promo code. Try NEXTSHOP20!");
    }
  };

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
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to initiate Stripe checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 mx-auto flex items-center justify-center text-slate-500 border border-slate-800">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Shopping Cart is Empty</h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Explore high quality audio, laptops, and smartphones in our catalog.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart ({totalItems})</h1>
          <p className="text-xs text-slate-400 mt-1">Review your selected items before proceeding to Stripe Checkout.</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-red-400 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden divide-y divide-slate-800/80">
            {cart.map(({ product, quantity }) => (
              <div key={product.id || product._id} className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                
                <div className="relative w-24 h-24 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex-shrink-0">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <span className="text-[10px] text-teal-400 font-mono font-bold uppercase">{product.brand}</span>
                  <Link href={`/products/${product.id || product._id}`}>
                    <h3 className="text-sm font-bold text-white hover:text-indigo-400 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-indigo-400 font-bold">{formatPrice(product.price)}</p>
                </div>

                <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl p-1.5">
                  <button
                    onClick={() => updateQuantity(product.id || product._id, quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-indigo-400"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-xs w-6 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id || product._id, quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-indigo-400"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm font-extrabold text-white">{formatPrice(product.price * quantity)}</p>
                  <button
                    onClick={() => removeItem(product.id || product._id)}
                    className="text-xs text-slate-500 hover:text-red-400 transition-colors mt-1"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4">Order Summary</h2>

            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code (NEXTSHOP20)"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Apply
              </button>
            </form>

            <div className="space-y-3 text-xs border-b border-slate-800 pb-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-white font-medium">
                  {shippingCost === 0 ? <strong className="text-teal-400 font-mono">FREE</strong> : formatPrice(shippingCost)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-teal-400 font-medium">
                  <span>Discount (20% OFF)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-base font-extrabold text-white">
              <span>Grand Total</span>
              <span className="text-indigo-400">{formatPrice(grandTotal)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Stripe...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Proceed to Stripe Checkout
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-500 text-center">
              🔒 Safe & Secure Stripe Payment Gateway
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
