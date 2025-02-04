import { createContext } from "react";
import { Chat, ChatState } from "../types";

export enum ChatStateActions {
  Initialize,
  SetActiveChat,
  UnsetActiveChat,
  ToggleMenu,
}

interface InitializeAction {
  type: ChatStateActions.Initialize;
  payload: Chat[];
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

export type ChatAction =
  | InitializeAction
  | SetActiveChatAction
  | UnsetActiveChatAction
  | ToggleMenuAction;

const reducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case ChatStateActions.Initialize:
      return { ...state, chats: action.payload };
    case ChatStateActions.SetActiveChat:
      return { ...state, activeChatUserId: action.payload };
    case ChatStateActions.UnsetActiveChat:
      return { ...state, activeChatUserId: undefined };
    case ChatStateActions.ToggleMenu:
      return { ...state, menuOpen: !state.menuOpen };
    default:
      return state;
  }
};

export const ChatContext = createContext<
  [ChatState, React.Dispatch<ChatAction>]
>([{ chats: [], menuOpen: false }, () => {}]);

export default reducer;
