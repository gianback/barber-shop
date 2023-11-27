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
    validateToken,
    validateRoll,
    validateService,
    serviceController.createService
  );
  serviceRoute.get("/", serviceController.getServices);
  serviceRoute.delete(
    "/:id",
    validateToken,
    validateRoll,
    serviceController.deleteService
  );
  serviceRoute.patch(
    "/:id",
    validateToken,
    validateRoll,
    serviceController.updateService
  );

  return serviceRoute;
};
