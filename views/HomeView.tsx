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
    return {
      id,
      userId: `user-${id}`,
      author: {
        id: `user-${id}`,
        username: `X-User ${id}`,
        handle: `@x_user_${id}`,
        avatar: `https://picsum.photos/seed/${id}/200`,
        followers: 120,
        following: 50
      },
      content: `Hello X! This is post ${id} with some #SocialH5 #Tech vibe. Dynamic content and infinite scroll working smoothly!`,
      timestamp: `${i + 1}h`,
      likes: Math.floor(Math.random() * 100),
      reposts: Math.floor(Math.random() * 20),
      replies: Math.floor(Math.random() * 10),
      image: Math.random() > 0.5 ? `https://picsum.photos/seed/img${id}/800/600` : undefined
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
      className="flex-1 py-4 relative active:bg-zinc-900/50 transition-colors"
    >
      <span className={`text-[15px] font-bold ${tab === type ? 'text-zinc-100' : 'text-zinc-500'}`}>
        {label}
      </span>
      {tab === type && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-sky-500 rounded-full" />
      )}
    </button>
  );

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 glass-header border-b border-zinc-900 pt-safe">
        <div className="flex items-center px-4 py-1">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={currentUser.avatar} className="w-full h-full object-cover" alt="me" />
          </div>
          <div className="flex-1 flex justify-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </div>
          <div className="w-8" />
        </div>
        <div className="flex w-full">
          <TabButton type="FOR_YOU" label="For you" />
          <TabButton type="FOLLOWING" label="Following" />
        </div>
      </header>

      <div className="flex-1">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onImagePreview={setPreviewImage} onReply={setReplyPost} />
        ))}
        <div ref={observerTarget} className="py-10 flex justify-center">
          {isLoading && <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />}
        </div>
      </div>

      <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />
      <ReplyModal isOpen={!!replyPost} onClose={() => setReplyPost(null)} post={replyPost} />
    </div>
  );
};

export default HomeView;