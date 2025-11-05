export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  user: User;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'dm';
  recipient?: User; // for DMs
  messages: Message[];
}

export interface Server {
  id: string;
  name: string;
  iconUrl: string;
  channels: Channel[];
  users: User[];
}