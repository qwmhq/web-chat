import express from "express";
import cors from "cors";
import "express-async-errors";
import pingRouter from "./routes/ping";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/ping", pingRouter);
app.use("/api/auth", authRouter);

export default app;
