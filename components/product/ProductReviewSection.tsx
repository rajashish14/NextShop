"use client";

import React, { useState } from "react";
import { Star, MessageSquare, Send, CheckCircle2, User, Loader2 } from "lucide-react";
import { SeedReview } from "@/lib/db/seed-data";
import { submitProductReview } from "@/lib/actions/product-actions";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

export function ProductReviewSection({
  productId,
  initialReviews = [],
  rating = 4.8,
  numReviews = 0,
}: {
  productId: string;
  initialReviews?: SeedReview[];
  rating?: number;
  numReviews?: number;
}) {
  const [reviews, setReviews] = useState<SeedReview[]>(initialReviews);
  const [name, setName] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Please enter your name and review comment.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await submitProductReview(productId, {
        name: name.trim(),
        rating: userRating,
        comment: comment.trim(),
      });

      if (res.success && res.product?.reviews) {
        setReviews(res.product.reviews);
        setName("");
        setComment("");
        setUserRating(5);
        toast.success("Thank you for your review! ⭐");
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 pt-10 border-t border-slate-800">
      
      {/* Section Title & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Verified Feedback</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Customer Reviews ({reviews.length})</h2>
        </div>

        <div className="flex items-center space-x-3 p-4 rounded-2xl glass-panel border border-slate-800">
          <div className="text-3xl font-extrabold text-white">{rating}</div>
          <div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-amber-400" : "text-slate-700"}`} />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Based on {reviews.length} ratings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Write a Review Form */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-400" />
            <span>Write a Product Review</span>
          </h3>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      userRating >= star
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-slate-900 border-slate-800 text-slate-600"
                    }`}
                  >
                    <Star className={`w-5 h-5 ${userRating >= star ? "fill-amber-400" : ""}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Review Comments</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with build quality, battery life, sound..."
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Submit Verified Review</span>
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-7 space-y-4">
          {reviews.length === 0 ? (
            <div className="p-8 text-center glass-panel rounded-3xl border border-slate-800 text-slate-400 space-y-2">
              <User className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs font-medium">No reviews submitted yet. Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map((rev, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                      {rev.name[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                      <span className="text-[10px] text-teal-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{formatDate(rev.createdAt)}</span>
                </div>

                <div className="flex text-amber-400 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-400" : "text-slate-800"}`} />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">{rev.comment}</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
