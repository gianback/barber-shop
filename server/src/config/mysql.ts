import mysql from "mysql2/promise.js";
import {
  SQL_DATABASE,
  SQL_HOST,
  SQL_PASSWORD,
  SQL_PORT,
  SQL_USER,
} from "./dotenv";

export const pool = await mysql.createConnection({
  host:SQL_HOST,
  user:SQL_USER,
  database:SQL_DATABASE,
  password: SQL_PASSWORD,
  port: +SQL_PORT
});
