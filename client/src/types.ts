export interface SignupRequest {
  email: string;
  username: string;
  password: string;
}

export type LoginRequest = Omit<SignupRequest, "email">;

export interface LoginResponse {
  id: string;
  username: string;
  token: string;
}

export interface CurrentUser {
  id: string;
  username: string;
  token: string;
}

export interface UserState {
  currentUser?: CurrentUser;
  currentUserLoaded: boolean;
}

export interface Chat {
  user: { id: string; username: string };
  messages: {
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
  }[];
}

export interface ChatState {
  chats: Chat[];
  activeChatUserId?: string;
  menuOpen: boolean;
}
