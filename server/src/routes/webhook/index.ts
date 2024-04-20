import express, { Router } from "express";
import { WebhookController } from "../../controllers/webhook.controller";

export const WebhooksRoute = () => {
  const WebhooksRoute = Router();

  WebhooksRoute.post(
    "/",
    express.raw({ type: "application/json" }),
    WebhookController.listenEvents
  );

  return WebhooksRoute;
};
