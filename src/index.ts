import express from "express";
import { UserRoute } from "./routes/users";
import { UserModelMysql } from "./models/user/user.model.mysql";
import { AppointmentRoute } from "./routes/appointments";
import { AppointmentModelMysql } from "./models/appointment/appointment.model.mysql";

const app = express();
app.use(express.json());

app.use("/api/v1/", UserRoute(UserModelMysql));
app.use("/api/v1/", AppointmentRoute(AppointmentModelMysql));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
