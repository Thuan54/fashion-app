import React, { useState } from 'react';

const FeaturedCreators: React.FC = () => {
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const creators = [
    { initials: 'MA', name: 'Minh Anh', role: 'Atelier Couture' },
    { initials: 'LD', name: 'Linh Đan', role: 'Editorial Stylist' },
    { initials: 'QV', name: 'Quang Vũ', role: 'Tailoring Curator' },
  ];

  const toggleFollow = (name: string) => {
    setFollowing(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="sidebar-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-subheading">Nhà sáng tạo nổi bật</h3>
        <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Xem tất cả</button>
      </div>
      <div className="space-y-4">
        {creators.map((creator) => (
          <div key={creator.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                {creator.initials}
              </div>
              <div>
                <span className="font-bold text-gray-900 text-sm block">{creator.name}</span>
                <span className="text-caption">{creator.role}</span>
              </div>
            </div>
            <button 
              onClick={() => toggleFollow(creator.name)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                following[creator.name] 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {following[creator.name] ? 'Đang theo dõi' : 'Theo dõi'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCreators;