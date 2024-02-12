import { compare, hash } from "bcrypt";
import { pool } from "../config/mysql";
import { UserInterface } from "../interfaces/user";
import { AuthResponse, GeneralResponse } from "../interfaces/response";
import { UserRepository } from "../models/user/user.model.mysql";
import { JWT_SECRET } from "../config/dotenv";
import { sign } from "jsonwebtoken";
import { LoginResponse, loginProps } from "../interfaces/auth";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  login = async ({
    email,
    password: pwdPrompt,
  }: loginProps): Promise<LoginResponse> => {
    try {
      const existUser = await this.userRepository.findUserByEmail(email);

      if (!existUser) {
        return {
          status: 400,
          message: "Invalid credenctials",
        };
      }

      const user = await this.userRepository.findUserByEmail(email);
      const { password, id, roll, name, surname, lastname } = user;

      const isValidPassword = await this.comparePwd(pwdPrompt, password);

      if (!isValidPassword) {
        return {
          status: 400,
          message: "Invalid credenctials",
        };
      }
      const token = this.generateToken({
        id: id as string,
        roll: roll as string,
      });

      return {
        status: 200,
        message: "Login successfull",
        name,
        surname,
        lastname,
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
  generateToken = ({ id, roll }: { id: string; roll: string }): string => {
    const token = sign({ id, roll }, JWT_SECRET, { expiresIn: "2h" });

    return token;
  };
  comparePwd = async (pwd: string, password: string): Promise<boolean> => {
    return await compare(pwd, password);
  };
  verifyRoll = (): GeneralResponse => ({
    status: 200,
    message: "Valid roll",
  });
  verifyToken = (): GeneralResponse => ({
    status: 200,
    message: "Valid token",
  });
}
