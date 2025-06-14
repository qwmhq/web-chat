import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LogOut, Menu, Moon, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { ChatContext, ChatStateActions } from "@/reducers/chatReducer";
import { AccountContext, UserStateActions } from "@/reducers/userReducer";
import { Chat } from "@/types";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

type Props = {
  openChatFn: () => void;
  openSearchFn: () => void;
  className?: string;
};

const ChatListColumn = ({ openChatFn, openSearchFn, className }: Props) => {
  const { theme, setTheme } = useTheme();
  const switchTheme = (checked: boolean) => {
    checked ? setTheme("dark") : setTheme("light");
  };
  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  const navigate = useNavigate();
  const [userState, userStateDispatch] = useContext(AccountContext);
  const [chatState, chatStateDispatch] = useContext(ChatContext);

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
  const chats = Object.values(chatState.chats);

  return (
    <div className={cn("", className)}>
      <header className="px-4 py-2 flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer outline-none">
              <Menu></Menu>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-3xs">
            <DropdownMenuLabel className="flex items-center gap-3">
              <Avatar className="size-5">
                <AvatarFallback>{userState.currentUser?.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{userState.currentUser?.username}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openSearchFn}>
              <div className="flex items-center gap-3">
                <Pencil className="size-5" />
                <span>New Chat</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onSelect={(e) => e.preventDefault()}
              onClick={toggleTheme}
            >
              <div className="flex items-center gap-3">
                <Moon className="size-5" />
                <span>Night Mode</span>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={switchTheme}
              />
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logOut}>
              <div className="flex items-center gap-3">
                <LogOut className="size-5" />
                <span>Log Out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h2 className="text-2xl font-semibold">Chats</h2>
      </header>
      <Separator className="" />
      <div className="grow-1 flex flex-col">
        {chats.length > 0 ?
          <div className="overflow-y-auto">
            {chats.map(chat => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <div key={chat.user.id}>
                  <button
                    className="w-full py-1 px-2 cursor-pointer flex items-center hover:bg-accent"
                    onClick={() => {
                      setActiveChat(chat);
                      openChatFn();
                    }}
                  >
                    <div className="grow-1 flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback>{chat.user.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="grid grid-rows-2">
                        <h3 className="text-lg text-left font-medium">{chat.user.username}</h3>
                        {lastMessage && (
                          <div className="text-sm text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {lastMessage.senderId === userState.currentUser?.id && (
                              <span className="font-semibold">You:{" "}</span>
                            )}
                            {lastMessage.text}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                  <Separator></Separator>
                </div>
              )
            })}
          </div> :
          <div>
            {/* "no chats" visual*/}
          </div>
        }
      </div>
    </div>
  );
};

export default ChatListColumn;
