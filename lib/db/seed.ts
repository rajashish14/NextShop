import { connectToDatabase } from "./mongodb.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "./seed-data.js";

export async function seedDatabase() {
  const mongooseInstance = await connectToDatabase();

  if (!mongooseInstance) {
    console.log("ℹ️ Skipping MongoDB seed - MONGODB_URI not available. Utilizing in-memory demo dataset.");
    return { success: true, count: INITIAL_PRODUCTS.length };
  }

  try {
    console.log("🌱 Seeding MongoDB collections...");

    await Category.deleteMany({});
    await Category.insertMany(INITIAL_CATEGORIES);

    await Product.deleteMany({});
    await Product.insertMany(INITIAL_PRODUCTS);

    console.log(`✅ Seeded ${INITIAL_CATEGORIES.length} categories and ${INITIAL_PRODUCTS.length} products successfully!`);
    return { success: true, count: INITIAL_PRODUCTS.length };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

if (process.argv[1]?.includes("seed.ts")) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
