
import React, { useState } from 'react';
import { X, Image, List, MapPin, Calendar, Globe } from 'lucide-react';

interface CreatePostViewProps {
  onBack: () => void;
}

const CreatePostView: React.FC<CreatePostViewProps> = ({ onBack }) => {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-full bg-black">
      <header className="p-3 flex items-center justify-between">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <button 
          disabled={!content.trim()}
          onClick={onBack}
          className={`bg-sky-500 text-white font-bold px-5 py-1.5 rounded-full transition-opacity ${!content.trim() ? 'opacity-50' : 'opacity-100'}`}
        >
          Post
        </button>
      </header>

      <div className="flex-1 p-4 flex gap-3">
        <img src="https://picsum.photos/seed/me/200" className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1 flex flex-col">
          <div className="mb-2">
            <button className="flex items-center gap-1 text-sky-500 border border-gray-800 rounded-full px-3 py-0.5 text-xs font-bold mb-4">
              Everyone
            </button>
          </div>
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is happening?!"
            className="bg-transparent text-xl border-none outline-none resize-none w-full flex-1 placeholder-gray-600"
          />
        </div>
      </div>

      <div className="border-t border-gray-800 p-3">
        <button className="flex items-center gap-1 text-sky-500 text-sm font-bold mb-4">
          <Globe className="w-4 h-4" />
          Everyone can reply
        </button>
        
        <div className="flex items-center justify-between text-sky-500">
          <div className="flex gap-4">
            <Image className="w-5 h-5 cursor-pointer" />
            <List className="w-5 h-5 cursor-pointer" />
            <Smile className="w-5 h-5 cursor-pointer" />
            <MapPin className="w-5 h-5 cursor-pointer" />
          </div>
          <div className="w-6 h-6 border-2 border-gray-800 rounded-full flex items-center justify-center text-[10px] text-gray-500">
            {content.length}
          </div>
        </div>
      </div>
    </div>
  );
};

const Smile = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);

export default CreatePostView;
