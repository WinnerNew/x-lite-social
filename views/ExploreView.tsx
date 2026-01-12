import React from 'react';
import { Settings, Search } from 'lucide-react';

const TRENDS = [
  { category: 'Trending in Tech', topic: 'Gemini 3 Pro', posts: '1.2M' },
  { category: 'Development', topic: 'React 19 Hooks', posts: '42.5K' },
  { category: 'Design', topic: 'Linear Style UI', posts: '12K' },
  { category: 'Sports · Trending', topic: 'Formula 1', posts: '256K' },
  { category: 'Entertainment', topic: 'New Album Release', posts: '8.4K' }
];

const ExploreView: React.FC = () => {
  return (
    <div className="flex flex-col bg-black min-h-full">
      <header className="sticky top-0 glass-header z-40 border-b border-zinc-900 pt-safe">
        <div className="px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2 group focus-within:ring-1 focus-within:ring-sky-500/50 focus-within:border-sky-500 transition-all">
              <Search size={16} className="text-zinc-500 group-focus-within:text-sky-500" />
              <input 
                type="text" 
                placeholder="Search X-Lite" 
                className="bg-transparent border-none text-zinc-100 text-[14px] ml-3 outline-none w-full placeholder:text-zinc-600" 
              />
            </div>
            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-100">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4">
        <h2 className="text-xl font-extrabold mb-4 tracking-tight">Trends for you</h2>
        <div className="space-y-6">
          {TRENDS.map((trend, idx) => (
            <div key={idx} className="flex justify-between items-start cursor-pointer group active-press">
              <div className="min-w-0">
                <p className="text-[12px] text-zinc-500 mb-0.5">{trend.category}</p>
                <p className="font-bold text-[15px] group-hover:underline text-zinc-100">{trend.topic}</p>
                <p className="text-[12px] text-zinc-500 mt-0.5">{trend.posts} posts</p>
              </div>
              <button className="text-zinc-600 p-1 hover:bg-sky-500/10 hover:text-sky-500 rounded-full">···</button>
            </div>
          ))}
        </div>
        <button className="text-sky-500 text-[14px] mt-6 hover:underline font-bold">Show more</button>
      </div>

      <div className="border-t border-zinc-900 mt-4 p-4">
        <h2 className="text-xl font-extrabold mb-4 tracking-tight text-zinc-100">Who to follow</h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3 py-1 active-press">
               <div className="w-10 h-10 rounded-full border border-zinc-800 overflow-hidden bg-zinc-900">
                 <img src={`https://picsum.photos/seed/user${i}/200`} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="font-bold text-[14px] text-zinc-100 truncate">Explorer {i}</p>
                 <p className="text-zinc-500 text-[13px] truncate">@explorer_id_{i}</p>
               </div>
               <button className="bg-zinc-100 text-black px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-zinc-300 transition-colors">
                 Follow
               </button>
            </div>
          ))}
        </div>
        <button className="text-sky-500 text-[14px] mt-6 hover:underline font-bold">Show more</button>
      </div>
    </div>
  );
};

export default ExploreView;