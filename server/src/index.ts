import express from "express";
import fileupload from "express-fileupload";
import AppRoute from "./routes";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(fileupload());
app.use(cookieParser());
app.use("v1/api/", AppRoute);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
