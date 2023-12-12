import express from "express";
import AppRoute from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { URL_FRONT } from "./config/dotenv";
const app = express();
app.use(
  cors({
    origin: URL_FRONT,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/v1/api/", AppRoute);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
