import bcrypt from "bcrypt";
import { pool } from "../../config/mysql";
import { GeneralResponse, UserInterface } from "../../interfaces/user";

export class UserModelMysql {
  static async createUser({
    email,
    lastname,
    name,
    password,
    surname,
  }: UserInterface): Promise<GeneralResponse> {
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      await pool.query<UserInterface>("INSERT INTO users SET ?", {
        name,
        surname,
        lastname,
        email,
        password: hashPassword,
        roll: "user",
      });

      return {
        status: 201,
        message: "User created",
      };
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        return {
          status: 400,
          message: `Email ${email} already exists`,
        };
      }

      throw new Error("Something went wrong createing the user with MYSQL");
    }
  }
  static async getUser(id: string): Promise<UserInterface> {
    try {
      const findUser = await pool.query<UserInterface>(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );

      return findUser;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
