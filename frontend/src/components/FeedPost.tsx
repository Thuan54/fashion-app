import React, { useState } from 'react';

interface FeedPostProps {
  authorInitials: string;
  authorName: string;
  authorBadge?: string;
  time: string;
  category: string;
  title: string;
  description: string;
  tags?: string[];
  image: string;
  likes: string;
  inspires: string;
  stars: string;
  sparkles: string;
  comments: string;
  commentsList?: { initials: string; name: string; time: string; text: string }[];
  outfitBreakdown?: { item: string; brand: string }[];
  isLiked?: boolean;
  commentsEnabled?: boolean;
  onToggleLike?: (postId: string, liked: boolean) => Promise<void>;
  onComment?: (postId: string, text: string) => Promise<void>;
  postId?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  authorInitials, authorName, authorBadge, time, category, title, description, tags, image,
  likes, inspires, stars, sparkles, comments, commentsList, outfitBreakdown,
  isLiked, commentsEnabled = true, onToggleLike, onComment, postId
}) => {
  const [liked, setLiked] = useState(isLiked ?? false);
  const [replyText, setReplyText] = useState('');
  const [interactionError, setInteractionError] = useState('');

  const toggleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setInteractionError('');
    try {
      if (postId && onToggleLike) await onToggleLike(postId, nextLiked);
    } catch (error) {
      setLiked(!nextLiked);
      setInteractionError(error instanceof Error ? error.message : 'Could not update your like.');
    }
  };

  const sendComment = async () => {
    if (!postId || !onComment || !replyText.trim()) return;
    setInteractionError('');
    try {
      await onComment(postId, replyText.trim());
      setReplyText('');
    } catch (error) {
      setInteractionError(error instanceof Error ? error.message : 'Could not send your comment.');
    }
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
            {authorInitials}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">{authorName}</span>
              {authorBadge && <span className="badge-outline">{authorBadge}</span>}
            </div>
            <span className="text-caption">{time} · {category}</span>
          </div>
        </div>
        <button type="button" className="btn-icon text-gray-400" aria-label="More post options">More</button>
      </div>

      {/* Content */}
      <h2 className="text-subheading mb-2">{title}</h2>
      <p className="text-body mb-4">{description}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
      )}

      {outfitBreakdown && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="text-sm font-bold text-gray-700 mb-3">Chi tiết trang phục (Outfit Breakdown):</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {outfitBreakdown.map((item, i) => (
              <div key={i} className="text-xs">
                <span className="font-medium text-gray-900">{item.item}</span>
                <span className="text-gray-500 block">{item.brand}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image */}
      <div className="rounded-xl overflow-hidden mb-4 bg-gray-100 aspect-[4/3]">
        {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleLike}
            aria-pressed={liked}
            className={`flex items-center space-x-1 text-sm transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <span>{liked ? 'Liked' : 'Like'}</span>
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-yellow-500">
            <span>Inspire</span>
            <span>{inspires}</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500">
            <span>Star</span>
            <span>{stars}</span>
          </button>
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-500">
            <span>Sparkle</span>
            <span>{sparkles}</span>
          </button>
          <button type="button" className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-500">
            <span>{comments} bình luận</span>
          </button>
        </div>
        <button type="button" className="btn-icon text-gray-400">Share</button>
      </div>

      {interactionError && <p role="alert" className="text-sm text-red-600">{interactionError}</p>}

      {/* Comments */}
      {commentsList && commentsList.length > 0 && (
        <div className="space-y-4 mt-4 pt-4 border-t border-gray-100">
          {commentsList.map((comment, i) => (
            <div key={i} className="flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs flex-shrink-0">
                {comment.initials}
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">{comment.name}</span>
                  <span className="text-caption">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {commentsEnabled && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
              A
            </div>
            <input
              type="text"
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && onComment) {
                  event.preventDefault();
                  void sendComment();
                }
              }}
              placeholder="Thêm bình luận của bạn..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={2000}
            />
            <button type="button" className="btn-primary text-sm py-2 px-4" onClick={() => void sendComment()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPost;