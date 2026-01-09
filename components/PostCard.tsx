
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
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1);
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReposted(!reposted);
  };

  return (
    <div className="border-b border-zinc-800 p-4 flex gap-3 hover:bg-zinc-900/40 transition-colors cursor-pointer w-full overflow-hidden">
      <div className="flex-shrink-0">
        <img 
          src={post.author.avatar} 
          alt={post.author.username} 
          className="w-10 h-10 rounded-full object-cover bg-zinc-900 shadow-sm border border-zinc-800" 
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-1 min-w-0">
            <span className="font-bold text-zinc-100 truncate hover:underline text-[15px]">{post.author.username}</span>
            <span className="text-zinc-500 truncate text-[14px]">{post.author.handle}</span>
            <span className="text-zinc-500 text-[14px] flex-shrink-0">· {post.timestamp}</span>
          </div>
          <button className="text-zinc-500 hover:text-sky-500 hover:bg-sky-500/10 p-1.5 rounded-full transition-all">
            <MoreHorizontal size={16} />
          </button>
        </div>

        <p className="text-[15px] leading-normal text-zinc-200 mt-0.5 whitespace-pre-wrap break-words">{post.content}</p>

        {post.image && (
          <motion.div 
            whileHover={{ opacity: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onImagePreview(post.image!); }}
            className="mt-3 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 max-h-96 w-full"
          >
            <img 
              src={post.image} 
              alt="post" 
              className="w-full h-full object-cover max-h-96" 
            />
          </motion.div>
        )}

        <div className="flex justify-between text-zinc-500 mt-3 -ml-2 max-w-[320px]">
          <button 
            onClick={(e) => { e.stopPropagation(); onReply(post); }}
            className="flex items-center gap-1 group transition-colors hover:text-sky-500"
          >
            <div className="p-2 rounded-full group-hover:bg-sky-500/10 transition-colors">
              <MessageCircle size={18} />
            </div>
            <span className="text-[13px] font-medium">{post.replies}</span>
          </button>
          
          <button 
            onClick={handleRepost}
            className={`flex items-center gap-1 group transition-colors ${reposted ? 'text-green-500' : 'hover:text-green-500'}`}
          >
            <div className={`p-2 rounded-full transition-colors ${reposted ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'}`}>
              <Repeat2 size={18} />
            </div>
            <span className="text-[13px] font-medium">{post.reposts + (reposted ? 1 : 0)}</span>
          </button>

          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 group transition-colors ${liked ? 'text-pink-500' : 'hover:text-pink-500'}`}
          >
            <div className={`p-2 rounded-full transition-colors ${liked ? 'bg-pink-500/10' : 'group-hover:bg-pink-500/10'}`}>
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
            <span className="text-[13px] font-medium">{likeCount}</span>
          </button>

          <button className="flex items-center gap-1 group hover:text-sky-500">
            <div className="p-2 rounded-full group-hover:bg-sky-500/10 transition-colors">
              <Share size={18} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
