import {
  AppointmentInterface,
  EditAppointmentProps,
} from "../../interfaces/appointment";
import { pool } from "../../config/mysql";
import { GeneralResponse } from "../../interfaces/response";

export class AppointmentModelMysql {
  static async createAppointment({
    date,
    paymentId,
    service_id,
    user_id,
  }: AppointmentInterface): Promise<GeneralResponse> {
    try {
      await pool.query("INSERT INTO appointments SET ?", {
        date,
        paymentId,
        service_id,
        user_id,
      });

      return {
        status: 201,
        message: "Appointment created",
      };
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        return {
          status: 400,
          message: `Date ${Date} is ocupaied`,
        };
      }

      throw new Error("Something went wrong createing the user with MYSQL");
    }
  }

  static async getAppointmentsByuser_id(
    id: string
  ): Promise<AppointmentInterface[] | null> {
    try {
      const findAppointments = await pool.query<AppointmentInterface[]>(
        "SELECT * FROM appointment WHERE user_id = ?",
        [id]
      );

      if (findAppointments.length === 0) return null;

      return findAppointments;
    } catch (error: any) {
      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }

  static async editAppointment({
    user_id,
    date,
    appointmentId,
  }: EditAppointmentProps): Promise<GeneralResponse> {
    try {
      const findAppointment = await pool.query<AppointmentInterface[]>(
        "SELECT user_id FROM appointment WHERE id = ?",
        [appointmentId]
      );

      if (findAppointment.length === 0)
        return {
          status: 400,
          message: "Appointment not found",
        };

      if (findAppointment[0].user_id !== user_id) {
        return {
          status: 400,
          message: "You can't edit this appointment",
        };
      }

      await pool.query("UPDATE appointment SET date = ? WHERE id = ", [
        date,
        appointmentId,
      ]);

      return {
        status: 200,
        message: "Appointment edited",
      };
    } catch (error: any) {
      throw new Error(
        "Something went wrong editing the appointment with MYSQL"
      );
    }
  }
}
