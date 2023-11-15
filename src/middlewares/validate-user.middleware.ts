import { NextFunction, Request, Response } from "express";
import { User } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, surname, lastname, email, password } = req.body;
  const post = {
    name,
    surname,
    lastname,
    email,
    password,
  };

  try {
    const result = User.parse(post);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: error.issues.map(({ message }) => {
          message;
        }),
      });
    }

    throw new Error("Error middleware user");
  }

  next();
};
