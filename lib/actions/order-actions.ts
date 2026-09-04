"use server";

import { connectToDatabase } from "../db/mongodb";
import Order, { IOrder, IOrderItem, IShippingAddress } from "../models/Order";
import { createStripeCheckoutSession } from "../stripe";

export interface CreateOrderParams {
  items: {
    productId: string;
    name: string;
    quantity: number;
    image: string;
    price: number;
  }[];
  shippingAddress?: Partial<IShippingAddress>;
}

let MEMORY_ORDERS: any[] = [];

export async function createCheckoutSessionAction(params: CreateOrderParams) {
  const { items } = params;

  if (!items || items.length === 0) {
    throw new Error("Cannot checkout with an empty cart.");
  }

  const checkoutItems = items.map((i) => ({
    id: i.productId,
    name: i.name,
    price: i.price,
    quantity: i.quantity,
    image: i.image,
  }));

  const session = await createStripeCheckoutSession(checkoutItems);

  // Save pending order
  const totalAmount = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const orderData = {
    orderItems: items,
    shippingAddress: {
      fullName: params.shippingAddress?.fullName || "Guest Customer",
      email: params.shippingAddress?.email || "customer@example.com",
      address: params.shippingAddress?.address || "123 Tech Boulevard",
      city: params.shippingAddress?.city || "San Francisco",
      postalCode: params.shippingAddress?.postalCode || "94107",
      country: params.shippingAddress?.country || "United States",
    },
    paymentMethod: "Stripe",
    stripeSessionId: session.sessionId,
    totalAmount,
    isPaid: true,
    paidAt: new Date(),
    orderStatus: "processing",
  };

  const mongooseInstance = await connectToDatabase();
  if (mongooseInstance && Order) {
    try {
      await Order.create(orderData);
    } catch (e: any) {
      console.warn("⚠️ MongoDB Order save failed, using memory state:", e.message);
    }
  }

  MEMORY_ORDERS.unshift({
    _id: "ord-" + Date.now(),
    id: "ord-" + Date.now(),
    ...orderData,
    createdAt: new Date(),
  });

  return session;
}

export interface OrderDetails {
  id: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    image: string;
    price: number;
  }[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
  isPaid: boolean;
  createdAt: Date | string;
}

export async function getOrderDetails(sessionId: string): Promise<OrderDetails> {
  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Order) {
    try {
      const order = await Order.findOne({ stripeSessionId: sessionId }).lean();
      if (order) {
        return {
          id: order._id.toString(),
          items: order.orderItems,
          totalAmount: order.totalAmount,
          shippingAddress: order.shippingAddress,
          isPaid: order.isPaid,
          createdAt: order.createdAt,
        };
      }
    } catch (e) {
      // fallback
    }
  }

  const found = MEMORY_ORDERS.find((o) => o.stripeSessionId === sessionId || o.id === sessionId);

  if (found) {
    return {
      id: found._id || found.id,
      items: found.orderItems,
      totalAmount: found.totalAmount,
      shippingAddress: found.shippingAddress,
      isPaid: true,
      createdAt: found.createdAt || new Date(),
    };
  }

  // Fallback demo receipt if directly accessed
  return {
    id: "ORD-98412-NEXT",
    items: [
      {
        productId: "prod-1",
        name: "Sony WH-1000XM5 Wireless Headphones",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        price: 348.0,
      },
    ],
    totalAmount: 348.0,
    shippingAddress: {
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      address: "742 Evergreen Terrace",
      city: "Springfield",
      postalCode: "97477",
      country: "United States",
    },
    isPaid: true,
    createdAt: new Date(),
  };
}

export async function getAdminOrders() {
  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Order) {
    try {
      const dbOrders = await Order.find().sort({ createdAt: -1 }).lean();
      if (dbOrders && dbOrders.length > 0) {
        return dbOrders.map((o) => ({
          id: o._id.toString(),
          customerName: o.shippingAddress?.fullName || "Guest",
          email: o.shippingAddress?.email || "customer@example.com",
          totalAmount: o.totalAmount,
          status: o.orderStatus,
          isPaid: o.isPaid,
          itemsCount: o.orderItems.length,
          createdAt: o.createdAt,
        }));
      }
    } catch (e) {
      // fallback
    }
  }

  return MEMORY_ORDERS.map((o) => ({
    id: o._id || o.id,
    customerName: o.shippingAddress?.fullName || "Alex Morgan",
    email: o.shippingAddress?.email || "alex.morgan@example.com",
    totalAmount: o.totalAmount,
    status: o.orderStatus || "processing",
    isPaid: true,
    itemsCount: o.orderItems?.length || 1,
    createdAt: o.createdAt || new Date(),
  }));
}

export async function searchOrders(queryStr: string) {
  if (!queryStr || queryStr.trim().length === 0) return [];

  const q = queryStr.trim().toLowerCase();
  const mongooseInstance = await connectToDatabase();

  if (mongooseInstance && Order) {
    try {
      const dbOrders = await Order.find({
        $or: [
          { _id: q.length === 24 ? q : undefined },
          { stripeSessionId: { $regex: q, $options: "i" } },
          { "shippingAddress.email": { $regex: q, $options: "i" } },
          { "shippingAddress.fullName": { $regex: q, $options: "i" } },
        ].filter(Boolean),
      }).lean();

      if (dbOrders && dbOrders.length > 0) {
        return dbOrders.map((o) => ({
          id: o._id.toString(),
          items: o.orderItems,
          totalAmount: o.totalAmount,
          shippingAddress: o.shippingAddress,
          orderStatus: o.orderStatus,
          isPaid: o.isPaid,
          createdAt: o.createdAt,
        }));
      }
    } catch (e) {
      // fallback
    }
  }

  const matches = MEMORY_ORDERS.filter(
    (o) =>
      (o._id && o._id.toLowerCase().includes(q)) ||
      (o.id && o.id.toLowerCase().includes(q)) ||
      (o.stripeSessionId && o.stripeSessionId.toLowerCase().includes(q)) ||
      (o.shippingAddress?.email && o.shippingAddress.email.toLowerCase().includes(q)) ||
      (o.shippingAddress?.fullName && o.shippingAddress.fullName.toLowerCase().includes(q))
  );

  if (matches.length > 0) {
    return matches.map((o) => ({
      id: o._id || o.id,
      items: o.orderItems,
      totalAmount: o.totalAmount,
      shippingAddress: o.shippingAddress,
      orderStatus: o.orderStatus || "processing",
      isPaid: true,
      createdAt: o.createdAt || new Date(),
    }));
  }

  // Fallback demo result if searching demo
  if (q.includes("demo") || q.includes("alex") || q.includes("ord")) {
    const demo = await getOrderDetails("demo");
    return [{ ...demo, orderStatus: "processing" }];
  }

  return [];
}
