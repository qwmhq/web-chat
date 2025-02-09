export interface SignupRequest {
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

export interface User {
  id: string;
  username: string;
}

export interface Message {
  senderId: string;
  text: string;
  timestamp: string;
  delivered: boolean;
  read: boolean;
}

export interface Chat {
  user: User;
  messages: Message[];
  draft: string;
}

export interface ChatState {
  chats: { [id: string]: Chat };
  activeChat?: string;
  menuOpen: boolean;
}

export interface GetChatsResponse {
  id: string;
  participants: [User, User];
  messages: Message[];
}
