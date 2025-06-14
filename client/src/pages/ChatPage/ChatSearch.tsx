import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDebounce, useField } from "@/hooks";
import { cn } from "@/lib/utils";
import { ChatContext, ChatStateActions } from "@/reducers/chatReducer";
import userService from "@/services/userService";
import { Chat, User } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";

type Props = {
  closeFn: () => void;
  openChatFn: () => void;
  className?: string;
};

const ChatSearch = ({ closeFn, openChatFn, className }: Props) => {
  const [chatState, chatStateDispatch] = useContext(ChatContext);
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

  const initializeChat = (user: User) => {
    chatStateDispatch({
      type: ChatStateActions.NewChat,
      payload: user,
    });
  };

  const setActiveChat = (chat: Chat) => {
    chatStateDispatch({
      type: ChatStateActions.SetActiveChat,
      payload: chat.user.id,
    });
  };

  return (
    <div className={cn("", className)}>
      <header className="px-4 py-2 flex items-center gap-4">
        <button className="cursor-pointer" onClick={closeFn}>
          <ArrowLeft />
        </button>
        <Input
          {...userSearchField}
          className=""
          placeholder="Search users"
        />
      </header>
      <Separator />
      <div className="grow-1 flex flex-col">
        <div className="overflow-y-auto">
          {searchResults.map(u => {
            return (
              <div key={u.id}>
                <button
                  className="w-full py-1 px-2 cursor-pointer flex items-center hover:bg-accent"
                  onClick={() => {
                    if (!chatState.chats[u.id]) {
                      initializeChat(u);
                    } else {
                      setActiveChat({ user: u, messages: [], draft: "" });
                    }
                    openChatFn();
                  }}
                >
                  <div className="grow-1 flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback>{u.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg text-left font-medium">{u.username}</h3>
                  </div>
                </button>
                <Separator></Separator>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatSearch;
