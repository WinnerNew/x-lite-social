import React, { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from '../components/PostCard';
import ImagePreview from '../components/ImagePreview';
import ReplyModal from '../components/ReplyModal';
import { Post, User } from '../types';
import { Loader2 } from 'lucide-react';

interface HomeViewProps {
  currentUser: User;
}

const generateMockPosts = (startIndex: number, count: number): Post[] => {
  return Array.from({ length: count }).map((_, i) => {
    const id = (startIndex + i).toString();
    const authors = [
      { name: 'Gemini 3 Pro', handle: '@google_gemini' },
      { name: 'Vite Official', handle: '@vitejs' },
      { name: 'React', handle: '@reactjs' },
      { name: 'Tailwind CSS', handle: '@tailwindcss' }
    ];
    const author = authors[i % authors.length];
    
    return {
      id,
      userId: `user-${id}`,
      author: {
        id: `user-${id}`,
        username: author.name,
        handle: author.handle,
        avatar: `https://picsum.photos/seed/${author.handle}/200`,
        followers: 1200000,
        following: 50
      },
      content: i % 3 === 0 
        ? `Working on the final touches of this H5 Social Template. Clean code, high performance, and that premium X aesthetic. 🛠️✨ #WebDev #React`
        : `Infinite scrolling is now smoother than ever using IntersectionObserver and React 19. Check out the latest builds!`,
      timestamp: `${i + 1}h`,
      likes: Math.floor(Math.random() * 5000) + 200,
      reposts: Math.floor(Math.random() * 1000) + 10,
      replies: Math.floor(Math.random() * 500) + 5,
      image: Math.random() > 0.5 ? `https://picsum.photos/seed/post_img_${id}/1200/675` : undefined
    };
  });
};

const HomeView: React.FC<HomeViewProps> = ({ currentUser }) => {
  const [tab, setTab] = useState<'FOR_YOU' | 'FOLLOWING'>('FOR_YOU');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [replyPost, setReplyPost] = useState<Post | null>(null);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMorePosts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setPosts(prev => [...prev, ...generateMockPosts(prev.length, 5)]);
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMorePosts();
    }, { threshold: 0.1 });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loadMorePosts]);

  useEffect(() => { if (posts.length === 0) loadMorePosts(); }, []);

  const TabButton = ({ type, label }: { type: 'FOR_YOU' | 'FOLLOWING', label: string }) => (
    <button 
      onClick={() => setTab(type)}
      className="flex-1 hover:bg-white/[0.05] transition-colors relative h-[53px]"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className={`text-[15px] font-bold ${tab === type ? 'text-[#e7e9ea]' : 'text-[#71767b]'}`}>
          {label}
        </span>
        {tab === type && (
          <div className="absolute bottom-0 h-[4px] min-w-[56px] bg-[#1d9bf0] rounded-full" />
        )}
      </div>
    </button>
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 glass-header pt-safe">
        <div className="flex items-center px-4 py-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={currentUser.avatar} className="w-full h-full object-cover" alt="me" />
          </div>
          <div className="flex-1 flex justify-center">
            <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </div>
          <div className="w-8" />
        </div>
        <div className="flex w-full px-4">
          <TabButton type="FOR_YOU" label="For you" />
          <TabButton type="FOLLOWING" label="Following" />
        </div>
      </header>

      <div className="flex-1">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onImagePreview={setPreviewImage} onReply={setReplyPost} />
        ))}
        <div ref={observerTarget} className="py-12 flex justify-center">
          {isLoading && <Loader2 className="w-7 h-7 text-[#1d9bf0] animate-spin" />}
        </div>
      </div>

      <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />
      <ReplyModal isOpen={!!replyPost} onClose={() => setReplyPost(null)} post={replyPost} />
    </div>
  );
};

export default HomeView;