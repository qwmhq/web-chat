import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EllipsisVerticalIcon, UserIcon } from "@heroicons/react/16/solid";
import { ChatContext, ChatStateActions } from "../../reducers/chatReducer";
import { AccountContext, UserStateActions } from "../../reducers/userReducer";

const SideBar = () => {
  const [userState, userStateDispatch] = useContext(AccountContext);
  const [chatState, chatStateDispatch] = useContext(ChatContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    chatStateDispatch({ type: ChatStateActions.ToggleMenu });
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
    <div className="w-2/5 flex flex-col border-r-2 border-r-gray-200">
      <div className="h-12 py-2 px-4 relative flex justify-between items-center border-b border-b-gray-200">
        <h2 className="text-2xl font-bold">Chats</h2>
        <button
          onClick={toggleMenu}
          className={`size-8 rounded-full ${chatState.menuOpen ? "bg-blue-50" : ""} transition-colors`}
        >
          <EllipsisVerticalIcon className="size-5 mx-auto" />
        </button>
        <div
          className={`w-32 py-2 ${chatState.menuOpen ? "visible opacity-100" : "invisible opacity-0"} absolute top-11 right-5 bg-gray-50 border border-gray-300 shadow-sm rounded-sm transition-opacity`}
        >
          <button
            onClick={logOut}
            className="w-full px-4 py-2 font-semibold text-left hover:bg-blue-100"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll">
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
                  <div className="text-lg font-medium">{c.user.username}</div>
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
  );
};

export default SideBar;
