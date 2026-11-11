import React, { useState } from 'react';

const FloatingActionBar: React.FC = () => {
  const [replyText, setReplyText] = useState('');

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="bg-white rounded-full shadow-2xl border border-gray-100 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 px-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phản hồi nhanh:</span>
          <button className="btn-icon text-gray-400 hover:text-red-500 text-sm">Like</button>
          <button className="btn-icon text-gray-400 hover:text-yellow-500 text-sm">Sparkle</button>
          <button className="btn-icon text-gray-400 hover:text-green-500 text-sm">Smile</button>
        </div>
        
        <div className="h-6 w-px bg-gray-200"></div>
        
        <div className="flex items-center space-x-2 px-2">
          <input 
            type="text" 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Nhập phản hồi..." 
            className="bg-transparent text-sm focus:outline-none w-32" 
          />
          <button className="btn-primary text-sm py-1.5 px-4">
            + Đăng Outfit mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionBar;