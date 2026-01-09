
import React, { useState } from 'react';
import { User } from '../types';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [handle, setHandle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Login/Registration
    const mockUser: User = {
      id: 'me',
      username: username || 'Guest User',
      handle: handle || '@guest_user',
      avatar: 'https://picsum.photos/seed/me/200',
      bio: 'Just another wanderer in the digital space.',
      followers: 42,
      following: 128
    };
    onLogin(mockUser);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center px-8 bg-black">
      <div className="mb-12">
        <svg viewBox="0 0 24 24" className="h-12 w-12 fill-white" aria-hidden="true">
            <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-center">
        {isLogin ? 'Sign in to X' : 'Join X today'}
      </h1>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-md p-3 focus:border-sky-500 outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Handle</label>
          <input
            type="text"
            required
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-md p-3 focus:border-sky-500 outline-none transition-colors"
            placeholder="@johndoe"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-8 text-center text-gray-500">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sky-500 hover:underline"
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  );
};

export default AuthView;
