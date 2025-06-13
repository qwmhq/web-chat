import { useContext, useEffect, useReducer } from "react";
import chatReducer, { ChatContext, ChatStateActions } from "../reducers/chatReducer";
import chatService from "@/services/chatService";
import { ChatState } from "@/types";
import { AccountContext } from "@/reducers/userReducer";

export const ChatContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [chatState, chatStateDispatch] = useReducer(chatReducer, {
    chats: {},
    menuOpen: false,
  });
  const [userState, _userStateDispatch] = useContext(AccountContext);

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
  return (
    <ChatContext.Provider value={[chatState, chatStateDispatch]}>
      {children}
    </ChatContext.Provider>
  );
};
