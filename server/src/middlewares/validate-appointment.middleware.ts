import { NextFunction, Request, Response } from "express";
import { Appointment } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validateAppointment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, service_id, user_id, paymentId } = req.body;

  const appointment = {
    date,
    service_id,
    user_id,
    paymentId,
  };

  try {
    const result = Appointment.parse(appointment);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: error.issues.map(({ message }) => {
          message;
        }),
      });
    }

    throw new Error("Error middleware Appointment");
  }

  next();
};
