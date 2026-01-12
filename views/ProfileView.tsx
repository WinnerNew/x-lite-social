import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, MoreHorizontal } from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
  onSettings: () => void;
  onEditProfile: () => void;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEditProfile, onBack }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  
  return (
    <div className="flex flex-col min-h-full bg-black">
      <header className="sticky top-0 glass-header z-40 pt-safe">
        <div className="flex items-center gap-6 px-4 py-1">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col min-w-0">
            <h2 className="text-[17px] font-bold leading-tight truncate">{user.username}</h2>
            <p className="text-[13px] text-[#71767b]">1,024 posts</p>
          </div>
        </div>
      </header>

      <div className="flex-1">
        {/* Banner - Precise 3:1 ratio */}
        <div className="aspect-[3/1] bg-[#333639] relative">
          <img 
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80" 
            className="w-full h-full object-cover" 
            alt="banner" 
          />
          {/* Avatar overlap */}
          <div className="absolute -bottom-[42px] left-4">
            <div className="w-[84px] h-[84px] rounded-full border-[4px] border-black bg-black overflow-hidden">
              <img src={user.avatar} className="w-full h-full object-cover" alt="profile" />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-3 px-4 pb-4">
          <div className="flex justify-end gap-2 mb-4 h-[36px]">
            <button className="p-2 border border-[rgb(47,51,54)] rounded-full hover:bg-white/10 transition-colors">
              <MoreHorizontal size={18} />
            </button>
            <button 
              onClick={onEditProfile}
              className="px-4 py-1.5 border border-[rgb(47,51,54)] rounded-full text-[15px] font-bold hover:bg-white/10 transition-colors"
            >
              Edit profile
            </button>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-[20px] font-black tracking-tight flex items-center gap-1">
              {user.username}
              <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-[#1d9bf0]">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.35-6.2 6.76z"></path>
              </svg>
            </h1>
            <p className="text-[15px] text-[#71767b]">{user.handle}</p>
          </div>

          <p className="mt-3 text-[15px] text-[#e7e9ea] leading-normal">
            {user.bio || "Crafting experiences with @google_gemini. Building the future of H5 Social."}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[#71767b] text-[14px]">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Joined October 2023</span>
            </div>
          </div>

          <div className="mt-3 flex gap-4">
            <button className="text-[14px] hover:underline">
              <span className="font-bold text-[#e7e9ea]">{user.following}</span>
              <span className="text-[#71767b] ml-1">Following</span>
            </button>
            <button className="text-[14px] hover:underline">
              <span className="font-bold text-[#e7e9ea]">{user.followers.toLocaleString()}</span>
              <span className="text-[#71767b] ml-1">Followers</span>
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-[rgb(47,51,54)] sticky top-[calc(48px+env(safe-area-inset-top,0px))] z-30 bg-black/80 backdrop-blur-md px-2">
          {['Posts', 'Replies', 'Media', 'Likes'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 pt-4 pb-0 hover:bg-white/5 transition-colors relative h-[53px]"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className={`text-[15px] font-bold ${activeTab === tab ? 'text-[#e7e9ea]' : 'text-[#71767b]'}`}>
                  {tab}
                </span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 h-[4px] min-w-[50px] bg-[#1d9bf0] rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Posts Content */}
        <div className="pb-20">
          <div className="py-20 text-center px-8">
            <h3 className="text-[31px] font-black leading-tight text-[#e7e9ea]">You haven't posted anything yet</h3>
            <p className="mt-2 text-[#71767b] text-[15px]">When you post content, it'll show up here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;