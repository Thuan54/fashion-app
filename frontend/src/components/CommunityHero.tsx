import React from 'react';

const CommunityHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">Aura Runway & Community</span>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
              Cộng đồng cảm hứng thời trang <span className="italic text-blue-600">Aura Mode</span>
            </h1>
            <p className="text-body max-w-2xl">
              Nơi hội tụ những bản phối duy mỹ, đối thoại sáng tạo và bảng màu ánh trăng - mây trời thanh lịch.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="flex -space-x-2">
              {['MA', 'LD', 'HN'].map((initials, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-700">
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">+18k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHero;