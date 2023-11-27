import { GeneralResponse } from "./response";

export interface AppointmentInterface {
  id?: string;
  date: Date;
  service_id: string;
  user_id: string;
  paymentId: string;
}

export interface EditAppointmentProps {
  user_id: string;
  date: Date;
  appointmentId: string;
}

export interface AppointmentRepository {
  createAppointment(
    appointment: AppointmentInterface
  ): Promise<GeneralResponse>;
  getAppointmentsByuser_id(id: string): Promise<AppointmentInterface[] | null>;
  editAppointment({
    date,
    user_id,
  }: EditAppointmentProps): Promise<GeneralResponse>;
}
