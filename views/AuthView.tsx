import React, { useState } from 'react';
import { User } from '../types';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: 'me',
      username: username || 'User',
      handle: `@${(username || 'user').toLowerCase().replace(/\s+/g, '_')}`,
      avatar: 'https://picsum.photos/seed/me/200',
      bio: 'Exploring the X-Lite experience.',
      followers: 420,
      following: 128
    });
  };

  return (
    <div className="flex flex-col min-h-full px-8 bg-black">
      <div className="mt-20 mb-12 flex justify-center">
        <svg viewBox="0 0 24 24" className="h-12 w-12 fill-white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      </div>
      
      <h1 className="text-4xl font-black mb-12 tracking-tight text-white leading-tight">
        Happening now
      </h1>

      <div className="space-y-4 w-full">
        <button className="w-full bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 active:bg-zinc-200 transition-colors">
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="google" />
          Sign in with Google
        </button>
        <button className="w-full bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 active:bg-zinc-200 transition-colors">
          <span className="text-lg"></span>
          Sign in with Apple
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-500 text-sm">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Phone, email, or username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-zinc-800 focus:border-sky-500 rounded-md p-4 text-zinc-100 outline-none transition-all"
          />
          <button type="submit" className="w-full bg-sky-500 text-white font-bold py-3 rounded-full hover:bg-sky-600 transition-colors">
            Next
          </button>
          <button type="button" className="w-full bg-black border border-zinc-700 text-white font-bold py-3 rounded-full hover:bg-zinc-900 transition-colors">
            Forgot password?
          </button>
        </form>
      </div>

      <p className="mt-12 text-zinc-500 text-sm">
        Don't have an account? <span className="text-sky-500">Sign up</span>
      </p>
    </div>
  );
};

export default AuthView;