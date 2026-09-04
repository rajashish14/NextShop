"use server";

import { connectToDatabase } from "../db/mongodb";
import Product, { IProduct } from "../models/Product";
import Category from "../models/Category";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, SeedProduct } from "../db/seed-data";
import { revalidatePath } from "next/cache";

export interface GetProductsFilter {
  category?: string;
  search?: string;
  sort?: "price-low" | "price-high" | "rating" | "newest";
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

// Convert Mongoose doc or fallback object to plain serializable JS object
function serializeProduct(product: any): SeedProduct {
  const idStr = product._id ? product._id.toString() : product.id ? String(product.id) : `prod-${Date.now()}`;
  return {
    id: idStr,
    _id: idStr,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    category: product.category,
    brand: product.brand || "NextShop",
    images: Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"],
    stock: product.stock ?? 10,
    rating: product.rating ?? 4.8,
    numReviews: product.numReviews ?? (Array.isArray(product.reviews) ? product.reviews.length : 20),
    isFeatured: Boolean(product.isFeatured),
    tags: Array.isArray(product.tags) ? product.tags : [],
    reviews: Array.isArray(product.reviews) ? product.reviews : [],
  };
}

// Global in-memory storage fallback for demo execution
let MEMORY_PRODUCTS: SeedProduct[] = [...INITIAL_PRODUCTS];

export async function getProducts(filters: GetProductsFilter = {}): Promise<SeedProduct[]> {
  const mongooseInstance = await connectToDatabase();

  let productsList: SeedProduct[] = [];

  if (mongooseInstance && Product) {
    try {
      const query: any = {};

      if (filters.category && filters.category !== "all") {
        query.category = filters.category;
      }

      if (filters.featured) {
        query.isFeatured = true;
      }

      if (filters.search) {
        query.$or = [
          { name: { $regex: filters.search, $options: "i" } },
          { description: { $regex: filters.search, $options: "i" } },
          { brand: { $regex: filters.search, $options: "i" } },
        ];
      }

      let sortOptions: any = { createdAt: -1 };
      if (filters.sort === "price-low") sortOptions = { price: 1 };
      if (filters.sort === "price-high") sortOptions = { price: -1 };
      if (filters.sort === "rating") sortOptions = { rating: -1 };

      const dbProducts = await Product.find(query).sort(sortOptions).lean();

      if (dbProducts && dbProducts.length > 0) {
        productsList = dbProducts.map(serializeProduct);
      }
    } catch (e) {
      console.warn("⚠️ MongoDB query failed, falling back to memory state.");
    }
  }

  if (productsList.length === 0) {
    productsList = [...MEMORY_PRODUCTS];

    if (filters.category && filters.category !== "all") {
      productsList = productsList.filter((p) => p.category === filters.category);
    }

    if (filters.featured) {
      productsList = productsList.filter((p) => p.isFeatured);
    }

    if (filters.search) {
      const s = filters.search.toLowerCase();
      productsList = productsList.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s)
      );
    }

    if (filters.sort === "price-low") {
      productsList.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      productsList.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating") {
      productsList.sort((a, b) => b.rating - a.rating);
    }
  }

  if (filters.minPrice !== undefined) {
    productsList = productsList.filter((p) => p.price >= (filters.minPrice || 0));
  }
  if (filters.maxPrice !== undefined) {
    productsList = productsList.filter((p) => p.price <= (filters.maxPrice || Infinity));
  }

  return productsList;
}

export async function getProductById(id: string): Promise<SeedProduct | null> {
  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Product) {
    try {
      const dbProduct = await Product.findById(id).lean();
      if (dbProduct) return serializeProduct(dbProduct);
    } catch (e) {
      // ignore & check fallback
    }
  }

  const found = MEMORY_PRODUCTS.find((p) => p.id === id || p._id === id);
  return found ? serializeProduct(found) : null;
}

