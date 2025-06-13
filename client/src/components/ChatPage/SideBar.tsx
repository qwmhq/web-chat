import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { ChatContext, ChatStateActions } from "../../reducers/chatReducer";
import { AccountContext, UserStateActions } from "../../reducers/userReducer";
import { useDebounce, useField } from "../../hooks";
import { Chat, User } from "../../types";
import userService from "../../services/userService";

const SideBar = () => {
  const [userState, userStateDispatch] = useContext(AccountContext);
  const [chatState, chatStateDispatch] = useContext(ChatContext);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [userSearchField, _resetSearchField] = useField("text");
  const userSearchQuery = useDebounce(userSearchField.value, 700);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    if (userSearchQuery) {
      userService
        .search(userSearchQuery)
        .then((results) => setSearchResults(results));
    } else {
      setSearchResults([]);
    }
  }, [userSearchQuery]);

  const toggleMenu = () => {
    chatStateDispatch({ type: ChatStateActions.ToggleMenu });
  };

  const toggleUserSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const logOut = () => {
    userStateDispatch({ type: UserStateActions.Logout });
    navigate("/login");
  };

  const setActiveChat = (chat: Chat) => {
    chatStateDispatch({
      type: ChatStateActions.SetActiveChat,
      payload: chat.user.id,
    });
  };

  const initializeChat = (user: User) => {
    chatStateDispatch({
      type: ChatStateActions.NewChat,
      payload: user,
    });
  };

  return (
    <div className="w-2/5 max-w-80 flex flex-col border-r-2 border-r-gray-200">
      {/* sidebar header */}
      <div className="h-12 py-2 px-4 relative flex justify-between items-center border-b border-b-gray-200">
        <h2 className="text-2xl font-bold text-blue-800">Chats</h2>
        <div>
          <button
            onClick={toggleUserSearch}
            className={`size-8 rounded-full ${searchOpen ? "bg-blue-50" : ""} transition-colors`}
          >
            <PlusCircleIcon className="size-5 mx-auto text-blue-800" />
          </button>
          <button
            onClick={toggleMenu}
            className={`size-8 rounded-full ${chatState.menuOpen ? "bg-blue-50" : ""} transition-colors`}
          >
            <EllipsisVerticalIcon className="size-5 mx-auto text-blue-800" />
          </button>
        </div>
        <div
          className={`w-32 py-2 ${chatState.menuOpen ? "visible opacity-100" : "invisible opacity-0"} absolute top-11 right-5 z-10 bg-white border border-gray-300 shadow-sm rounded-sm transition-opacity`}
        >
          <button
            onClick={logOut}
            className="w-full px-4 py-2 font-semibold text-left hover:bg-blue-100"
          >
            Log out
          </button>
        </div>
      </div>
      {/* sidebar content */}
      <div className="relative flex-grow">
        {/* search pop out */}
        <div
          className={`absolute w-full h-full bg-white flex-grow overflow-y-scroll ${searchOpen ? "left-0" : "-left-[50vw]"} transition-[left] duration-500`}
        >
          <div className="py-2 pl-2 flex justify-start items-center">
            <button
              onClick={toggleUserSearch}
              className={`size-8 rounded-full ${chatState.menuOpen ? "bg-blue-50" : ""} transition-colors`}
            >
              <ArrowLeftIcon className="size-5 mx-auto text-blue-800" />
            </button>
            <h3 className="ml-4 text-xl font-semibold text-blue-800">
              New Chat
            </h3>
          </div>
          <div className="mt-4 w-full flex justify-center">
            <input
              {...userSearchField}
              className="w-[90%] text-sm rounded-xl"
              placeholder="Search username"
            />
          </div>
          <div className="mt-4">
            {searchResults.map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  if (!chatState.chats[u.id]) {
                    initializeChat(u);
                  } else {
                    setActiveChat({ user: u, messages: [], draft: "" });
                  }
                }}
                className={`w-full text-left px-4 py-2 border-b border-gray-200 ${chatState.activeChat === u.id ? "bg-blue-100" : "hover:bg-blue-50"}`}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="size-8 flex-grow-0 flex-shrink-0 rounded-full border inline-flex items-center justify-center">
                    <UserIcon className="size-6 text-gray-500" />
                  </div>
                  <div className="max-w-[70%]">
                    <div className="text-lg font-medium text-blue-800">
                      {u.username}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* chat list */}
        <div className="overflow-y-auto">
          {Object.values(chatState.chats).map((chat) => {
            const lastMessage = chat.messages[chat.messages.length - 1];
            return (
              <button
                key={chat.user.id}
                onClick={() => setActiveChat(chat!)}
                className={`w-full text-left px-4 py-2 border-b border-gray-200 ${chatState.activeChat === chat.user.id ? "bg-blue-100" : "hover:bg-blue-50"}`}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="size-8 flex-grow-0 flex-shrink-0 rounded-full border inline-flex items-center justify-center">
                    <UserIcon className="size-6 text-gray-500" />
                  </div>
                  <div className="max-w-[70%]">
                    <div className="text-lg font-medium text-blue-800">
                      {chat.user.username}
                    </div>
                    {lastMessage && (
                      <div className="text-xs text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {lastMessage.senderId === userState.currentUser?.id && (
                          <span className="font-semibold">You: </span>
                        )}
                        {lastMessage.text}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
