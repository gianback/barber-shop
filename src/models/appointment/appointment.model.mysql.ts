import {
  AppointmentInterface,
  EditAppointmentProps,
} from "../../interfaces/appointment";
import { pool } from "../../config/mysql";
import { GeneralResponse } from "../../interfaces/user";

export class AppointmentModelMysql {
  static async createAppointment({
    date,
    paymentId,
    serviceId,
    userId,
  }: AppointmentInterface): Promise<GeneralResponse> {
    try {
      await pool.query<AppointmentInterface>("INSERT INTO appointments SET ?", {
        date,
        paymentId,
        serviceId,
        userId,
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

  static async getAppointmentsByUserid(
    id: string
  ): Promise<AppointmentInterface[] | null> {
    try {
      const findAppointments = await pool.query<AppointmentInterface[]>(
        "SELECT * FROM appointments WHERE userId = ?",
        [id]
      );
      return findAppointments;
    } catch (error) {
      throw new Error(
        "Something went wrong getting the appointments by id with MYSQL"
      );
    }
  }

  static async editAppointment({
    userId,
    date,
  }: EditAppointmentProps): Promise<GeneralResponse> {
    try {
      await pool.query<AppointmentInterface>(
        "UPDATE appointment SET date = ? WHERE user_id = ?",
        [date, userId]
      );

      return {
        status: 200,
        message: "Appointment edited",
      };
    } catch (error: any) {
      throw new Error("Something went wron editing the appointment with MYSQL");
    }
  }
}
