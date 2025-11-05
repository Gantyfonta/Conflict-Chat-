import React, { useState, useCallback, useMemo } from 'react';
import { Server, Channel, User, Message } from '../types';
import ServerList from './ServerList';
import ChannelList from './ChannelList';
import ChatView from './ChatView';
import { MOCK_SERVERS, MOCK_DMS, FRIENDS_SERVER_TEMPLATE, MOCK_USERS } from '../data/mockData';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
}

const AddServerModal: React.FC<{ onCreate: (details: { name: string, iconUrl: string }) => void, onClose: () => void }> = ({ onCreate, onClose }) => {
    const [name, setName] = useState('');
    const [iconUrl, setIconUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate({ name, iconUrl: iconUrl || `https://picsum.photos/seed/${Date.now()}/64/64` });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-center mb-4">Create a Server</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="server-name" className="text-xs font-bold uppercase text-gray-400">Server Name</label>
                        <input
                            id="server-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-900 rounded-md p-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="server-icon" className="text-xs font-bold uppercase text-gray-400">Icon URL (Optional)</label>
                        <input
                            id="server-icon"
                            type="text"
                            value={iconUrl}
                            onChange={(e) => setIconUrl(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-900 rounded-md p-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com/icon.png"
                        />
                    </div>
                    <div className="bg-gray-800 p-4 rounded-md flex justify-end space-x-4">
                         <button type="button" onClick={onClose} className="text-gray-300 hover:text-white">Cancel</button>
                         <button type="submit" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const PlaceholderView = () => (
    <div className="flex-1 flex flex-col bg-gray-700">
        <header className="h-12 flex items-center px-4 shadow-md border-b border-gray-900/50">
            <h2 className="font-semibold text-lg text-white">Select a channel</h2>
        </header>
        <main className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
                <h2 className="text-2xl font-bold">No channel selected</h2>
                <p className="mt-2">Select a channel from the list on the left to start chatting.</p>
            </div>
        </main>
    </div>
);


const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout }) => {
  const [friends, setFriends] = useState<Set<string>>(new Set());
  const [userServers, setUserServers] = useState<Server[]>(MOCK_SERVERS);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isAddServerModalOpen, setAddServerModalOpen] = useState(false);

  const servers = useMemo(() => {
    const friendChannels: Channel[] = Array.from(friends)
      .map((friendId): Channel | null => {
        const friendUser = MOCK_USERS.find(u => u.id === friendId);
        if (!friendUser) return null;
        return {
          id: `dm-${friendUser.id}`,
          name: friendUser.name,
          type: 'dm' as const,
          recipient: friendUser,
          messages: messages[`dm-${friendUser.id}`] || [],
        };
      })
      .filter((channel): channel is Channel => channel !== null);

    const friendsServer: Server = {
      ...FRIENDS_SERVER_TEMPLATE,
      channels: friendChannels,
    };

    return [friendsServer, MOCK_DMS, ...userServers];
  }, [friends, userServers, messages]);

  const [activeServerId, setActiveServerId] = useState<string>(servers[0].id);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(servers[0].channels[0]?.id || MOCK_DMS.channels[0]?.id);

  const activeServer = useMemo(() => servers.find(s => s.id === activeServerId) || servers[0], [servers, activeServerId]);
  const activeChannel = useMemo(() => activeServer.channels.find(c => c.id === activeChannelId), [activeServer, activeChannelId]);

  const handleSelectServer = useCallback((server: Server) => {
    setActiveServerId(server.id);
    setActiveChannelId(server.channels[0]?.id || null);
  }, []);

  const handleSelectChannel = useCallback((channel: Channel) => {
    setActiveChannelId(channel.id);
  }, []);

  const handleToggleFriend = useCallback((userId: string) => {
    setFriends(prevFriends => {
        const newFriends = new Set(prevFriends);
        if (newFriends.has(userId)) {
            newFriends.delete(userId);
        } else {
            newFriends.add(userId);
        }
        return newFriends;
    });
  }, []);

  const handleCreateServer = useCallback(({ name, iconUrl }: { name: string, iconUrl: string }) => {
      const newServer: Server = {
          id: `server-${Date.now()}`,
          name,
          iconUrl,
          users: [user, ...MOCK_USERS.slice(1, 4)], // Add current user + some mock users
          channels: [{ id: `channel-${Date.now()}`, name: 'general', type: 'text', messages: [] }],
      };
      setUserServers(prev => [...prev, newServer]);
      setAddServerModalOpen(false);
      setActiveServerId(newServer.id);
      setActiveChannelId(newServer.channels[0].id);
  }, [user]);

  const handleAddChannel = useCallback((server: Server) => {
      const channelName = prompt('Enter a name for the new channel:');
      if (channelName && channelName.trim()) {
          const newChannel: Channel = {
              id: `channel-${Date.now()}`,
              name: channelName.trim(),
              type: 'text',
              messages: [],
          };
          const updateServerChannels = (sv: Server) => ({
              ...sv,
              channels: [...sv.channels, newChannel],
          });
          
          setUserServers(prev => prev.map(s => s.id === server.id ? updateServerChannels(s) : s));
          setActiveChannelId(newChannel.id);
      }
  }, []);

  const handleSendMessage = useCallback((text: string) => {
      if (!activeChannelId) return;

      const newMessage: Message = {
          id: `msg-${Date.now()}`,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          user,
      };

      setMessages(prev => ({
          ...prev,
          [activeChannelId]: [...(prev[activeChannelId] || []), newMessage],
      }));

  }, [activeChannelId, user]);

  return (
    <div className="flex h-screen text-white bg-gray-900">
      <ServerList
        servers={servers}
        activeServer={activeServer}
        onSelectServer={handleSelectServer}
        onAddServer={() => setAddServerModalOpen(true)}
      />
      <ChannelList
        server={activeServer}
        activeChannel={activeChannel || null}
        onSelectChannel={handleSelectChannel}
        onAddChannel={handleAddChannel}
        user={user}
        onLogout={onLogout}
      />
      {activeChannel ? (
        <ChatView
            key={activeChannel.id} 
            channel={activeChannel}
            serverUsers={activeServer.users}
            currentUser={user}
            messages={messages[activeChannel.id] || []}
            onSendMessage={handleSendMessage}
            friends={friends}
            onToggleFriend={handleToggleFriend}
        />
      ) : (
        <PlaceholderView />
      )}
      {isAddServerModalOpen && <AddServerModal onCreate={handleCreateServer} onClose={() => setAddServerModalOpen(false)} />}
    </div>
  );
};

export default MainLayout;
