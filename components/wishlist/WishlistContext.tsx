"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SeedProduct } from "@/lib/db/seed-data";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: SeedProduct[];
  addToWishlist: (product: SeedProduct) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: SeedProduct) => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<SeedProduct[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nextshop_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load wishlist from storage:", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("nextshop_wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error("Failed to save wishlist to storage:", e);
      }
    }
  }, [wishlist, isInitialized]);

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId || item._id === productId);
  };

  const addToWishlist = (product: SeedProduct) => {
    const id = product.id || product._id;
    if (!isInWishlist(id)) {
      setWishlist((prev) => [...prev, product]);
      toast.success(`Saved "${product.name}" to your wishlist! ❤️`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId && item._id !== productId));
    toast.info("Removed item from wishlist.");
  };

  const toggleWishlist = (product: SeedProduct) => {
    const id = product.id || product._id;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
