import { compare, hash } from "bcrypt";
import { pool } from "../config/mysql";
import { UserInterface } from "../interfaces/user";
import { AuthResponse, GeneralResponse } from "../interfaces/response";
import { generateToken } from "../lib/generate-token";

type loginProps = {
  email: string;
  password: string;
};

export interface AuthRepository {
  login({ email, password }: loginProps): Promise<AuthResponse>;
  register(user: UserInterface): Promise<GeneralResponse>;
}

export class AuthService {
  static async login({
    email,
    password: pwdPrompt,
  }: loginProps): Promise<AuthResponse> {
    try {
      const user = await pool.query<UserInterface[]>(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      if (!user[0]) {
        return {
          status: 400,
          message: "Invalid credenctials",
        };
      }
      const { password } = user[0];

      const isValidPassword = await compare(pwdPrompt, password);

      if (!isValidPassword) {
        return {
          status: 400,
          message: "Invalid credenctials",
        };
      }
      const token = generateToken(email);

      return {
        status: 200,
        message: "Login successfull",
        token,
      };
    } catch (error) {
      return {
        status: 400,
        message: "Invalid credenctials",
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
      if (error.code === "ER_DUP_ENTRY") {
        return {
          status: 400,
          message: "User already exists",
        };
      }
      console.log(error);
      throw new Error("Error registering user");
    }
  }
}
