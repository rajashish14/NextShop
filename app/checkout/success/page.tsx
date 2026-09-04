import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, PackageCheck, FileText } from "lucide-react";
import { getOrderDetails } from "@/lib/actions/order-actions";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id || "demo";
  const order = await getOrderDetails(sessionId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 mx-auto flex items-center justify-center shadow-lg shadow-teal-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-bold">
            Stripe Payment Verified
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Order Confirmed!</h1>
          <p className="text-xs text-slate-300">
            Thank you for shopping at NextShop. We have received your payment and are preparing your order.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
          <span>Order ID:</span>
          <strong className="text-indigo-400">{order.id}</strong>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Purchased Items List */}
        <div className="md:col-span-8 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <PackageCheck className="w-4 h-4 text-indigo-400" />
              <span>Purchased Items</span>
            </h3>

            <div className="divide-y divide-slate-800/60">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="py-3.5 first:pt-0 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                  </div>
                  <span className="text-xs font-extrabold text-indigo-400">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping & Payment Summary */}
        <div className="md:col-span-4 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Receipt Summary</span>
            </h3>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>Status:</span>
                <strong className="text-teal-400">Paid & Processing</strong>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="text-white font-medium">{order.shippingAddress?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="text-slate-400">{order.shippingAddress?.city}, {order.shippingAddress?.country}</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-extrabold text-white">
              <span>Total Paid:</span>
              <span className="text-indigo-400">{formatPrice(order.totalAmount)}</span>
            </div>

            <Link
              href="/products"
              className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
