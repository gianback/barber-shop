import { compare, hash } from "bcrypt";
import { pool } from "../config/mysql";
import { UserInterface } from "../interfaces/user";
import { AuthResponse, GeneralResponse } from "../interfaces/response";
import { UserRepository } from "../models/user/user.model.mysql";
import { JWT_SECRET } from "../config/dotenv";
import { sign } from "jsonwebtoken";

type loginProps = {
  email: string;
  password: string;
};

export interface AuthRepository {
  login({ email, password }: loginProps): Promise<AuthResponse>;
  register(user: UserInterface): Promise<GeneralResponse>;
}

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  login = async ({
    email,
    password: pwdPrompt,
  }: loginProps): Promise<AuthResponse> => {
    try {
      const existUser = await this.userRepository.findUserByEmail(email);

      if (!existUser) {
        return {
          status: 400,
          message: "Invalid credenctials",
        };
      }

      const user = await this.userRepository.findUserByEmail(email);
      const { password, id } = user;

      const isValidPassword = await this.comparePwd(pwdPrompt, password);

      if (!isValidPassword) {
        return {
          status: 400,
          message: "Invalid credenctials",
        };
      }
      const token = this.generateToken(id as string);

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
  };
  register = async ({
    name,
    email,
    surname,
    lastname,
    password,
    roll,
  }: UserInterface): Promise<GeneralResponse> => {
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
  };
  generateToken = (id: string): string => {
    const token = sign({ id }, JWT_SECRET, { expiresIn: "2h" });

    return token;
  };
  comparePwd = async (pwd: string, password: string): Promise<boolean> => {
    return await compare(pwd, password);
  };
}
