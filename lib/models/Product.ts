import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  tags?: string[];
  reviews?: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    category: { type: String, required: true, index: true },
    brand: { type: String, default: "NextShop" },
    images: { type: [String], required: true },
    stock: { type: Number, required: true, default: 10, min: 0 },
    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    numReviews: { type: Number, default: 24, min: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    tags: { type: [String], default: [] },
    reviews: { type: [ReviewSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
