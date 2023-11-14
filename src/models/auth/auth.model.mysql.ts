import { compare } from "bcrypt";
import { pool } from "../../config/mysql";
import { UserInterface } from "../../interfaces/user";
import { GeneralResponse } from "../../interfaces/response";

export class AuthModel {
  static async login({
    email,
    password: pwdPrompt,
  }: {
    email: string;
    password: string;
  }): Promise<GeneralResponse> {
    try {
      const { password } = await pool.query<UserInterface>(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );

      const isValidPassword = await compare(pwdPrompt, password);

      if (!isValidPassword) {
        return {
          status: 400,
          message: "Invalid credenctials",
        };
      }
      return {
        status: 200,
        message: "Login successful",
      };
    } catch (error) {
      return {
        status: 400,
        message: "Invalid credenctials catch",
      };
    }
  }
  static async register({
    name,
    email,
    surname,
    lastname,
    password,
    roll,
  }: UserInterface): Promise<GeneralResponse> {
    try {
      await pool.query(
        "INSERT INTO user (name, surname, lastname, email, password, roll) VALUES (?,?,?,?,?,?)",
        [name, surname, lastname, email, password, roll]
      );

      return {
        status: 201,
        message: "User created",
      };
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        return {
          status: 400,
          message: "User already exists",
        };
      }

      throw new Error("Error registering user");
    }
  }
}
