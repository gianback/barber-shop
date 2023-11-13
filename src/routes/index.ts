import { Router } from "express";
import { UserModelMysql } from "../models/user/user.model.mysql";
import { UserRoute } from "./users";
import { AppointmentRoute } from "./appointments";
import { AppointmentModelMysql } from "../models/appointment/appointment.model.mysql";

const router = Router();

router.use("/users", UserRoute(UserModelMysql));
router.use("/appointments", AppointmentRoute(AppointmentModelMysql));

export default router;
