import React from 'react';
import { Server } from '../types';
import { PlusIcon, UserGroupIcon } from './icons';

interface ServerListProps {
  servers: Server[];
  activeServer: Server;
  onSelectServer: (server: Server) => void;
  onAddServer: () => void;
}

const ServerIcon: React.FC<{ server: Server, isActive: boolean, onClick: () => void }> = ({ server, isActive, onClick }) => {
  const isDmServer = server.id === 'dms';
  const isFriendsServer = server.id === 'friends';
  
  return (
    <div className="relative group mb-2">
      <div className={`absolute left-0 h-0 w-1 bg-white rounded-r-full transition-all duration-200 ${isActive ? 'h-10' : 'group-hover:h-5'}`}></div>
      <button
        onClick={onClick}
        className={`
          flex items-center justify-center w-12 h-12 rounded-3xl transition-all duration-200 group-hover:rounded-2xl
          ${isActive ? 'bg-blue-500 rounded-2xl' : 'bg-gray-700 hover:bg-blue-500'}
          ${(isDmServer || isFriendsServer) && !isActive ? 'hover:bg-gray-600' : ''}
          focus:outline-none
        `}
      >
        {isDmServer ? (
          <svg className="w-7 h-7 text-gray-200" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h7a2 2 0 002-2v-4a2 2 0 00-2-2h-1z"></path></svg>
        ) : isFriendsServer ? (
          <UserGroupIcon className="text-gray-200" />
        ) : (
          <img src={server.iconUrl} alt={server.name} className="w-full h-full object-cover rounded-3xl group-hover:rounded-2xl transition-all duration-200" />
        )}
      </button>
      <span className="absolute left-16 p-2 text-sm bg-gray-900 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 pointer-events-none">
        {server.name}
      </span>
    </div>
  );
};

const ServerList: React.FC<ServerListProps> = ({ servers, activeServer, onSelectServer, onAddServer }) => {
  return (
    <div className="w-20 bg-gray-900 p-3 flex flex-col items-center space-y-2 overflow-y-auto">
      {servers.map(server => (
        <ServerIcon 
          key={server.id} 
          server={server}
          isActive={server.id === activeServer.id}
          onClick={() => onSelectServer(server)}
        />
      ))}
       <div className="w-full border-t border-gray-700 my-2"></div>
      <button
        onClick={onAddServer}
        className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-3xl hover:bg-green-500 hover:rounded-2xl transition-all duration-200 group focus:outline-none"
      >
        <PlusIcon className="text-green-500 group-hover:text-white" />
      </button>
    </div>
  );
};

export default ServerList;