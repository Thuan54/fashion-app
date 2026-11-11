import React, { useState } from 'react';

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Ý tưởng của tôi');
  const [viewMode, setViewMode] = useState('Grid');

  const tabs = [
    { name: 'Ý tưởng của tôi', count: 86 },
    { name: 'Tủ đồ đã lưu / Wishlist', count: 42 },
    { name: 'Bộ sưu tập cá nhân', count: 8 },
    { name: 'Nhật ký & Tương tác', count: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.name
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span>{tab.name}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.name ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex space-x-2 bg-white border border-gray-200 rounded-full p-1">
          <button
            onClick={() => setViewMode('Grid')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              viewMode === 'Grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('List')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              viewMode === 'List' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
            }`}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;