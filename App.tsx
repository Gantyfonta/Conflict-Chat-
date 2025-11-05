
import React, { useState, useCallback } from 'react';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import { User } from './types';
import { MOCK_USER } from './data/mockData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = useCallback(() => {
    setUser(MOCK_USER);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <MainLayout user={user} onLogout={handleLogout} />;
};

export default App;
