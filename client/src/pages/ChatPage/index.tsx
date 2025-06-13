import { useContext, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountContext } from "@/reducers/userReducer";
import { ChatContext, ChatStateActions } from "@/reducers/chatReducer";
import ChatOverlay from "./ChatOverlay";
import ChatListColumn from "./ChatListColumn";
import ChatSearch from "./ChatSearch";

const Page = () => {
  const [_userState, _userStateDispatch] = useContext(AccountContext);
  const [_chatState, chatStateDispatch] = useContext(ChatContext);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-svh w-full flex flex-col">
      <ChatListColumn
        openChatFn={() => setChatOpen(true)}
        openSearchFn={() => setSearchOpen(true)}
      />
      <Sheet
        open={chatOpen}
        onOpenChange={setChatOpen}
      >
        <SheetTitle className="sr-only">Chat Page</SheetTitle>
        <SheetContent
          side="right"
          className="border-0 p-0 w-svw max-h-svh flex flex-col justify-start gap-0"
          onCloseAutoFocus={() => chatStateDispatch({ type: ChatStateActions.UnsetActiveChat })}
          aria-describedby={undefined}
        >
          <ChatOverlay closeFn={() => setChatOpen(false)} />
        </SheetContent>
      </Sheet>
      <Sheet
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <SheetTitle className="sr-only">Start a new chat</SheetTitle>
        <SheetContent
          side="left"
          className="border-0 p-0 w-full max-h-svh flex flex-col justify-start gap-0"
          onCloseAutoFocus={() => chatStateDispatch({ type: ChatStateActions.UnsetActiveChat })}
          aria-describedby={undefined}
        >
          <ChatSearch
            closeFn={() => setSearchOpen(false)}
            openChatFn={() => setChatOpen(true)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};


export default Page;
