import { Request, Response } from "express";
import { AppointmentRepository } from "../interfaces/appointment";

export class AppointmentController {
  private appointmentModel: AppointmentRepository;
  constructor(appointmentModel: AppointmentRepository) {
    this.appointmentModel = appointmentModel;
  }

  createAppointment = async (req: Request, res: Response) => {
    const { date, serviceId, userId, paymentId } = req.body;

    const { message, status } = await this.appointmentModel.createAppointment({
      date,
      paymentId,
      serviceId,
      userId,
    });

    return res.status(status).json(message);
  };

  getAppointmentsByUserid = async (req: Request, res: Response) => {
    const { id } = req.params;
    const appointments = await this.appointmentModel.getAppointmentsByUserid(
      id
    );

    if (!appointments) {
      return res.status(404).json({ message: "No appointments found" });
    }

    return res.status(200).json({ appointments });
  };

  editAppointment = async (req: Request, res: Response) => {
    const { date, userId } = req.body;

    const { message, status } = await this.appointmentModel.editAppointment({
      userId,
      date,
    });

    return res.status(status).json(message);
  };
}
