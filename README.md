# 🛒 NextShop | Full-Stack Next.js E-Commerce Platform

A production-ready, high-performance full-stack e-commerce web application built with **Next.js 14 (App Router)**, **TypeScript**, **MongoDB (Mongoose)**, **App Router Server Actions**, **Stripe Checkout System**, **AWS S3 Cloud Storage**, and **Tailwind CSS + Shadcn UI**.

---

## 🌟 Key Features & Highlights

- ⚡ **Full-Stack Next.js 14 App Router**: Engineered with TypeScript and Next.js Server Actions for clean, type-safe backend integration.
- 📦 **Product Catalog & Instant Filtering**: Real-time category filtering (Audio, Laptops, Mobile, Lifestyle), price sorting, and keyword search.
- ⭐ **Product Reviews & Verified Feedback**: Star rating picker, customer review submission form, and dynamic rating score recalculation.
- 🛒 **Persistent Shopping Cart**: Interactive slide-over cart drawer (`CartSheet`), quantity controls, promo code discount calculator (`NEXTSHOP20`), and free shipping progress bar.
- 💳 **Stripe Checkout Integration**: Secure checkout sessions, webhook handlers (`/api/webhooks/stripe`), and payment verification workflow with test mode fallback.
- ☁️ **AWS S3 Image Storage**: Scalable product media management using `@aws-sdk/client-s3` and direct presigned image upload endpoints (`/api/upload`).
- ❤️ **Wishlist System**: Persistent favorite items state with one-click "Move to Cart".
- 🚚 **Live Order Tracking Portal (`/orders`)**: Real-time shipment status lookup by Order ID or Email with a 4-step progress timeline (*Order Placed → Stripe Paid → Processing → Delivered*).
- 📊 **Admin Dashboard (`/admin`)**: Metric cards (sales revenue, asset valuation, order count), low-stock warning alerts (stock ≤ 10), and modal product creation with AWS S3 file upload preview.
- 🎨 **Modern Glassmorphism UI**: Curated slate/indigo dark theme, responsive layouts across devices, and Sonner toast notifications.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [MongoDB](https://www.mongodb.com/) & [Mongoose ORM](https://mongoosejs.com/) |
| **Payments** | [Stripe Checkout API](https://stripe.com/) |
| **Storage** | [AWS S3 Bucket](https://aws.amazon.com/s3/) (`@aws-sdk/client-s3`) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/) |
| **Icons & Motion** | [Lucide React](https://lucide.dev/) & [Framer Motion](https://www.framer.com/motion/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Deployment** | Vercel Production Ready |

---

## 🏗️ Project Architecture & Folder Structure

```
NextShop/
├── app/
│   ├── layout.tsx                # Root Layout with Navbar, Footer & Providers
│   ├── page.tsx                  # Home Page (Hero, Categories & Trending Tech)
│   ├── products/
│   │   ├── page.tsx              # Products Catalog Page
│   │   └── [id]/
│   │       ├── page.tsx          # Product Detail Server Page
│   │       └── ProductDetailClient.tsx # Client Detail View with Gallery & Reviews
│   ├── cart/
│   │   └── page.tsx              # Full Shopping Cart Page
│   ├── orders/
│   │   └── page.tsx              # Live Order Tracking & Status Portal
│   ├── wishlist/
│   │   └── page.tsx              # Saved Wishlist Items Page
│   ├── checkout/
│   │   └── success/
│   │       └── page.tsx          # Stripe Order Receipt Confirmation
│   ├── admin/
│   │   └── page.tsx              # Admin Management Dashboard
│   └── api/
│       ├── checkout/route.ts     # Stripe Checkout Session API Endpoint
│       ├── upload/route.ts       # AWS S3 Image Upload Endpoint
│       └── webhooks/stripe/      # Stripe Webhook Event Listener
├── components/
│   ├── layout/                   # Navbar & Footer Layout Components
│   ├── product/                  # ProductCard, ProductGrid, ProductFilter, Reviews
│   ├── cart/                     # CartContext & Slide-over CartSheet Drawer
│   ├── wishlist/                 # WishlistContext Provider
│   └── admin/                    # AdminProductTable & ProductModal
├── lib/
│   ├── db/                       # MongoDB Connection Caching & Seed Data
│   ├── models/                   # Mongoose Schemas (Product, Order, Category)
│   ├── actions/                  # Server Actions (product-actions, order-actions)
│   ├── stripe.ts                 # Stripe SDK Initialization
│   └── s3.ts                     # AWS S3 SDK Client
└── public/                       # Static branding & fallback assets
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/rajashish14/NextShop.git
cd NextShop
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nextshop?retryWrites=true&w=majority

# Stripe Credentials
STRIPE_SECRET_KEY=sk_test_51P...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51P...

# AWS S3 Storage
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET_NAME=nextshop-product-images

# Next.js App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed the Database (Optional)
```bash
npm run seed
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser to explore NextShop!

---

## 📄 License
This project is open-source under the MIT License. Built by [rajashish14](https://github.com/rajashish14).
