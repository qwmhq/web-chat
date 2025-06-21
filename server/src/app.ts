import express from "express";
import cors from "cors";
import "express-async-errors";
import pingRouter from "./routes/ping";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import { authenticate } from "./middleware/authMiddleware";

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(authenticate);

app.use("/api/ping", pingRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

app.get("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile("index.html", { root: "dist" });
  } else if (req.accepts("json")) {
    res.status(404).json({ error: "Not Found" });
  } else {
    res.status(404).send("Not Found");
  }
});

export default app;
