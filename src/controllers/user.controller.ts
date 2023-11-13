import { Request, Response } from "express";
import { UserRepository } from "../interfaces/user";

export class UserController {
  private userModel: UserRepository;

  constructor(userModel: UserRepository) {
    this.userModel = userModel;
  }

  createUser = async (req: Request, res: Response) => {
    const { email, name, surname, lastname, password } = req.body;

    const user = {
      email: email as string,
      name: name as string,
      surname: surname as string,
      lastname: lastname as string,
      password: password as string,
    };

    const creatingUser = await this.userModel.createUser(user);
    if (creatingUser.status === 400) {
      return res.status(400).json({ message: creatingUser.message });
    }

    return res.status(201).json({ message: creatingUser.message });
  };
}
