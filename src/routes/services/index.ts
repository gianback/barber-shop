import { Router } from "express";
import { ServiceRepository } from "../../interfaces/service";
import { ServiceController } from "../../controllers/service.controller";

export const ServiceRoute = (serviceModel: ServiceRepository) => {
  const serviceRoute = Router();

  const serviceController = new ServiceController(serviceModel);

  serviceRoute.post("/", serviceController.createService);
  serviceRoute.delete("/:id", serviceController.deleteService);
  serviceRoute.get("/", serviceController.getServices);
  serviceRoute.patch("/:id", serviceController.updateService);

  return serviceRoute;
};
