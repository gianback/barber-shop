import { Router } from "express";
import { AppointmentRepository } from "../../interfaces/appointment";
import { AppointmentController } from "../../controllers/appointment.controller";
import { validateToken } from "../../middlewares/validate-token.middleware";
import { validatePost } from "../../middlewares/validate-post.middleware";
import { validateRoll } from "../../middlewares/validate-roll.middleware";
import { validateAppointment } from "../../middlewares/validate-appointment.middleware";

export const AppointmentRoute = (appointmentModel: AppointmentRepository) => {
  const appoinmentRoute = Router();

  const appointmentController = new AppointmentController(appointmentModel);

  appoinmentRoute.post(
    "/",
    validateToken,
    validateAppointment,
    appointmentController.createAppointment
  );
  appoinmentRoute.patch(
    "/",
    validateToken,
    appointmentController.editAppointment
  );
  appoinmentRoute.get(
    "/:id",
    validateToken,
    appointmentController.getAppointmentsByUserid
  );

  return appoinmentRoute;
};
