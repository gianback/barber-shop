import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/dotenv";
import { Request, Response } from "express";

export class WebhookController {
  private static stripe = new Stripe(STRIPE_SECRET_KEY);
  private static endpointSecret =
    "whsec_25222d90d567bbedd6c22d0eb45997066f301002615cb20ed4f2ffb2bee49232";

  static listenEvents = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        this.endpointSecret
      );
    } catch (err: any) {
      console.log(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log({ event });
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log({ webhookSession: session });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // return res.send(200);
    return res.sendStatus(200).end();
  };
}
