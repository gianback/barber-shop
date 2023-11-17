import { NextFunction, Request, Response } from "express";
import { User } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validateUserRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, surname, lastname, email, password } = req.body;
    User.parse({
      name,
      surname,
      lastname,
      email,
      password,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map(({ message, path }) => ({
        field: path[0],
        message,
      }));

      return res.status(400).json(errors);
    }

    throw new Error("Error Middleware register");
  }
};
