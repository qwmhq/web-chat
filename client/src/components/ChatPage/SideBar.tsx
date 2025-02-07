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
import { User } from "../../types";
import userService from "../../services/userService";

const SideBar = () => {
  const [userState, userStateDispatch] = useContext(AccountContext);
  const [chatState, chatStateDispatch] = useContext(ChatContext);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchField, _resetSearchField] = useField("text");
  const debouncedSearchQuery = useDebounce(searchField.value, 700);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      userService
        .search(debouncedSearchQuery)
        .then((results) => setSearchResults(results));
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

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

  const setActiveChat = (userId: string) => {
    chatStateDispatch({
      type: ChatStateActions.SetActiveChat,
      payload: userId,
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
            className={`size-8 rounded-full ${chatState.menuOpen ? "bg-blue-50" : ""} transition-colors`}
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
              {...searchField}
              className="w-[90%] text-sm rounded-xl"
              placeholder="Search username"
            />
          </div>
          <div className="mt-4">
            {searchResults.map((x) => (
              <button
                key={x.id}
                // onClick={() => setActiveChat(c.user.id)}
                className={`w-full text-left px-4 py-2 border-b border-gray-200 ${chatState.activeChatUserId === x.id ? "bg-blue-100" : "hover:bg-blue-50"}`}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="size-8 flex-grow-0 flex-shrink-0 rounded-full border inline-flex items-center justify-center">
                    <UserIcon className="size-6 text-gray-500" />
                  </div>
                  <div className="max-w-[70%]">
                    <div className="text-lg font-medium text-blue-800">
                      {x.username}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* chat list */}
        <div className="overflow-y-scroll">
          {chatState.chats.map((c) => {
            const lastMessage = c.messages[c.messages.length - 1];
            return (
              <button
                key={c.user.id}
                onClick={() => setActiveChat(c.user.id)}
                className={`w-full text-left px-4 py-2 border-b border-gray-200 ${chatState.activeChatUserId === c.user.id ? "bg-blue-100" : "hover:bg-blue-50"}`}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="size-8 flex-grow-0 flex-shrink-0 rounded-full border inline-flex items-center justify-center">
                    <UserIcon className="size-6 text-gray-500" />
                  </div>
                  <div className="max-w-[70%]">
                    <div className="text-lg font-medium text-blue-800">
                      {c.user.username}
                    </div>
                    <div className="text-xs text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {lastMessage.senderId === userState.currentUser?.id && (
                        <span className="font-semibold">You: </span>
                      )}
                      {lastMessage.text}
                    </div>
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
