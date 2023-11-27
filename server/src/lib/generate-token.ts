import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

export const generateToken = (email: string): string => {
  const token = sign({ email }, JWT_SECRET, { expiresIn: "2h" });

  return token;
};
