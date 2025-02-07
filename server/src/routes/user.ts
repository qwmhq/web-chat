import express from "express";
import userService from "../services/user.service";
// import { validateData } from "../middleware/validationMiddleware";
// import { loginSchema, NewUser, newUserSchema } from "../dtos/auth.dtos";

const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.username;
  const users = await userService.searchUsers({ username: query as string });
  res.status(200).json(users);
});

export default router;
