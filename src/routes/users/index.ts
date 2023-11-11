import { Request, Response, Router } from "express";
import { pool } from "../../config/mysql";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await pool.query("SELECT * FROM user");
  res.json({ users });
});
router.post("/", async (req, res) => {
  const admin = {
    name: "admin",
    surname: "Gian admin",
    lastname: "Gian admin 2",
    email: "admin@gmail.com",
    password: "admin@@admin",
    roll: "admin",
  };

  const newUser = await pool.query("INSERT INTO user SET ?", admin);

  res.json({ newUser });
});
export default router;
