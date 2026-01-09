
import React from 'react';
import { Settings, Search } from 'lucide-react';

const TRENDS = [
  { category: 'Trending in Japan', topic: '#TokyoRun', posts: '42.5K' },
  { category: 'Technology · Trending', topic: 'Gemini 3', posts: '128K' },
  { category: 'Politics · Trending', topic: 'New Policy', posts: '12K' },
  { category: 'Sports · Trending', topic: 'Premier League', posts: '256K' },
  { category: 'Entertainment · Trending', topic: 'Movie Night', posts: '8.4K' }
];

const ExploreView: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-40 p-3 flex gap-4 items-center border-b border-gray-800">
        <div className="flex-1 bg-gray-900 rounded-full flex items-center px-4 py-2 text-gray-400">
          <Search className="w-4 h-4 mr-3" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none w-full text-white text-sm"
          />
        </div>
        <Settings className="w-5 h-5 text-white" />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Trends for you</h2>
        <div className="space-y-6">
          {TRENDS.map((trend, idx) => (
            <div key={idx} className="flex justify-between items-start cursor-pointer group">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">{trend.category}</p>
                <p className="font-bold text-white group-hover:underline">{trend.topic}</p>
                <p className="text-xs text-gray-500 mt-1">{trend.posts} posts</p>
              </div>
              <button className="text-gray-500">···</button>
            </div>
          ))}
        </div>
        
        <button className="text-sky-500 text-sm mt-8 hover:underline">Show more</button>
      </div>

      <div className="mt-4 border-t border-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3 py-3">
             <img src={`https://picsum.photos/seed/suggest${i}/200`} className="w-10 h-10 rounded-full" />
             <div className="flex-1">
               <p className="font-bold text-sm">Suggested User {i}</p>
               <p className="text-xs text-gray-500">@suggested_{i}</p>
             </div>
             <button className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreView;
