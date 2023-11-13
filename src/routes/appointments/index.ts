import { Router } from "express";
import { AppointmentRepository } from "../../interfaces/appointment";
import { AppointmentController } from "../../controllers/appointment.controller";

export const AppointmentRoute = (appointmentModel: AppointmentRepository) => {
  const appoinmentRoute = Router();

  const appointmentController = new AppointmentController(appointmentModel);

  appoinmentRoute.post("/", appointmentController.createAppointment);
  appoinmentRoute.patch("/", appointmentController.editAppointment);
  appoinmentRoute.get("/:id", appointmentController.getAppointmentsByUserid);

  return appoinmentRoute;
};
