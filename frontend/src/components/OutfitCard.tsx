import React, { useState } from 'react';

interface OutfitCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  likes: string;
  inspires: string;
  comments?: string;
  tags?: string[];
  extraInfo?: string;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ image, category, title, description, likes, inspires, comments, tags, extraInfo }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="card-base card-hover flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700">{category}</span>
          <span className="bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">#OOTD</span>
        </div>
        <button 
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-blue-600 transition-colors"
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-subheading mb-2">{title}</h3>
        <p className="text-body mb-4 flex-1">{description}</p>
        
        {extraInfo && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs text-gray-600 border-l-2 border-blue-400">
            {extraInfo}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLiked(!liked)}
              className={`flex items-center space-x-1 text-sm transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <span>{liked ? 'Liked' : 'Like'}</span>
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors">
              <span>Inspire</span>
              <span>{inspires}</span>
            </button>
            {comments && (
              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-500 transition-colors">
                <span>Comment</span>
                <span>{comments}</span>
              </button>
            )}
          </div>
          <button className="btn-text text-xs">More</button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;