import express from "express";
import userService from "../services/user.service";
import { validateData } from "../middleware/validationMiddleware";
import { loginSchema, NewUser, newUserSchema } from "../dtos/auth.dtos";

const router = express.Router();

router.post("/signup", validateData(newUserSchema), async (req, res, next) => {
  const newUser = req.body as NewUser;
  try {
    const createdUser = await userService.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("E11000 duplicate key error")
    ) {
      res.status(409).json({ error: "email or username is taken" });
      return;
    } else {
      next(error);
    }
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  const obj = req.body;
  const loginRes = await userService.loginUser(obj.username, obj.password);

  if (!loginRes) {
    res.status(401).json({ error: "invalid credentials" });
    return;
  }

  res.status(200).send(loginRes);
});

export default router;
