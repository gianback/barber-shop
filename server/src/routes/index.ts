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
import { PaymentRoute } from "./payments";
import { WebhooksRoute } from "./webhook";
const router = Router();

router.use("/appointments", AppointmentRoute(AppointmentModelMysql));
router.use("/services", ServiceRoute(ServiceModelMysql));
router.use("/posts", PostRoute(PostModelMysql));
router.use("/payments", PaymentRoute);

const authService = new AuthService(UserModelMysql);

router.use("/auth", AuthRoute(authService));
router.use("/webhook", WebhooksRoute);

export default router;
