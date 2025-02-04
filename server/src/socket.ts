import { Server } from "socket.io";

const io = new Server({ cors: { origin: "*" } });

io.on("connect", (_socket) => {
  console.log("a user connected");
});

export default io;
