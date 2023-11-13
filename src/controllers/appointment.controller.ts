import { Request, Response } from "express";
import { AppointmentRepository } from "../interfaces/appointment";

export class AppointmentController {
  private appointmentModel: AppointmentRepository;
  constructor(appointmentModel: AppointmentRepository) {
    this.appointmentModel = appointmentModel;
  }

  createAppointment = async (req: Request, res: Response) => {
    const { date, serviceId, userId, paymentId } = req.body;

    const creatingAppointment = await this.appointmentModel.createAppointment({
      date,
      paymentId,
      serviceId,
      userId,
    });

    if (creatingAppointment.status === 400) {
      return res.status(400).json({ message: creatingAppointment.message });
    }
    return res.status(201).json({ message: creatingAppointment.message });
  };

  getAppointmentsByUserid = async (req: Request, res: Response) => {
    const { id } = req.params;

    const appointments = await this.appointmentModel.getAppointmentsByUserid(
      id
    );

    if (!appointments) {
      return res.status(400).json({ message: "No appointments found" });
    }

    return res.status(200).json({ appointments });
  };

  editAppointment = async (req: Request, res: Response) => {
    const { date, userId } = req.body;

    const editingAppointment = await this.appointmentModel.editAppointment({
      userId,
      date,
    });

    if (editingAppointment.status === 400) {
      return res.status(400).json({ message: editingAppointment.message });
    }
    return res.status(201).json({ message: editingAppointment.message });
  };
}