export async function getProductBySlug(slug: string): Promise<SeedProduct | null> {
  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Product) {
    try {
      const dbProduct = await Product.findOne({ slug }).lean();
      if (dbProduct) return serializeProduct(dbProduct);
    } catch (e) {
      // ignore
    }
  }

  const found = MEMORY_PRODUCTS.find((p) => p.slug === slug);
  return found ? serializeProduct(found) : null;
}

export async function getCategories() {
  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Category) {
    try {
      const cats = await Category.find().lean();
      if (cats && cats.length > 0) {
        return cats.map((c) => ({
          name: c.name,
          slug: c.slug,
          image: c.image,
          description: c.description || "",
          productCount: c.productCount || 0,
        }));
      }
    } catch (e) {
      // ignore
    }
  }

  return INITIAL_CATEGORIES;
}

export async function createProduct(formData: Partial<SeedProduct>) {
  const slug =
    formData.slug ||
    formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
    `prod-${Date.now()}`;

  const newProductData = {
    name: formData.name || "New Product",
    slug,
    description: formData.description || "High quality e-commerce product.",
    price: Number(formData.price) || 99.99,
    originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
    category: formData.category || "audio-wearables",
    brand: formData.brand || "NextShop",
    images: formData.images && formData.images.length > 0
      ? formData.images
      : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"],
    stock: Number(formData.stock) || 15,
    rating: 4.9,
    numReviews: 1,
    isFeatured: Boolean(formData.isFeatured),
    tags: formData.tags || ["new"],
  };

  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Product) {
    try {
      const created = await Product.create(newProductData);
      revalidatePath("/products");
      revalidatePath("/admin");
      revalidatePath("/");
      return { success: true, product: serializeProduct(created) };
    } catch (e: any) {
      console.warn("⚠️ MongoDB save failed, using memory state:", e.message);
    }
  }

  const memoryProduct: SeedProduct = {
    ...newProductData,
    id: `prod-${Date.now()}`,
    _id: `prod-${Date.now()}`,
  };

  MEMORY_PRODUCTS.unshift(memoryProduct);
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/");

  return { success: true, product: memoryProduct };
}

export async function deleteProduct(id: string) {
  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Product) {
    try {
      await Product.findByIdAndDelete(id);
    } catch (e) {
      // ignore
    }
  }

  MEMORY_PRODUCTS = MEMORY_PRODUCTS.filter((p) => p.id !== id && p._id !== id);
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/");

  return { success: true };
}

export async function submitProductReview(
  productId: string,
  reviewData: { name: string; rating: number; comment: string }
) {
  const mongooseInstance = await connectToDatabase();

  const newReview = {
    name: reviewData.name,
    rating: Number(reviewData.rating),
    comment: reviewData.comment,
    createdAt: new Date(),
  };

  if (mongooseInstance && Product) {
    try {
      const product = await Product.findById(productId);
      if (product) {
        product.reviews = product.reviews || [];
        product.reviews.unshift(newReview as any);
        product.numReviews = product.reviews.length;
        
        const totalRating = product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
        product.rating = Number((totalRating / product.reviews.length).toFixed(1));

        await product.save();
        revalidatePath(`/products/${productId}`);
        revalidatePath(`/products`);
        return { success: true, product: serializeProduct(product) };
      }
    } catch (e) {
      console.warn("⚠️ MongoDB review save failed, updating memory state.");
    }
  }

  const memoryProduct = MEMORY_PRODUCTS.find((p) => p.id === productId || p._id === productId);
  if (memoryProduct) {
    memoryProduct.reviews = memoryProduct.reviews || [];
    memoryProduct.reviews.unshift(newReview);
    memoryProduct.numReviews = memoryProduct.reviews.length;
    const totalRating = memoryProduct.reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    memoryProduct.rating = Number((totalRating / memoryProduct.reviews.length).toFixed(1));

    revalidatePath(`/products/${productId}`);
    revalidatePath(`/products`);
    return { success: true, product: serializeProduct(memoryProduct) };
  }

  return { success: false, error: "Product not found" };
}
