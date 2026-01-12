import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  BarChart2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onImagePreview: (src: string) => void;
  onReply: (post: Post) => void;
}

// Simulated verified badge
const VerifiedBadge = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-[#1d9bf0] ml-0.5 inline-block">
    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.35-6.2 6.76z"></path>
  </svg>
);

const PostCard: React.FC<PostCardProps> = ({
  post,
  onImagePreview,
  onReply,
}) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [imgLoaded, setImgLoaded] = useState(false);

  const isVerified = post.author.handle === '@google_gemini' || post.author.handle === '@vitejs';

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReposted(!reposted);
  };

  return (
    <article className="flex w-full border-b border-[rgb(47,51,54)] bg-black px-4 py-3 transition-colors hover:bg-white/[0.02] cursor-pointer active:bg-white/[0.04]">
      {/* Avatar */}
      <div className="flex-shrink-0 mr-3">
        <div className="h-10 w-10 rounded-full bg-zinc-900 overflow-hidden">
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-1">
            <span className="truncate text-[15px] font-bold text-[#e7e9ea] hover:underline">
              {post.author.username}
            </span>
            {isVerified && <VerifiedBadge />}
            <span className="truncate text-[15px] text-[#71767b] ml-0.5">
              {post.author.handle}
            </span>
            <span className="flex-shrink-0 text-[15px] text-[#71767b]">
              · {post.timestamp}
            </span>
          </div>
          <button className="text-[#71767b] p-1.5 -mr-1.5 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] rounded-full transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>

        <p className="mt-0.5 text-[15px] leading-[20px] text-[#e7e9ea] whitespace-pre-wrap break-words">
          {post.content}
        </p>

        {post.image && (
          <div
            onClick={(e) => { e.stopPropagation(); onImagePreview(post.image!); }}
            className="mt-3 relative w-full overflow-hidden rounded-[16px] border border-[rgb(47,51,54)] bg-[#16181c]"
          >
            {!imgLoaded && <div className="aspect-[16/9] animate-pulse-noir" />}
            <img
              src={post.image}
              alt="content"
              className={`w-full h-auto object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        )}

        <div className="mt-3 flex justify-between text-[#71767b] max-w-[425px]">
          <button
            onClick={(e) => { e.stopPropagation(); onReply(post); }}
            className="group flex items-center gap-1 hover:text-[#1d9bf0] transition-colors"
          >
            <div className="p-2 -m-2 group-hover:bg-[#1d9bf0]/10 rounded-full">
              <MessageCircle size={18} />
            </div>
            <span className="text-[13px]">{post.replies}</span>
          </button>

          <button
            onClick={handleRepost}
            className={`group flex items-center gap-1 transition-colors ${reposted ? 'text-[#00ba7c]' : 'hover:text-[#00ba7c]'}`}
          >
            <div className={`p-2 -m-2 ${reposted ? 'bg-[#00ba7c]/10' : 'group-hover:bg-[#00ba7c]/10'} rounded-full`}>
              <Repeat2 size={18} />
            </div>
            <span className="text-[13px]">{post.reposts + (reposted ? 1 : 0)}</span>
          </button>

          <button
            onClick={handleLike}
            className={`group flex items-center gap-1 transition-colors ${liked ? 'text-[#f91880]' : 'hover:text-[#f91880]'}`}
          >
            <div className={`p-2 -m-2 ${liked ? 'bg-[#f91880]/10' : 'group-hover:bg-[#f91880]/10'} rounded-full`}>
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} className={liked ? 'scale-110 transition-transform' : ''} />
            </div>
            <span className="text-[13px]">{likeCount}</span>
          </button>

          <button className="group flex items-center gap-1 hover:text-[#1d9bf0] transition-colors">
            <div className="p-2 -m-2 group-hover:bg-[#1d9bf0]/10 rounded-full">
              <BarChart2 size={18} />
            </div>
            <span className="text-[13px]">{(post.likes * 14).toLocaleString()}</span>
          </button>

          <button className="p-2 -m-2 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] rounded-full transition-colors">
            <Share size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;