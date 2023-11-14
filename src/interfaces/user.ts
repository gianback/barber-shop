import { GeneralResponse } from "./response";

export interface UserInterface {
  id?: number;
  name: string;
  surname: string;
  lastname: string;
  email: string;
  password: string;
  roll?: UserRoll;
}
export enum UserRoll {
  ADMIN = "admin",
  USER = "user",
}

export interface UserRepository {
  createUser(user: UserInterface): Promise<GeneralResponse>;
  getUser(id: string): Promise<UserInterface>;
}
