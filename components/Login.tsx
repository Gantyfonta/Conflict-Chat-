
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const GoogleIcon: React.FC = () => (
  <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.582-3.651-11.181-8.584l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.596 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-sm p-8 space-y-8 bg-gray-700 rounded-lg shadow-lg text-center">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-wider">Gemini Chat</h1>
          <p className="mt-2 text-gray-400">Welcome to the future of chat.</p>
        </div>
        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center px-4 py-3 font-semibold text-gray-800 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-white transition duration-300 ease-in-out"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </button>
        <p className="text-xs text-gray-500">
          (This is a simulated sign-in for demonstration purposes.)
        </p>
      </div>
    </div>
  );
};

export default Login;
