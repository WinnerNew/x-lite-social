
import React, { useState } from 'react';
import { Heart, User, Repeat2, Settings } from 'lucide-react';

const NotificationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  const NOTIFS = [
    { id: 1, type: 'like', user: 'Crypto Whale', content: 'liked your post', time: '2h', avatar: 'https://picsum.photos/seed/crypto/200' },
    { id: 2, type: 'follow', user: 'Tech Insider', content: 'followed you', time: '4h', avatar: 'https://picsum.photos/seed/tech/200' },
    { id: 3, type: 'repost', user: 'Sarah Jenkins', content: 'reposted your post', time: '6h', avatar: 'https://picsum.photos/seed/sarah/200' },
  ];

  return (
    <div className="flex flex-col h-full bg-black">
      <header className="sticky top-0 bg-black/80 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-xl font-bold">Notifications</h2>
          <Settings className="w-5 h-5" />
        </div>
        <div className="flex">
          {['All', 'Verified', 'Mentions'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-4 text-center hover:bg-white/5 relative"
            >
              <span className={`font-semibold text-sm ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>{tab}</span>
              {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-sky-500 rounded-full" />}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1">
        {NOTIFS.map(n => (
          <div key={n.id} className="p-4 border-b border-gray-800 flex gap-4 hover:bg-white/5 transition-colors">
            <div className="pt-1">
              {n.type === 'like' && <Heart className="w-7 h-7 text-pink-600 fill-current" />}
              {n.type === 'follow' && <User className="w-7 h-7 text-sky-500 fill-current" />}
              {n.type === 'repost' && <Repeat2 className="w-7 h-7 text-green-500" />}
            </div>
            <div className="flex-1">
              <img src={n.avatar} className="w-8 h-8 rounded-full mb-2" />
              <p className="text-[15px]">
                <span className="font-bold">{n.user}</span> {n.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsView;
