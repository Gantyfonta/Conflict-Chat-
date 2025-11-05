import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Channel, Message, User } from '../types';
import { HashIcon, PaperAirplaneIcon, UserPlusIcon, UserCheckIcon } from './icons';

interface ChatViewProps {
  channel: Channel;
  serverUsers: User[];
  currentUser: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  friends: Set<string>;
  onToggleFriend: (userId: string) => void;
}

const UserListItem: React.FC<{ user: User; isFriend: boolean; onToggleFriend: (userId: string) => void; isCurrentUser: boolean; }> = ({ user, isFriend, onToggleFriend, isCurrentUser }) => (
    <div className="flex items-center justify-between p-2 rounded-md group hover:bg-gray-700/50">
        <div className="flex items-center">
            <div className="relative mr-3">
                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${user.status === 'online' ? 'bg-green-500' : user.status === 'idle' ? 'bg-yellow-500' : user.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'} border-2 border-gray-800 rounded-full`}></div>
            </div>
            <span className="text-sm font-medium text-gray-300">{user.name}</span>
        </div>
        {!isCurrentUser && (
            <button onClick={() => onToggleFriend(user.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                {isFriend ? <UserCheckIcon className="text-green-500" /> : <UserPlusIcon className="text-gray-400 hover:text-white" />}
            </button>
        )}
    </div>
);

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => (
    <div className="flex p-4 hover:bg-gray-800/50">
        <img src={message.user.avatarUrl} alt={message.user.name} className="w-10 h-10 rounded-full mr-4 mt-1" />
        <div>
            <div className="flex items-baseline">
                <span className="font-semibold text-white mr-2">{message.user.name}</span>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
            </div>
            <p className="text-gray-200 whitespace-pre-wrap">{message.text}</p>
        </div>
    </div>
);


const ChatView: React.FC<ChatViewProps> = ({ channel, serverUsers, currentUser, messages, onSendMessage, friends, onToggleFriend }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  }, [input, onSendMessage]);

  return (
    <div className="flex-1 flex flex-col bg-gray-700">
      <header className="h-12 flex items-center px-4 shadow-md border-b border-gray-900/50">
        {channel.type === 'dm' && channel.recipient ? (
             <div className="relative mr-2">
                <img src={channel.recipient.avatarUrl} alt={channel.recipient.name} className="w-7 h-7 rounded-full" />
             </div>
        ) : (
            <HashIcon className="w-6 h-6 text-gray-500 mr-2" />
        )}
        <h2 className="font-semibold text-lg text-white">{channel.name}</h2>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
            <div className="flex-1 p-2 overflow-y-auto">
                {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={messagesEndRef} />
            </div>
            <div className="px-4 pb-4">
            <form onSubmit={handleSendMessage} className="bg-gray-600 rounded-lg flex items-center px-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${channel.type === 'dm' ? '@' : '#'}${channel.name}`}
                    className="flex-1 bg-transparent py-3 text-white placeholder-gray-400 focus:outline-none"
                />
                <button type="submit" disabled={!input.trim()} className="text-blue-400 hover:text-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed">
                    <PaperAirplaneIcon />
                </button>
            </form>
            </div>
        </div>
        {channel.type === 'text' && (
            <aside className="w-64 bg-gray-800 p-2 overflow-y-auto">
                 <h3 className="text-xs font-bold uppercase text-gray-400 px-2 pt-2 pb-1">Users — {serverUsers.length}</h3>
                 {serverUsers.map(user => (
                    <UserListItem 
                        key={user.id} 
                        user={user} 
                        isFriend={friends.has(user.id)}
                        onToggleFriend={onToggleFriend}
                        isCurrentUser={user.id === currentUser.id}
                    />
                ))}
            </aside>
        )}
      </main>
    </div>
  );
};

export default ChatView;
