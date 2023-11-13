import express from "express";

import AppRoute from "./routes";
const app = express();
app.use(express.json());

app.use("/api/v1/", AppRoute);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
