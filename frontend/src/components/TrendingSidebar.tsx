import React from 'react';

const TrendingSidebar: React.FC = () => {
  const trends = [
    { tag: '#BabyBlueLook', count: '14.2k lượt thảo luận', change: '+28%', color: 'bg-blue-100 text-blue-700' },
    { tag: '#MoonlightGlow', count: '9.8k bài phối dạ tiệc', change: '+19%', color: 'bg-yellow-100 text-yellow-700' },
    { tag: '#CoquettePastel', count: '7.1k tác phẩm cảm hứng', change: '+12%', color: 'bg-pink-100 text-pink-700' },
    { tag: '#SilkAndWool', count: '5.4k phong cách tối giản', change: '+8%', color: 'bg-gray-100 text-gray-700' },
  ];

  return (
    <div className="sidebar-card">
      <h3 className="text-subheading mb-4">Xu hướng thịnh hành</h3>
      <span className="text-caption block mb-4">Tuần này</span>
      <div className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.tag} className="flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-900 text-sm block">{trend.tag}</span>
              <span className="text-caption">{trend.count}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${trend.color}`}>
              {trend.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;