import { Request, Response } from "express";
import { UserRoll } from "../interfaces/user";
import { AuthRepository } from "../interfaces/auth";
export class AuthController {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { status, message, token } = await this.authRepository.login({
      email,
      password,
    });

    return res.status(status).json({ message, token });
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

  verifyRoll = (req: Request, res: Response) => {
    const response = this.authRepository.verifyRoll();

    return res.status(response.status).json(response);
  };
}
