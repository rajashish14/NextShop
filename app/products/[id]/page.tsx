import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck, RefreshCw, ArrowLeft } from "lucide-react";
import { getProductById, getProducts } from "@/lib/actions/product-actions";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductDetailClient } from "./ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProducts({ category: product.category });
  const filteredRelated = relatedProducts.filter((p) => (p.id || p._id) !== id).slice(0, 3);

  const discount = calculateDiscount(product.originalPrice || 0, product.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back Link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product Catalog</span>
      </Link>

      {/* Main Detail Grid */}
      <ProductDetailClient product={product} discount={discount} />

      {/* Related Products */}
      {filteredRelated.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white">Related Products</h2>
          <ProductGrid products={filteredRelated} />
        </div>
      )}

    </div>
  );
}
