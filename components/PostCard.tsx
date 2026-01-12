
import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onImagePreview: (src: string) => void;
  onReply: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onImagePreview,
  onReply,
}) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [imgLoaded, setImgLoaded] = useState(false);

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
    <div className="flex w-full overflow-hidden border-b border-zinc-900 bg-black p-4 transition-colors hover:bg-zinc-900/20 cursor-pointer active:bg-zinc-900/40">
      {/* Avatar Section */}
      <div className="flex-shrink-0 mr-3">
        <div className="h-10 w-10 rounded-full border border-zinc-800 overflow-hidden bg-zinc-900 shadow-inner">
          <img
            src={post.author.avatar}
            alt={post.author.username}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[15px] font-bold text-zinc-100 hover:underline decoration-zinc-500 underline-offset-2">
              {post.author.username}
            </span>
            <span className="truncate text-[14px] text-zinc-500">
              {post.author.handle}
            </span>
            <span className="flex-shrink-0 text-[14px] text-zinc-600 font-medium">
              · {post.timestamp}
            </span>
          </div>
          <button className="rounded-full p-1.5 text-zinc-600 transition-all hover:bg-sky-500/10 hover:text-sky-500 active:scale-90">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Text Content */}
        <p className="break-words text-[15px] leading-relaxed text-zinc-200">
          {post.content}
        </p>

        {/* Media Section */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 0.995 }}
            onClick={(e) => {
              e.stopPropagation();
              onImagePreview(post.image!);
            }}
            className="relative mt-3 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            style={{ maxHeight: '512px' }}
          >
            {!imgLoaded && (
              <div className="absolute inset-0 bg-zinc-900 animate-pulse-zinc flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-zinc-800 rounded-full border-t-zinc-500 animate-spin" />
              </div>
            )}
            <img
              src={post.image}
              alt="post media"
              className={`block w-full h-auto max-h-[512px] object-cover transition-all duration-700 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
            />
          </motion.div>
        )}

        {/* Interaction Bar */}
        <div className="mt-4 flex max-w-[360px] justify-between text-zinc-500 -ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReply(post);
            }}
            className="group flex items-center gap-2 transition-colors hover:text-sky-500 active:scale-95"
          >
            <div className="rounded-full p-2 transition-colors group-hover:bg-sky-500/10 group-active:bg-sky-500/20">
              <MessageCircle size={18} className="stroke-[1.8]" />
            </div>
            <span className="text-[13px] font-semibold tabular-nums">{post.replies}</span>
          </button>

          <button
            onClick={handleRepost}
            className={`group flex items-center gap-2 transition-colors ${
              reposted ? 'text-emerald-500' : 'hover:text-emerald-500'
            } active:scale-95`}
          >
            <div
              className={`rounded-full p-2 transition-colors ${
                reposted ? 'bg-emerald-500/10' : 'group-hover:bg-emerald-500/10 group-active:bg-emerald-500/20'
              }`}
            >
              <Repeat2 size={18} className="stroke-[1.8]" />
            </div>
            <span className="text-[13px] font-semibold tabular-nums">
              {post.reposts + (reposted ? 1 : 0)}
            </span>
          </button>

          <button
            onClick={handleLike}
            className={`group flex items-center gap-2 transition-colors ${
              liked ? 'text-pink-500' : 'hover:text-pink-500'
            } active:scale-95`}
          >
            <div
              className={`rounded-full p-2 transition-colors ${
                liked ? 'bg-pink-500/10' : 'group-hover:bg-pink-500/10 group-active:bg-pink-500/20'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={liked ? 'liked' : 'unliked'}
                  initial={liked ? { scale: 0.6 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Heart size={18} className="stroke-[1.8]" fill={liked ? 'currentColor' : 'none'} />
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="text-[13px] font-semibold tabular-nums">{likeCount}</span>
          </button>

          <button className="group flex items-center rounded-full p-2 transition-colors hover:bg-sky-500/10 hover:text-sky-500 active:scale-95">
            <Share size={18} className="stroke-[1.8]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;