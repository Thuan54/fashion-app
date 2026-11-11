import React, { useState } from 'react';

const CategoryTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const tabs = ['Tất cả', 'Minimalist Chic', 'Pastel Aesthetic', 'Y2K Dream', 'Vintage Romantic', 'Streetwear Vibe'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;