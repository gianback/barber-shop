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
  if (!file) {
    return res.status(400).json({ message: "Img is required" });
  }
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
      const errorFormated = error.issues.map(({ message }) => {
        message;
      });
      return res.status(400).json({
        message: errorFormated,
      });
    }

    throw new Error("Error middleware service");
  }
};
