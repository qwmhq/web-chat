import { createContext } from "react";
import { Chat, ChatState, Message, User } from "../types";

export enum ChatStateActions {
  Initialize,
  SetActiveChat,
  UnsetActiveChat,
  UpdateActiveChat,
  ToggleMenu,
  NewChat,
  IncomingMessage,
}

interface InitializeAction {
  type: ChatStateActions.Initialize;
  payload: { [id: string]: Chat };
}

interface SetActiveChatAction {
  type: ChatStateActions.SetActiveChat;
  payload: string;
}

interface UnsetActiveChatAction {
  type: ChatStateActions.UnsetActiveChat;
}

interface ToggleMenuAction {
  type: ChatStateActions.ToggleMenu;
}

interface UpdateActiveChatAction {
  type: ChatStateActions.UpdateActiveChat;
  payload: Chat;
}

interface NewChatAction {
  type: ChatStateActions.NewChat;
  payload: User;
}

interface IncomingMessageAction {
  type: ChatStateActions.IncomingMessage;
  payload: { user: User; message: Message };
}

export type ChatAction =
  | InitializeAction
  | SetActiveChatAction
  | UnsetActiveChatAction
  | UpdateActiveChatAction
  | ToggleMenuAction
  | NewChatAction
  | IncomingMessageAction;

const reducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case ChatStateActions.Initialize:
      return { ...state, chats: action.payload };
    case ChatStateActions.SetActiveChat:
      return { ...state, activeChat: action.payload };
    case ChatStateActions.UnsetActiveChat:
      return { ...state, activeChat: undefined };
    case ChatStateActions.ToggleMenu:
      return { ...state, menuOpen: !state.menuOpen };
    case ChatStateActions.UpdateActiveChat: {
      if (!state.activeChat) return state;
      const updatedChats = {
        ...state.chats,
        [state.activeChat]: { ...action.payload },
      };
      return {
        ...state,
        chats: updatedChats,
      };
    }
    case ChatStateActions.NewChat: {
      const newChat = {
        user: action.payload,
        messages: [],
        draft: "",
      };
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.id]: newChat,
        },
        activeChat: action.payload.id,
      };
    }
    case ChatStateActions.IncomingMessage: {
      const { user, message } = action.payload;
      const chat = state.chats[user.id];
      const updatedChat = chat
        ? {
            ...chat,
            messages: chat.messages.concat(message),
          }
        : {
            user,
            messages: [message],
            draft: "",
          };
      return {
        ...state,
        chats: {
          ...state.chats,
          [user.id]: updatedChat,
        },
      };
    }
    default:
      return state;
  }
};

export const ChatContext = createContext<
  [ChatState, React.Dispatch<ChatAction>]
>([{ chats: {}, menuOpen: false }, () => {}]);

export default reducer;
