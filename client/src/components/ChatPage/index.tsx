import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../reducers/userReducer";
import { io, Socket } from "socket.io-client";
import SideBar from "./SideBar";
import Chat from "./Chat";
import { ChatContext, ChatStateActions } from "../../reducers/chatReducer";
import { CurrentUser } from "../../types";
import { SOCKET_URL } from "../../constants";

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

    setSocket(socket);

    return () => {
      socket.removeAllListeners();
    };
  }, [userState.currentUser]);

  useEffect(() => {
    const chats = [
      {
        user: { id: "1", username: "Alice" },
        messages: [
          {
            senderId: "1",
            receiverId: userState.currentUser!.id,
            text: "Hi Jane, how's your day going?",
            timestamp: "2024-12-27T10:00:00Z",
          },
          {
            senderId: userState.currentUser!.id,
            receiverId: "1",
            text: "Hey Alice, it's going well. How about you?",
            timestamp: "2024-12-27T10:01:00Z",
          },
          {
            senderId: "1",
            receiverId: userState.currentUser!.id,
            text: "Pretty good, thanks!",
            timestamp: "2024-12-27T10:02:00Z",
          },
          {
            senderId: userState.currentUser!.id,
            receiverId: "1",
            text: "You're welcome!",
            timestamp: "2024-12-27T10:03:00Z",
          },
        ],
      },
      {
        user: { id: "2", username: "Bob" },
        messages: [
          {
            senderId: "2",
            receiverId: userState.currentUser!.id,
            text: "Jane, are you coming to the meeting?",
            timestamp: "2024-12-26T14:15:00Z",
          },
          {
            senderId: userState.currentUser!.id,
            receiverId: "2",
            text: "Yes, I'll be there in 10 minutes.",
            timestamp: "2024-12-26T14:20:00Z",
          },
          {
            senderId: "2",
            receiverId: userState.currentUser!.id,
            text: "Great, see you then!",
            timestamp: "2024-12-26T14:22:00Z",
          },
        ],
      },
      {
        user: { id: "3", username: "Charlie" },
        messages: [
          {
            senderId: "3",
            receiverId: userState.currentUser!.id,
            text: "Hi Jane, do you have the notes from yesterday?",
            timestamp: "2024-12-25T08:30:00Z",
          },
          {
            senderId: userState.currentUser!.id,
            receiverId: "3",
            text: "Yes, I'll send them to you shortly.",
            timestamp: "2024-12-25T08:45:00Z",
          },
          {
            senderId: "3",
            receiverId: userState.currentUser!.id,
            text: "Thanks, Jane!",
            timestamp: "2024-12-25T08:50:00Z",
          },
        ],
      },
    ];

    chatStateDispatch({ type: ChatStateActions.Initialize, payload: chats });
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
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
