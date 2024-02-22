import { Router } from "express";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY, URL_FRONT } from "../../config/dotenv";
const stripe = new Stripe(STRIPE_SECRET_KEY);
export const PaymentRoute = Router();

PaymentRoute.post("/", async (req, res) => {
  /* 
  
  TODO: MANDAR LOS IDS Y BUSCAR EN LA BD
  
  */
  const product = await stripe.products.create({
    name: "Corte de cabello",
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 25 * 100,
    currency: "usd",
  });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: req.headers.origin + "?success=true",
    cancel_url: req.headers.origin + "?canceled=true",
  });
  return res.json({ session });
});
