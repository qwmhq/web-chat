import express from "express";
import cors from "cors";
import "express-async-errors";
import pingRouter from "./routes/ping";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import { authenticate } from "./middleware/authMiddleware";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(authenticate);

app.use("/api/ping", pingRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

export default app;
