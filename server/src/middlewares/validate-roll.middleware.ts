import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";
import { Roll } from "../lib/validate-inputs";

export const validateRoll = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;

    if (Roll.parse(decoded.roll)) {
      throw new Error("You has no permissions to do this action");
    }

    next();
  } catch (error) {
    throw new Error("Error Validating Roll Middleware");
  }
};
