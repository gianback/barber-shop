import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Roll } from "../lib/validate-inputs";

export const validateRoll = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!Roll.parse(decoded.roll)) {
      res.json("You has no permissions to do this action");
    }

    next();
  } catch (error) {
    res.json(error);
  }
};
