import { Request, Response } from "express";
import { AppointmentRepository } from "../interfaces/appointment";

export class AppointmentController {
  private appointmentModel: AppointmentRepository;
  constructor(appointmentModel: AppointmentRepository) {
    this.appointmentModel = appointmentModel;
  }

  createAppointment = async (req: Request, res: Response) => {
    const { date, service_id, user_id, paymentId } = req.body;

    const { message, status } = await this.appointmentModel.createAppointment({
      date,
      paymentId,
      service_id,
      user_id,
    });

    return res.status(status).json(message);
  };

  getAppointmentsByuser_id = async (req: Request, res: Response) => {
    const { id } = req.params;
    const appointments = await this.appointmentModel.getAppointmentsByuser_id(
      id
    );

    if (!appointments) {
      return res.status(404).json({ message: "No appointments found" });
    }

    return res.status(200).json({ appointments });
  };

  editAppointment = async (req: Request, res: Response) => {
    const { date, user_id } = req.body;
    const { id } = req.params;

    const { message, status } = await this.appointmentModel.editAppointment({
      appointmentId: id,
      user_id,
      date,
    });

    return res.status(status).json(message);
  };
}
