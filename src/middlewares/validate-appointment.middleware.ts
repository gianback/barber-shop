import { NextFunction, Request, Response } from "express";
import { Appointment, Post } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validateAppointment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, serviceId, userId, paymentId } = req.body;
  const img = req.files && req.files[0];
  const appointment = {
    date,
    serviceId,
    userId,
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
