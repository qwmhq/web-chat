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
import { Separator } from "@/components/ui/separator";
import ChatColumn from "./ChatColumn";
import { useIsMobile } from "@/hooks/use-mobile";

const Page = () => {
  const isMobile = useIsMobile();
  const [_userState, _userStateDispatch] = useContext(AccountContext);
  const [_chatState, chatStateDispatch] = useContext(ChatContext);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-svh w-full flex flex-col md:grid md:grid-cols-[2fr_auto_3fr] lg:grid-cols-[2fr_auto_5fr]">
      <ChatListColumn
        openChatFn={() => setMobileChatOpen(true)}
        searchOpen={searchOpen}
        openSearchFn={() => setSearchOpen(true)}
        closeSearchFn={() => setSearchOpen(false)}
      />
      <Separator orientation="vertical" className="hidden md:block" />
      <ChatColumn className="hidden md:block" />
      <Sheet
        open={isMobile && mobileChatOpen}
        onOpenChange={setMobileChatOpen}
      >
        <SheetTitle className="sr-only">Chat Page</SheetTitle>
        <SheetContent
          side="right"
          className="border-0 p-0 w-svw max-h-svh flex flex-col justify-start gap-0"
          onCloseAutoFocus={() => chatStateDispatch({ type: ChatStateActions.UnsetActiveChat })}
          aria-describedby={undefined}
        >
          <ChatOverlay closeFn={() => setMobileChatOpen(false)} />
        </SheetContent>
      </Sheet>
      <Sheet
        open={isMobile && searchOpen}
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
            openChatFn={() => setMobileChatOpen(true)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};


export default Page;
