"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, PackageCheck, Truck, CheckCircle2, Clock, ShieldCheck, ArrowRight, Loader2, FileText } from "lucide-react";
import { searchOrders } from "@/lib/actions/order-actions";
import { formatPrice, formatDate } from "@/lib/utils";

export default function OrderTrackingPage() {
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      const results = await searchOrders(query.trim());
      setOrders(results);
      setHasSearched(true);
    } catch (err) {
      console.error("Order search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mx-auto flex items-center justify-center">
          <Truck className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest">
            Real-Time Order Tracking
          </span>
          <h1 className="text-3xl font-extrabold text-white">Track Your NextShop Shipment</h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Enter your Order ID, Stripe Session ID, or Customer Email address to view real-time shipping status and delivery updates.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. ORD-98412-NEXT or alex.morgan@example.com"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Track Order</span>}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {orders.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center text-slate-400 space-y-2 border border-slate-800">
              <p className="text-sm font-semibold text-white">No active orders found matching "{query}"</p>
              <p className="text-xs text-slate-500">Please double check your Order ID or Email. Try searching "ORD-98412-NEXT" for a live demonstration.</p>
            </div>
          ) : (
            orders.map((ord, idx) => (
              <div key={idx} className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
                
                {/* Top Info Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                  <div>
                    <span className="text-[10px] text-teal-400 font-mono font-bold uppercase">Order Reference</span>
                    <h3 className="text-lg font-extrabold text-white">{ord.id}</h3>
                    <p className="text-xs text-slate-400">Placed on {formatDate(ord.createdAt)}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold uppercase">
                      Stripe Verified • Paid
                    </span>
                    <p className="text-lg font-extrabold text-indigo-400 mt-1">{formatPrice(ord.totalAmount)}</p>
                  </div>
                </div>

                {/* Shipment Progress Stepper Timeline */}
                <div className="py-4 px-2">
                  <div className="grid grid-cols-4 text-center text-xs gap-2">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold mx-auto flex items-center justify-center shadow-lg shadow-teal-500/30">
                        ✓
                      </div>
                      <span className="font-semibold text-white text-[11px] block">Order Placed</span>
                    </div>

                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold mx-auto flex items-center justify-center shadow-lg shadow-teal-500/30">
                        ✓
                      </div>
                      <span className="font-semibold text-white text-[11px] block">Stripe Paid</span>
                    </div>

                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold mx-auto flex items-center justify-center shadow-lg shadow-indigo-600/30 animate-pulse">
                        3
                      </div>
                      <span className="font-semibold text-indigo-300 text-[11px] block">Processing</span>
                    </div>

                    <div className="space-y-2 opacity-40">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 font-bold mx-auto flex items-center justify-center">
                        4
                      </div>
                      <span className="font-semibold text-slate-400 text-[11px] block">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Items in Shipment</h4>
                  <div className="divide-y divide-slate-800/60">
                    {ord.items.map((item: any, i: number) => (
                      <div key={i} className="py-2.5 first:pt-0 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-900 overflow-hidden border border-slate-800 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-400">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
