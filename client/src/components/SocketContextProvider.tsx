import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext, ChatStateActions } from "../reducers/chatReducer";
import { CurrentUser } from "@/types";
import { AccountContext } from "@/reducers/userReducer";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/constants";

export const SocketContext = createContext<Socket | null>(null);

export const SocketContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userState, _userStateDispatch] = useContext(AccountContext);
  const [_chatState, chatStateDispatch] = useContext(ChatContext);

  const connectSocket = (user: CurrentUser) => {
    return io(SOCKET_URL, {
      auth: {
        token: user.token,
      },
    });
  };

  const [socket, setSocket] = useState<Socket>(() =>
    connectSocket(userState.currentUser!),
  );

  useEffect(() => {
    const socket = connectSocket(userState.currentUser!);

    socket.io.on("error", (error) => {
      console.log("couldn't connect sockets");
      console.error("error:", error);
    });

    socket.on("ping", () => {
      console.log("server pinged!");
    });

    socket.on("dm", (user, message) => {
      chatStateDispatch({
        type: ChatStateActions.IncomingMessage,
        payload: { user, message },
      });
    });

    setSocket(socket);

    return () => {
      socket.removeAllListeners();
    };
  }, [userState.currentUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
