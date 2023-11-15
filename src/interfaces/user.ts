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
