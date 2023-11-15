import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { get } from "js-cookie";
import { JWT_SECRET } from "../config/dotenv";

export const validateToken = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = get("token") as string;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const isTokenValid = verify(token, JWT_SECRET);

  if (!isTokenValid) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
