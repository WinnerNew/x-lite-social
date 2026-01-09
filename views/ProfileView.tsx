
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Settings } from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
  onSettings: () => void;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onSettings, onBack }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  
  return (
    <div className="flex flex-col bg-black h-full">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-40 p-3 flex items-center gap-8 border-b border-gray-800">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-lg leading-tight">{user.username}</h2>
          <p className="text-xs text-gray-500">42 posts</p>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 pb-20">
        {/* Hero Section */}
        <div className="h-32 bg-zinc-800 w-full relative">
          <div className="absolute -bottom-12 left-4">
            <img 
              src={user.avatar} 
              className="w-20 h-20 rounded-full border-4 border-black object-cover shadow-lg" 
              alt="profile" 
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-14 px-4">
          <div className="flex justify-end gap-2">
            <button 
              onClick={onSettings}
              className="border border-gray-700 p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button className="border border-gray-700 font-bold px-4 py-1.5 rounded-full hover:bg-white/5 transition-colors">
              Edit profile
            </button>
          </div>

          <div className="mt-2">
            <h1 className="text-xl font-bold">{user.username}</h1>
            <p className="text-gray-500 text-[15px]">{user.handle}</p>
          </div>

          <p className="mt-3 text-[15px] leading-relaxed">{user.bio}</p>

          <div className="flex items-center gap-1 text-gray-500 text-sm mt-3">
            <Calendar className="w-4 h-4" />
            <span>Joined October 2023</span>
          </div>

          <div className="flex gap-4 mt-3 text-sm">
            <div className="hover:underline cursor-pointer group">
              <span className="font-bold text-white group-hover:text-white">{user.following}</span> <span className="text-gray-500">Following</span>
            </div>
            <div className="hover:underline cursor-pointer group">
              <span className="font-bold text-white group-hover:text-white">{user.followers}</span> <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mt-4 overflow-x-auto bg-black">
          {['Posts', 'Replies', 'Media', 'Likes'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 min-w-fit px-4 py-4 text-center hover:bg-white/5 relative"
            >
              <span className={`font-semibold text-[15px] ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>{tab}</span>
              {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-sky-500 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Content Mockup */}
        <div className="flex flex-col">
          <div className="p-12 text-center text-gray-500 text-sm italic">
            You haven't posted anything yet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
