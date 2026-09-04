import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
      appInfo: {
        name: "NextShop E-Commerce",
        version: "1.0.0",
      },
    })
  : null;

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export async function createStripeCheckoutSession(items: CheckoutItem[], customerEmail?: string) {
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!stripe) {
    console.log("⚡ Stripe API Key not set. Simulating Stripe checkout session...");
    // Fallback sandbox simulation URL
    const demoSessionId = "demo_session_" + Math.random().toString(36).substring(2, 10);
    return {
      sessionId: demoSessionId,
      url: `${origin}/checkout/success?session_id=${demoSessionId}&demo=true`,
    };
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100), // convert dollars to cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: customerEmail,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    metadata: {
      itemCount: items.length.toString(),
    },
  });

  return {
    sessionId: session.id,
    url: session.url,
  };
}
