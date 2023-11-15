import { Router } from "express";
import { AuthRepository } from "../../services/auth.service";
import { AuthController } from "../../controllers/auth.controller";

export const AuthRoute = (authRepository: AuthRepository) => {
  const authRoute = Router();

  const authController = new AuthController(authRepository);

  authRoute.post("/login", authController.login);
  authRoute.post("/register", authController.register);

  return authRoute;
};
