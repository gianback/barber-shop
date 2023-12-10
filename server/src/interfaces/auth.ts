import { AuthResponse, GeneralResponse } from "./response";
import { UserInterface } from "./user";

export type loginProps = {
  email: string;
  password: string;
};

export type LoginResponse = Partial<UserInterface & AuthResponse>;

export interface AuthRepository {
  login({ email, password }: loginProps): Promise<LoginResponse>;
  register(user: UserInterface): Promise<GeneralResponse>;
  generateToken({ id, roll }: { id: string; roll: string }): string;
  comparePwd(pwdPrompt: string, password: string): Promise<boolean>;
  verifyRoll(): GeneralResponse;
}
