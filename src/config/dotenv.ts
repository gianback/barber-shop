import dotenv from "dotenv";

dotenv.config();

export const {
  SQL_HOST,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_PORT = process.env.SQL_PORT || 3306,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  JWT_SECRET = process.env.JWT_SECRET || "",
} = process.env;
