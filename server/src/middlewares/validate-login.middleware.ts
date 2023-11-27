import { NextFunction, Request, Response } from "express";
import { Login } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    Login.parse({ email, password });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map(({ message, path }) => ({
        field: path[0],
        message,
      }));

      return res.status(400).json(errors);
    }
  }
};
