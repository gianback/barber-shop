import { Router } from "express";
import { AuthRepository } from "../../services/auth.service";
import { AuthController } from "../../controllers/auth.controller";
import { validateUserRegister } from "../../middlewares/validate-user-register.middleware";
import { validateLogin } from "../../middlewares/validate-login.middleware";

export const AuthRoute = (authRepository: AuthRepository) => {
  const authRoute = Router();

  const authController = new AuthController(authRepository);

  authRoute.post("/login", validateLogin, authController.login);
  authRoute.post("/register", validateUserRegister, authController.register);

  return authRoute;
};
