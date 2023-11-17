import { Request, Response } from "express";
import { AuthRepository } from "../services/auth.service";
import { UserRoll } from "../interfaces/user";

export class AuthController {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { status, message } = await this.authRepository.login({
      email,
      password,
    });

    return res.status(status).json({ message });
  };
  register = async (req: Request, res: Response) => {
    const { email, lastname, name, password, surname } = req.body;

    const { message, status } = await this.authRepository.register({
      email,
      lastname,
      name,
      password,
      surname,
      roll: UserRoll.USER,
    });

    return res.status(status).json({ message });
  };
}
