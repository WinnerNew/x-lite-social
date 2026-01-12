import React, { useState } from 'react';
import { X, Image, List, MapPin, Globe, Smile } from 'lucide-react';

interface CreatePostViewProps {
  onBack: () => void;
}

const CreatePostView: React.FC<CreatePostViewProps> = ({ onBack }) => {
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col h-screen bg-black">
      <header className="flex items-center justify-between px-4 py-2 pt-safe border-b border-zinc-900">
        <button onClick={onBack} className="p-2 active-press"><X size={22} /></button>
        <button 
          disabled={!content.trim()}
          onClick={onBack}
          className={`bg-sky-500 text-white font-bold px-6 py-2 rounded-full transition-all ${
            !content.trim() ? 'opacity-50' : 'active-press hover:bg-sky-600'
          }`}
        >
          Post
        </button>
      </header>

      <div className="flex-1 flex gap-4 px-4 pt-6">
        <div className="flex-shrink-0">
          <img src="https://picsum.photos/seed/me/200" className="w-10 h-10 rounded-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col">
          <button className="self-start text-sky-500 border border-zinc-800 rounded-full px-3 py-0.5 text-[13px] font-bold mb-4">
            Everyone
          </button>
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?!"
            className="bg-transparent border-none text-xl text-zinc-100 placeholder:text-zinc-700 outline-none resize-none w-full"
            rows={10}
          />
        </div>
      </div>

      <div className="border-t border-zinc-900 p-4 pb-safe bg-black">
        <div className="flex items-center gap-2 text-sky-500 font-bold text-sm mb-4">
          <Globe size={16} />
          Everyone can reply
        </div>
        
        <div className="flex justify-between items-center text-sky-500">
          <div className="flex gap-5">
            <button className="active-press"><Image size={20} /></button>
            <button className="active-press"><List size={20} /></button>
            <button className="active-press"><Smile size={20} /></button>
            <button className="active-press"><MapPin size={20} /></button>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-zinc-600 text-xs font-mono">{content.length}/280</div>
             <div className="w-5 h-5 rounded-full border-2 border-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostView;