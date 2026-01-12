
import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onImagePreview: (src: string) => void;
  onReply: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onImagePreview, onReply }) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

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
    <div className="flex w-full overflow-hidden border-b border-zinc-900 bg-black p-4 transition-colors hover:bg-zinc-900/30 cursor-pointer">
      {/* Avatar Section */}
      <div className="flex-shrink-0 mr-3">
        <img
          src={post.author.avatar}
          alt={post.author.username}
          className="h-10 w-10 rounded-full border border-zinc-800 object-cover shadow-sm"
        />
      </div>

      {/* Content Section - Crucial min-w-0 to prevent flex blowout */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-1">
            <span className="truncate text-[15px] font-bold text-zinc-100 hover:underline">
              {post.author.username}
            </span>
            <span className="truncate text-[14px] text-zinc-500">{post.author.handle}</span>
            <span className="flex-shrink-0 text-[14px] text-zinc-500">· {post.timestamp}</span>
          </div>
          <button className="rounded-full p-1.5 text-zinc-600 transition-colors hover:bg-sky-500/10 hover:text-sky-500">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Text Content with proper wrapping */}
        <p className="mt-0.5 break-words text-[15px] leading-relaxed text-zinc-200">
          {post.content}
        </p>

        {/* Media Section - Forced constraints to prevent overflow */}
        {post.image && (
          <motion.div
            whileHover={{ opacity: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onImagePreview(post.image!);
            }}
            className="relative mt-3 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            style={{ maxHeight: '512px' }}
          >
            <img
              src={post.image}
              alt="post media"
              className="block h-auto w-full object-contain"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Interaction Bar */}
        <div className="mt-3 flex max-w-sm justify-between text-zinc-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReply(post);
            }}
            className="group flex items-center gap-2 transition-colors hover:text-sky-500"
          >
            <div className="rounded-full p-2 transition-colors group-hover:bg-sky-500/10">
              <MessageCircle size={18} />
            </div>
            <span className="text-[13px]">{post.replies}</span>
          </button>

          <button
            onClick={handleRepost}
            className={`group flex items-center gap-2 transition-colors ${
              reposted ? 'text-green-500' : 'hover:text-green-500'
            }`}
          >
            <div
              className={`rounded-full p-2 transition-colors ${
                reposted ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'
              }`}
            >
              <Repeat2 size={18} />
            </div>
            <span className="text-[13px]">{post.reposts + (reposted ? 1 : 0)}</span>
          </button>

          <button
            onClick={handleLike}
            className={`group flex items-center gap-2 transition-colors ${
              liked ? 'text-pink-500' : 'hover:text-pink-500'
            }`}
          >
            <div
              className={`rounded-full p-2 transition-colors ${
                liked ? 'bg-pink-500/10' : 'group-hover:bg-pink-500/10'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={liked ? 'liked' : 'unliked'}
                  initial={liked ? { scale: 0.7 } : false}
                  animate={{ scale: 1 }}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="text-[13px]">{likeCount}</span>
          </button>

          <button className="group flex items-center rounded-full p-2 transition-colors hover:bg-sky-500/10 hover:text-sky-500">
            <Share size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
