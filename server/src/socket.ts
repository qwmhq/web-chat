import { Server } from "socket.io";
import jwt from "./utils/jwt";

const io = new Server({
  cors: { origin: "*" },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const tokenPayload = jwt.verify(token);
    socket.user = { id: tokenPayload.id };
    next();
  } catch {
    const err = new Error("unauthorized");
    next(err);
  }
});

io.on("connect", (socket) => {
  console.log(`user ${socket.user?.id} connected`);
  socket.emit("ping");
});

io.on("dm", (message) => {
  console.log(message);
});

export default io;
