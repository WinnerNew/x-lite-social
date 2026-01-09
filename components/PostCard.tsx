
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

  const ActionButton = ({ icon: Icon, label, count, activeColor, active, onClick, hoverBg }: any) => (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 group transition-colors ${active ? activeColor : 'text-gray-500 hover:' + activeColor}`}
    >
      <div className={`p-2 rounded-full transition-colors group-hover:${hoverBg} ${active ? hoverBg : ''}`}>
        <Icon className={`w-[18px] h-[18px] ${active && Icon === Heart ? 'fill-current' : ''}`} />
      </div>
      {count !== undefined && <span className="text-[13px]">{count}</span>}
    </button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="border-b border-gray-800 p-4 flex gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer active:bg-white/[0.04]"
    >
      <img 
        src={post.author.avatar} 
        alt={post.author.username} 
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-zinc-900" 
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1 min-w-0">
            <span className="font-bold truncate text-[15px] text-white hover:underline">{post.author.username}</span>
            <span className="text-gray-500 truncate text-[14px]">{post.author.handle}</span>
            <span className="text-gray-500 text-[14px]">· {post.timestamp}</span>
          </div>
          <button className="text-gray-500 p-1 hover:text-sky-500 rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[15px] leading-relaxed mb-3 whitespace-pre-wrap text-white/90">{post.content}</p>

        {post.image && (
          <motion.div 
            layoutId={`post-img-${post.image}`}
            onClick={(e) => { e.stopPropagation(); onImagePreview(post.image!); }}
            className="rounded-2xl overflow-hidden border border-gray-800 mb-3 bg-zinc-900"
          >
            <img src={post.image} alt="post" className="w-full h-auto object-cover max-h-80 hover:opacity-90 transition-opacity" />
          </motion.div>
        )}

        <div className="flex justify-between text-gray-500 max-w-sm -ml-2">
          <ActionButton 
            icon={MessageCircle} 
            count={post.replies} 
            activeColor="text-sky-500" 
            hoverBg="bg-sky-500/10" 
            onClick={(e: any) => { e.stopPropagation(); onReply(post); }}
          />
          <ActionButton 
            icon={Repeat2} 
            count={post.reposts + (reposted ? 1 : 0)} 
            active={reposted} 
            activeColor="text-green-500" 
            hoverBg="bg-green-500/10" 
            onClick={handleRepost}
          />
          <ActionButton 
            icon={Heart} 
            count={likeCount} 
            active={liked} 
            activeColor="text-pink-600" 
            hoverBg="bg-pink-600/10" 
            onClick={handleLike}
          />
          <ActionButton 
            icon={Share} 
            activeColor="text-sky-500" 
            hoverBg="bg-sky-500/10" 
            onClick={(e: any) => e.stopPropagation()}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
