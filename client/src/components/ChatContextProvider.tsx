import { useReducer } from "react";
import chatReducer, { ChatContext } from "../reducers/chatReducer";

export const ChatContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, {
    chats: {},
    menuOpen: false,
  });
  return (
    <ChatContext.Provider value={[chatState, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
};
