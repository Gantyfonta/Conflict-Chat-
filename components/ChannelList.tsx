import React from 'react';
import { Server, Channel, User } from '../types';
import { HashIcon, PlusIcon, CogIcon, MicIcon, HeadphoneIcon, LogoutIcon } from './icons';

interface ChannelListProps {
  server: Server;
  activeChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
  onAddChannel: (server: Server) => void;
  user: User;
  onLogout: () => void;
}

const UserStatusIndicator: React.FC<{ status: User['status'] }> = ({ status }) => {
  const color = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  }[status];
  return <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${color} border-2 border-gray-800 rounded-full`}></div>;
}

const ChannelLink: React.FC<{ channel: Channel, isActive: boolean, onClick: () => void }> = ({ channel, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-2 py-1.5 text-left rounded-md transition-colors duration-150
        ${isActive ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'}`}
    >
      {channel.type === 'dm' && channel.recipient ? (
        <div className="relative mr-2">
            <img src={channel.recipient.avatarUrl} alt={channel.recipient.name} className="w-8 h-8 rounded-full" />
            <UserStatusIndicator status={channel.recipient.status} />
        </div>
      ) : (
        <HashIcon className="w-5 h-5 mr-2 text-gray-500" />
      )}
      <span className="font-medium truncate">{channel.name}</span>
    </button>
  );
};


const ChannelList: React.FC<ChannelListProps> = ({ server, activeChannel, onSelectChannel, onAddChannel, user, onLogout }) => {
  const isDms = server.id === 'dms';
  const isFriends = server.id === 'friends';
  const isRegularServer = !isDms && !isFriends;

  const getChannelHeader = () => {
    if (isFriends) return `Friends — ${server.channels.length}`;
    if (isDms) return 'Direct Messages';
    return 'Text Channels';
  }

  return (
    <div className="w-64 bg-gray-800 flex flex-col">
      <header className="px-4 h-12 flex items-center shadow-md font-bold text-lg border-b border-gray-900/50">
        <h1 className="truncate">{server.name}</h1>
      </header>
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 pt-2 pb-1">
            <h2 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              {getChannelHeader()}
            </h2>
            {isRegularServer && (
                <button onClick={() => onAddChannel(server)} className="text-gray-400 hover:text-white" title="Create Channel">
                    <PlusIcon className="w-4 h-4" />
                </button>
            )}
        </div>
        {server.channels.map(channel => (
          <ChannelLink 
            key={channel.id}
            channel={channel}
            isActive={activeChannel ? channel.id === activeChannel.id : false}
            onClick={() => onSelectChannel(channel)}
          />
        ))}
      </nav>
      <footer className="h-14 bg-gray-900/50 p-2 flex items-center justify-between">
        <div className="flex items-center">
            <div className="relative mr-2">
                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full"/>
                <UserStatusIndicator status={user.status} />
            </div>
            <div>
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-gray-400">#{user.id.slice(-4)}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <button className="hover:text-white"><MicIcon /></button>
          <button className="hover:text-white"><HeadphoneIcon /></button>
          <button onClick={onLogout} className="hover:text-white" title="Logout"><LogoutIcon /></button>
        </div>
      </footer>
    </div>
  );
};

export default ChannelList;
