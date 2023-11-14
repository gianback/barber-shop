import { Router } from "express";
import { UserModelMysql } from "../models/user/user.model.mysql";
import { UserRoute } from "./users";
import { AppointmentRoute } from "./appointments";
import { AppointmentModelMysql } from "../models/appointment/appointment.model.mysql";
import { ServiceRoute } from "./services";
import { ServiceModelMysql } from "../models/service/service.model.mysql";
import { PostRoute } from "./posts";
import { PostModelMysql } from "../models/post/post.model.mysql";

const router = Router();

router.use("/users", UserRoute(UserModelMysql));
router.use("/appointments", AppointmentRoute(AppointmentModelMysql));
router.use("/services", ServiceRoute(ServiceModelMysql));
router.use("/posts", PostRoute(PostModelMysql));

export default router;
