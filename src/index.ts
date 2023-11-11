import express from "express";
import AppRouter from "./routes";

const app = express();
app.use(express.json());

app.use("/api/v1/", AppRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
