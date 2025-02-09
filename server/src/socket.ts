import { Server } from "socket.io";
import jwt from "./utils/jwt";
import chatService from "./services/chat.service";
import logger from "./utils/logger";

const io = new Server({
  cors: { origin: "*" },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const tokenPayload = jwt.verify(token);
    socket.user = { id: tokenPayload.id, username: tokenPayload.username };
    next();
  } catch {
    const err = new Error("unauthorized");
    next(err);
  }
});

io.on("connect", (socket) => {
  const user = socket.user!;
  socket.emit("ping");

  socket.join(user.id);

  socket.on("dm", async (payload) => {
    try {
      const message = await chatService.sendDm(
        user.id,
        payload.receiverId,
        payload.message,
      );
      socket.to(payload.receiverId).emit("dm", user, message);
    } catch (error) {
      logger.error(error);
    }
  });
});

export default io;
