import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller";
import { validateUserRegister } from "../../middlewares/validate-user-register.middleware";
import { validateLogin } from "../../middlewares/validate-login.middleware";
import { validateRoll } from "../../middlewares/validate-roll.middleware";
import { AuthRepository } from "../../interfaces/auth";
import { validateToken } from "../../middlewares/validate-token.middleware";

export const AuthRoute = (authRepository: AuthRepository) => {
  const authRoute = Router();

  const authController = new AuthController(authRepository);

  authRoute.post("/login", validateLogin, authController.login);
  authRoute.post("/register", validateUserRegister, authController.register);
  authRoute.get("/verify-roll", validateRoll, authController.verifyRoll);
  authRoute.get("/verify-token", validateToken, authController.verifyToken);

  return authRoute;
};
