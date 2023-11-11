import dotenv from "dotenv";

dotenv.config();

export const {
  SQL_HOST,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_PORT = process.env.SQL_PORT || 3306,
} = process.env;
