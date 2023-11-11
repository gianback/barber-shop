import mysql from "serverless-mysql";
import {
  SQL_DATABASE,
  SQL_HOST,
  SQL_PASSWORD,
  SQL_PORT,
  SQL_USER,
} from "./dotenv";

export const pool = mysql({
  config: {
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    port: +SQL_PORT,
  },
});
