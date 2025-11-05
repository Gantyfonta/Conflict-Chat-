import { User, Server } from '../types';

export const MOCK_USER: User = {
  id: 'user-0',
  name: 'You',
  avatarUrl: 'https://picsum.photos/seed/user-0/48/48',
  status: 'online',
};

export const MOCK_USERS: User[] = [
  MOCK_USER,
  { id: 'user-1', name: 'Alex', avatarUrl: 'https://picsum.photos/seed/user-1/48/48', status: 'online' },
  { id: 'user-2', name: 'Chris', avatarUrl: 'https://picsum.photos/seed/user-2/48/48', status: 'online' },
  { id: 'user-3', name: 'Sam', avatarUrl: 'https://picsum.photos/seed/user-3/48/48', status: 'idle' },
  { id: 'user-4', name: 'Morgan', avatarUrl: 'https://picsum.photos/seed/user-4/48/48', status: 'dnd' },
  { id: 'user-5', name: 'Jordan', avatarUrl: 'https://picsum.photos/seed/user-5/48/48', status: 'online' },
];

export const MOCK_SERVERS: Server[] = [
  {
    id: 'server-1',
    name: 'Gemini Fans',
    iconUrl: 'https://picsum.photos/seed/server-1/64/64',
    users: MOCK_USERS,
    channels: [
      {
        id: 'channel-1-1',
        name: 'general',
        type: 'text',
        messages: [],
      },
      {
        id: 'channel-1-2',
        name: 'creative-writing',
        type: 'text',
        messages: [],
      },
      {
        id: 'channel-1-3',
        name: 'code-help',
        type: 'text',
        messages: [],
      },
    ],
  },
  {
    id: 'server-2',
    name: 'Game Night',
    iconUrl: 'https://picsum.photos/seed/server-2/64/64',
    users: MOCK_USERS.slice(0, 4),
    channels: [
      {
        id: 'channel-2-1',
        name: 'planning',
        type: 'text',
        messages: [],
      },
      {
        id: 'channel-2-2',
        name: 'off-topic',
        type: 'text',
        messages: [],
      },
    ],
  },
];

export const MOCK_DMS: Server = {
  id: 'dms',
  name: 'Direct Messages',
  iconUrl: '', // No icon for DMs server
  users: MOCK_USERS,
  channels: [
    {
      id: 'dm-1',
      name: 'Morgan',
      type: 'dm',
      recipient: MOCK_USERS.find(u => u.id === 'user-4'),
      messages: [],
    },
    {
      id: 'dm-2',
      name: 'Jordan',
      type: 'dm',
      recipient: MOCK_USERS.find(u => u.id === 'user-5'),
      messages: [],
    },
  ],
};

export const FRIENDS_SERVER_TEMPLATE: Server = {
    id: 'friends',
    name: 'Friends',
    iconUrl: '', // No icon, will be handled by a specific icon component
    users: MOCK_USERS, // All users can potentially be friends
    channels: [], // Will be populated dynamically
};