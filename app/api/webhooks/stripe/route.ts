import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectToDatabase } from "@/lib/db/mongodb";
import Order from "@/lib/models/Order";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!stripe || !signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, simulated: true });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const mongooseInstance = await connectToDatabase();
    if (mongooseInstance && Order) {
      await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          isPaid: true,
          paidAt: new Date(),
          stripePaymentIntentId: session.payment_intent as string,
          orderStatus: "processing",
        }
      );
    }
  }

  return NextResponse.json({ received: true });
}
