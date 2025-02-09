import { createContext, useContext, useEffect, useState } from "react";
import { AccountContext } from "../../reducers/userReducer";
import { io, Socket } from "socket.io-client";
import SideBar from "./SideBar";
import { ChatContext, ChatStateActions } from "../../reducers/chatReducer";
import Chat from "./Chat";
import { ChatState, CurrentUser } from "../../types";
import { SOCKET_URL } from "../../constants";
import chatService from "../../services/chatService";

export const SocketContext = createContext<Socket | null>(null);

const ChatPage = () => {
  const [userState, _userStateDispatch] = useContext(AccountContext);
  const [chatState, chatStateDispatch] = useContext(ChatContext);

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

  useEffect(() => {
    const fetchChats = async () => {
      const c = await chatService.getChats();
      const chats: ChatState["chats"] = {};
      c.forEach((chat) => {
        const user =
          chat.participants[0].id === userState.currentUser?.id
            ? chat.participants[1]
            : chat.participants[0];
        chats[user.id] = {
          user,
          messages: chat.messages,
          draft: "",
        };
      });
      chatStateDispatch({ type: ChatStateActions.Initialize, payload: chats });
    };

    fetchChats();
  }, [chatStateDispatch, userState.currentUser]);

  useEffect(() => {
    const escKeyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (chatState.menuOpen) {
          chatStateDispatch({ type: ChatStateActions.ToggleMenu });
        } else {
          chatStateDispatch({ type: ChatStateActions.UnsetActiveChat });
        }
      }
    };
    document.addEventListener("keydown", escKeyHandler);

    return () => {
      document.removeEventListener("keydown", escKeyHandler);
    };
  }, [chatStateDispatch, chatState.menuOpen]);

  return (
    <div className="h-lvh">
      <div className="h-full flex">
        <SocketContext.Provider value={socket}>
          <SideBar />
          <Chat />
        </SocketContext.Provider>
      </div>
    </div>
  );
};

export default ChatPage;
