import { SocketContext } from "@/components/SocketContextProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChatContext, ChatStateActions } from "@/reducers/chatReducer";
import { AccountContext } from "@/reducers/userReducer";
import { ArrowLeft, EllipsisVertical, SendHorizontal } from "lucide-react";
import { useContext } from "react";

const ChatOverlay = ({ closeFn }: { closeFn: () => void }) => {
  const [userState, _userStateDispatch] = useContext(AccountContext);
  const [chatState, chatStateDispatch] = useContext(ChatContext);
  const socket = useContext(SocketContext);

  if (!chatState.activeChat) return null;

  const activeChat = chatState.chats[chatState.activeChat];

  const updateMessageDraft = (event: React.ChangeEvent<HTMLInputElement>) => {
    chatStateDispatch({
      type: ChatStateActions.UpdateActiveChat,
      payload: { ...activeChat, draft: event.target.value },
    });
  };

  const sendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (activeChat.draft.trim() === "") {
      return;
    }

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
    <>
      <header className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button className="cursor-pointer" onClick={closeFn}>
            <ArrowLeft />
          </button>
          <Avatar className="ml-3 size-6">
            <AvatarFallback>{activeChat.user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="ml-2 text-lg font-semibold">{activeChat.user.username}</h2>
        </div>
        <button>
          <EllipsisVertical />
        </button>
      </header>
      <Separator orientation="horizontal" />
      <div className="grow-1 pb-2 flex flex-col justify-end bg-accent">
        <div className="px-2 overflow-y-auto flex flex-col gap-1.5">
          {activeChat.messages
            .map((m, idx) => (
              <div
                key={idx}
                className={`w-fit max-w-[90%] px-4 py-2 rounded-2xl ${m.senderId === userState.currentUser?.id ? "mr-0 ml-auto bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}
              >
                {m.text}
              </div>
            ))
          }
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="px-3 py-1.5">
        <div className="flex justify-between gap-2">
          <Input
            type="text"
            value={activeChat.draft}
            onChange={updateMessageDraft}
            id="messageText"
            placeholder="Message"
            className="w-full rounded-lg"
          />
          <button
            onClick={sendMessage}
            className="cursor-pointer"
          >
            <SendHorizontal className="text-primary size-7" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatOverlay;
