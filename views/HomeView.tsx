
import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import ImagePreview from '../components/ImagePreview';
import ReplyModal from '../components/ReplyModal';
import { Post, User } from '../types';

interface HomeViewProps {
  currentUser: User;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: '2',
    author: {
      id: '2',
      username: 'Tech Insider',
      handle: '@tech_news',
      avatar: 'https://picsum.photos/seed/tech/200',
      followers: 1200,
      following: 300
    },
    content: "Just saw the latest prototype for the Gemini 3 UI—mind blown! 🤯 The speed and responsiveness are on another level. #Tech #AI",
    timestamp: '1h',
    likes: 85,
    reposts: 12,
    replies: 5,
    image: 'https://picsum.photos/seed/future/800/450'
  },
  {
    id: '2',
    userId: '3',
    author: {
      id: '3',
      username: 'Sarah Jenkins',
      handle: '@sarah_j',
      avatar: 'https://picsum.photos/seed/sarah/200',
      followers: 850,
      following: 420
    },
    content: "Mornings in the city just hit different. ✨🌆",
    timestamp: '3h',
    likes: 231,
    reposts: 4,
    replies: 18,
    image: 'https://picsum.photos/seed/city/800/500'
  }
];

const HomeView: React.FC<HomeViewProps> = ({ currentUser }) => {
  const [tab, setTab] = useState<'FOR_YOU' | 'FOLLOWING'>('FOR_YOU');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [replyPost, setReplyPost] = useState<Post | null>(null);

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 bg-black/80 backdrop-blur-md z-40 border-b border-zinc-800">
        <div className="flex items-center px-4 py-3 pt-[env(safe-area-inset-top,12px)]">
          <img src={currentUser.avatar} alt="me" className="w-8 h-8 rounded-full border border-zinc-800" />
          <div className="mx-auto">
             <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
               <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
             </svg>
          </div>
          <div className="w-8"></div>
        </div>

        <div className="flex">
          {(['FOR_YOU', 'FOLLOWING'] as const).map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-4 text-center hover:bg-zinc-900/50 relative group transition-colors"
            >
              <span className={`text-[15px] font-bold ${tab === t ? 'text-zinc-100' : 'text-zinc-500'}`}>
                {t === 'FOR_YOU' ? 'For you' : 'Following'}
              </span>
              {tab === t && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-[4.5px] bg-sky-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col">
        {MOCK_POSTS.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onImagePreview={setPreviewImage} 
            onReply={setReplyPost}
          />
        ))}
      </div>

      <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />
      <ReplyModal 
        isOpen={!!replyPost} 
        onClose={() => setReplyPost(null)} 
        post={replyPost} 
      />
    </div>
  );
};

export default HomeView;
