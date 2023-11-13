import { Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { UserRepository } from "../../interfaces/user";

export const UserRoute = (userModel: UserRepository) => {
  const userRoute = Router();

  const userController = new UserController(userModel);

  userRoute.post("/", userController.createUser);

  return userRoute;
};
