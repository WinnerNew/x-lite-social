
export interface User {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  replies: number;
  image?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  participant: User;
  lastMessage?: string;
  unreadCount: number;
}

export type ViewState = 'HOME' | 'EXPLORE' | 'NOTIFICATIONS' | 'MESSAGES' | 'PROFILE' | 'CHAT' | 'AUTH' | 'SETTINGS' | 'CREATE_POST';
