import { Router } from "express";
import { AppointmentRoute } from "./appointments";
import { AppointmentModelMysql } from "../models/appointment/appointment.model.mysql";
import { ServiceRoute } from "./services";
import { ServiceModelMysql } from "../models/service/service.model.mysql";
import { PostRoute } from "./posts";
import { PostModelMysql } from "../models/post/post.model.mysql";
import { AuthRoute } from "./auth";
import { AuthService } from "../services/auth.service";
import { UserModelMysql } from "../models/user/user.model.mysql";

const router = Router();

router.use("/appointments", AppointmentRoute(AppointmentModelMysql));
router.use("/services", ServiceRoute(ServiceModelMysql));
router.use("/posts", PostRoute(PostModelMysql));

const authService = new AuthService(UserModelMysql);

router.use("/auth", AuthRoute(authService));

export default router;
