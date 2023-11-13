import { GeneralResponse } from "./user";

export interface AppointmentInterface {
  id?: string;
  date: Date;
  serviceId: string;
  userId: string;
  paymentId: string;
}

export interface EditAppointmentProps {
  userId: string;
  date: Date;
}

export interface AppointmentRepository {
  createAppointment(
    appointment: AppointmentInterface
  ): Promise<GeneralResponse>;
  getAppointmentsByUserid(id: string): Promise<AppointmentInterface[] | null>;
  editAppointment({
    date,
    userId,
  }: EditAppointmentProps): Promise<GeneralResponse>;
}
