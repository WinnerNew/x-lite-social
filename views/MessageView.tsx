
import React from 'react';
import { Settings, MailPlus, Search } from 'lucide-react';
import { Chat } from '../types';

interface MessageViewProps {
  onSelectChat: (id: string) => void;
}

const MOCK_CHATS: Chat[] = [
  {
    id: 'c1',
    participant: {
      id: '2',
      username: 'Tech Insider',
      handle: '@tech_news',
      avatar: 'https://picsum.photos/seed/tech/200',
      followers: 1200,
      following: 300
    },
    lastMessage: 'The new API is live! Check it out.',
    unreadCount: 1
  },
  {
    id: 'c2',
    participant: {
      id: '3',
      username: 'Sarah Jenkins',
      handle: '@sarah_j',
      avatar: 'https://picsum.photos/seed/sarah/200',
      followers: 850,
      following: 420
    },
    lastMessage: 'Are we still meeting at 5?',
    unreadCount: 0
  }
];

const MessageView: React.FC<MessageViewProps> = ({ onSelectChat }) => {
  return (
    <div className="flex flex-col h-full bg-black">
      <header className="sticky top-0 bg-black/80 backdrop-blur-md z-40 p-3 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <div className="flex gap-4">
            <Settings className="w-5 h-5" />
            <MailPlus className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-full flex items-center px-4 py-2 text-gray-400 mb-2">
          <Search className="w-4 h-4 mr-3" />
          <input 
            type="text" 
            placeholder="Search Direct Messages" 
            className="bg-transparent border-none outline-none w-full text-white text-sm"
          />
        </div>
      </header>

      <div className="flex flex-col">
        {MOCK_CHATS.map(chat => (
          <div 
            key={chat.id} 
            onClick={() => onSelectChat(chat.id)}
            className="flex items-center gap-3 p-4 hover:bg-white/5 cursor-pointer"
          >
            <div className="relative">
              <img src={chat.participant.avatar} className="w-12 h-12 rounded-full" />
              {chat.unreadCount > 0 && (
                <div className="absolute top-0 -right-1 bg-sky-500 w-3 h-3 rounded-full border-2 border-black" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-bold text-sm truncate">{chat.participant.username}</span>
                  <span className="text-gray-500 text-sm truncate">{chat.participant.handle}</span>
                </div>
                <span className="text-gray-500 text-xs">Oct 24</span>
              </div>
              <p className="text-gray-500 text-sm truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageView;
