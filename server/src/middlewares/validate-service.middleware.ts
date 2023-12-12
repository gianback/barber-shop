import { NextFunction, Request, Response } from "express";
import { Service } from "../lib/validate-inputs";
import { ZodError } from "zod";
export const validateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, price } = req.body;
  const file = req.file;
  const service = {
    name,
    description,
    price: +price,
    img: file,
  };
  try {
    Service.parse(service);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
    }

    throw new Error("Error middleware service");
  }
};
