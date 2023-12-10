import { pool } from "../../config/mysql";
import { hash } from "bcrypt";
import { GeneralResponse } from "../../interfaces/response";
import { UserInterface } from "../../interfaces/user";

export interface UserRepository {
  createUser(user: UserInterface): Promise<GeneralResponse>;
  verifyExistUser(email: string): Promise<boolean>;
  findUserByEmail(email: string): Promise<UserInterface>;
}

export class UserModelMysql {
  static async createUser({
    name,
    email,
    surname,
    lastname,
    password,
    roll,
  }: UserInterface): Promise<GeneralResponse> {
    const verifyUser = await this.verifyExistUser(email);

    if (!verifyUser) {
      return {
        status: 400,
        message: "User already exists",
      };
    }

    try {
      const hashedPwd = await hash(password, 10);

      await pool.query(
        "INSERT INTO user (name, surname, lastname, email, password, roll) VALUES (?,?,?,?,?,?)",
        [name, surname, lastname, email, hashedPwd, roll]
      );

      return {
        status: 201,
        message: "User created",
      };
    } catch (error: any) {
      throw new Error("Error registering user");
    }
  }
  static async verifyExistUser(email: string): Promise<boolean> {
    try {
      const isUserExist = await pool.query<boolean[]>(
        "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?)",
        [email]
      );
      console.log({ isUserExist: isUserExist[0] });
      return isUserExist[0];
    } catch (error) {
      throw new Error("Error verifying user");
    }
  }
  static async findUserByEmail(email: string): Promise<UserInterface> {
    try {
      const user = await pool.query<UserInterface[]>(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      return user[0];
    } catch (error) {
      throw new Error("Error finding user");
    }
  }
}
