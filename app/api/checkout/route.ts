import { NextResponse } from "next/server";
import { createCheckoutSessionAction } from "@/lib/actions/order-actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingAddress } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await createCheckoutSessionAction({ items, shippingAddress });

    return NextResponse.json({ url: session.url, sessionId: session.sessionId });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ error: error.message || "Checkout session creation failed" }, { status: 500 });
  }
}
