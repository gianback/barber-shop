import { NextFunction, Request, Response } from "express";
import { Service } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validateService = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, price } = req.body;
  const img = req.files && req.files[0];
  const post = {
    name,
    description,
    price,
    img,
  };

  try {
    const result = Service.parse(post);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: error.issues.map(({ message }) => {
          message;
        }),
      });
    }

    throw new Error("Error middleware service");
  }

  next();
};
