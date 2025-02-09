import { SyntheticEvent, useContext } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { AccountContext } from "../../reducers/userReducer";
import { ChatContext, ChatStateActions } from "../../reducers/chatReducer";
import { SocketContext } from ".";

const Chat = () => {
  const [userState, _userStateDispatch] = useContext(AccountContext);
  const [chatState, chatStateDispatch] = useContext(ChatContext);
  const socket = useContext(SocketContext);

  if (!chatState.activeChat) return <div className="w-full"></div>;

  const activeChat = chatState.chats[chatState.activeChat];

  const updateMessageDraft = (event: React.ChangeEvent<HTMLInputElement>) => {
    chatStateDispatch({
      type: ChatStateActions.UpdateActiveChat,
      payload: { ...activeChat, draft: event.target.value },
    });
  };

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();

    socket!.emit("dm", {
      receiverId: activeChat.user.id,
      message: activeChat.draft,
    });

    chatStateDispatch({
      type: ChatStateActions.UpdateActiveChat,
      payload: {
        ...activeChat,
        messages: activeChat.messages.concat({
          senderId: userState.currentUser!.id,
          text: activeChat.draft,
          timestamp: Date.now().toString(),
          delivered: false,
          read: false,
        }),
        draft: "",
      },
    });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="h-12 py-2 flex items-center justify-center border-b border-b-gray-200">
        <h2 className="text-2xl font-medium">{activeChat.user.username}</h2>
      </div>
      <div className="px-4 mr-1 flex-grow overflow-y-scroll">
        <div className="h-full py-4 gap-3 flex flex-col-reverse">
          {activeChat.messages
            .map((m, idx) => (
              <div
                key={idx}
                className={`w-fit max-w-[50%] px-4 py-2 text-gray-50 rounded-2xl ${m.senderId === userState.currentUser?.id ? "mr-0 ml-auto bg-blue-500" : "bg-blue-100 text-gray-900"}`}
              >
                {m.text}
              </div>
            ))
            .reverse()}
        </div>
      </div>
      <div className="px-4 py-2 border-t-2 border-t-gray-200 ">
        <form onSubmit={sendMessage} className="flex justify-between gap-2">
          <input
            type="text"
            value={activeChat.draft}
            onChange={updateMessageDraft}
            id="messageText"
            placeholder="Type a message"
            className="w-full rounded-full"
          />
          <button onClick={sendMessage}>
            <PaperAirplaneIcon className="text-blue-500 size-8" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
