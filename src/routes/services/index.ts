import { Router } from "express";
import { ServiceRepository } from "../../interfaces/service";
import { ServiceController } from "../../controllers/service.controller";
import { validateRoll } from "../../middlewares/validate-roll.middleware";
import { validateService } from "../../middlewares/validate-service.middleware";
import { validateToken } from "../../middlewares/validate-token.middleware";

export const ServiceRoute = (serviceModel: ServiceRepository) => {
  const serviceRoute = Router();

  const serviceController = new ServiceController(serviceModel);

  serviceRoute.post(
    "/",
    validateRoll,
    validateService,
    serviceController.createService
  );
  serviceRoute.delete("/:id", validateRoll, serviceController.deleteService);
  serviceRoute.get("/", validateToken, serviceController.getServices);
  serviceRoute.patch("/:id", validateRoll, serviceController.updateService);

  return serviceRoute;
};
