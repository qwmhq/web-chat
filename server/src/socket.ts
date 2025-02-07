import { Server } from "socket.io";

const io = new Server({
  cors: { origin: "*" },
});

io.on("connect", (socket) => {
  console.log("a user connected");
  socket.emit("ping");
});

export default io;
