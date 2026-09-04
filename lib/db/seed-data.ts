export interface SeedReview {
  name: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
}

export interface SeedProduct {
  id: string;
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  tags: string[];
  reviews?: SeedReview[];
}

export interface SeedCategory {
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export const INITIAL_CATEGORIES: SeedCategory[] = [
  {
    name: "Audio & Wearables",
    slug: "audio-wearables",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    description: "Premium noise-canceling headphones, earbuds, and smart devices.",
    productCount: 4,
  },
  {
    name: "Laptops & Computing",
    slug: "laptops-computing",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-sleek laptops, mechanical keyboards, and studio gear.",
    productCount: 3,
  },
  {
    name: "Smartphones & Mobile",
    slug: "smartphones-mobile",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    description: "Flagship smartphones, mag-safe accessories, and power banks.",
    productCount: 3,
  },
  {
    name: "Lifestyle & Apparel",
    slug: "lifestyle-apparel",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    description: "Ergonomic EDC backpacks, minimalist watches, and lifestyle gear.",
    productCount: 2,
  },
];

export const INITIAL_PRODUCTS: SeedProduct[] = [
  {
    id: "prod-1",
    _id: "prod-1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5-wireless-headphones",
    description: "Industry-leading noise canceling with two processors and eight microphones for unprecedented sound quality. Crystal clear hands-free calling with 4 beamforming microphones.",
    price: 348.0,
    originalPrice: 399.99,
    category: "audio-wearables",
    brand: "Sony",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 18,
    rating: 4.9,
    numReviews: 3,
    isFeatured: true,
    tags: ["wireless", "noise-canceling", "bluetooth", "premium"],
    reviews: [
      { name: "Marcus Vance", rating: 5, comment: "The noise cancellation on airplane flights is astounding. Battery lasts for days!", createdAt: "2026-08-15" },
      { name: "Elena Rostova", rating: 5, comment: "Super light on the head and deep bass response. Worth every penny.", createdAt: "2026-08-20" },
      { name: "David Chen", rating: 4, comment: "Phenomenal mic quality for Zoom meetings and music clarity.", createdAt: "2026-08-28" }
    ],
  },
  {
    id: "prod-2",
    _id: "prod-2",
    name: "Apple MacBook Pro 16-inch M3 Max",
    slug: "apple-macbook-pro-16-m3-max",
    description: "The 16-inch MacBook Pro blasts forward with M3 Max, an insanely advanced chip that brings massive performance and capability for extreme workflows.",
    price: 2499.0,
    originalPrice: 2699.0,
    category: "laptops-computing",
    brand: "Apple",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 8,
    rating: 4.95,
    numReviews: 2,
    isFeatured: true,
    tags: ["macbook", "m3 max", "apple", "laptop"],
    reviews: [
      { name: "Sarah Lin", rating: 5, comment: "Compiles massive Next.js projects in seconds! Screen is breathtaking.", createdAt: "2026-08-10" },
      { name: "Brian K.", rating: 5, comment: "Best laptop display and battery life I have ever owned.", createdAt: "2026-08-18" }
    ],
  },
  {
    id: "prod-3",
    _id: "prod-3",
    name: "Keychron Q1 Pro Wireless Mechanical Keyboard",
    slug: "keychron-q1-pro-wireless-mechanical-keyboard",
    description: "Full aluminum QMK/VIA wireless custom mechanical keyboard with double-gasket design, RGB backlighting, and hot-swappable switches.",
    price: 199.5,
    originalPrice: 220.0,
    category: "laptops-computing",
    brand: "Keychron",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 25,
    rating: 4.8,
    numReviews: 1,
    isFeatured: true,
    tags: ["keyboard", "mechanical", "custom", "rgb"],
    reviews: [
      { name: "Alex R.", rating: 5, comment: "Solid heavy aluminum case and buttery smooth typing sound profile.", createdAt: "2026-08-22" }
    ],
  },
  {
    id: "prod-4",
    _id: "prod-4",
    name: "Samsung Galaxy S24 Ultra 512GB Titanium",
    slug: "samsung-galaxy-s24-ultra-titanium",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity, and possibility.",
    price: 1299.0,
    originalPrice: 1419.99,
    category: "smartphones-mobile",
    brand: "Samsung",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 12,
    rating: 4.7,
    numReviews: 1,
    isFeatured: true,
    tags: ["smartphone", "galaxy", "5g", "samsung"],
    reviews: [
      { name: "Jordan M.", rating: 5, comment: "The 100x zoom camera and AI features are unreal.", createdAt: "2026-08-25" }
    ],
  },
  {
    id: "prod-5",
    _id: "prod-5",
    name: "Minimalist Chronograph Matte Watch",
    slug: "minimalist-chronograph-matte-watch",
    description: "Crafted with surgical-grade 316L stainless steel, sapphire crystal glass, and Japanese quartz movement. Water-resistant up to 50M.",
    price: 185.0,
    originalPrice: 240.0,
    category: "lifestyle-apparel",
    brand: "Nordic Time",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 30,
    rating: 4.6,
    numReviews: 1,
    isFeatured: false,
    tags: ["watch", "minimalist", "accessories"],
    reviews: [],
  },
  {
    id: "prod-6",
    _id: "prod-6",
    name: "Bose QuietComfort Ultra Earbuds",
    slug: "bose-quietcomfort-ultra-earbuds",
    description: "World-class noise cancellation, groundbreaking spatialized audio, and CustomTune technology for personalized sound.",
    price: 299.0,
    originalPrice: 329.0,
    category: "audio-wearables",
    brand: "Bose",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 15,
    rating: 4.85,
    numReviews: 1,
    isFeatured: false,
    tags: ["earbuds", "bose", "audio"],
    reviews: [],
  },
  {
    id: "prod-7",
    _id: "prod-7",
    name: "Dell UltraSharp 27 4K USB-C Hub Monitor",
    slug: "dell-ultrasharp-27-4k-monitor",
    description: "Experience brilliant color and clarity with 98% DCI-P3 wide color coverage, ComfortView Plus built-in low blue light, and 90W USB-C power delivery.",
    price: 549.99,
    originalPrice: 620.0,
    category: "laptops-computing",
    brand: "Dell",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 9,
    rating: 4.75,
    numReviews: 1,
    isFeatured: false,
    tags: ["monitor", "4k", "display", "dell"],
    reviews: [],
  },
  {
    id: "prod-8",
    _id: "prod-8",
    name: "Anker MagGo 10,000mAh Magnetic Power Bank",
    slug: "anker-maggo-10000mah-power-bank",
    description: "Qi2 certified 15W ultra-fast wireless charging with smart LCD display screen and built-in foldable kickstand.",
    price: 79.99,
    originalPrice: 89.99,
    category: "smartphones-mobile",
    brand: "Anker",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 40,
    rating: 4.9,
    numReviews: 1,
    isFeatured: false,
    tags: ["powerbank", "magsafe", "anker"],
    reviews: [],
  },
  {
    id: "prod-9",
    _id: "prod-9",
    name: "Nomad Everyday EDC Tech Backpack 24L",
    slug: "nomad-everyday-edc-tech-backpack-24l",
    description: "Waterproof Cordura ballistic nylon build with padded 16-inch laptop compartment, hidden RFID passport pocket, and magnetic sternum strap.",
    price: 169.0,
    originalPrice: 199.0,
    category: "lifestyle-apparel",
    brand: "Nomad",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 22,
    rating: 4.8,
    numReviews: 1,
    isFeatured: true,
    tags: ["backpack", "travel", "waterproof"],
    reviews: [],
  },
];
