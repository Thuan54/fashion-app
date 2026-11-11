import React from 'react';

const CapsuleWardrobe: React.FC = () => {
  const stats = [
    { label: 'Hài hòa sắc thái', value: 100, color: 'bg-blue-500' },
    { label: 'Áo & Blazer may đo', value: 40, color: 'bg-blue-400' },
    { label: 'Đầm lụa & Satin dạ tiệc', value: 30, color: 'bg-yellow-400' },
    { label: 'Quần suông linen & sợi tự nhiên', value: 20, color: 'bg-green-400' },
    { label: 'Phụ kiện ngọc trai & khăn lụa', value: 10, color: 'bg-purple-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="card-base p-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">Chart</div>
          <div>
            <h2 className="text-subheading">Tủ đồ thông minh</h2>
            <p className="text-caption">Tỷ lệ Capsule</p>
          </div>
        </div>

        <p className="text-body mb-8">
          Phân bổ trang phục dựa trên 86 bản phối đã xuất bản trong mùa này của Hương Mai:
        </p>

        <div className="space-y-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 font-medium">{stat.label}</span>
                <span className="text-gray-500">{stat.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${stat.color}`} style={{ width: `${stat.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600 font-bold text-sm mt-0.5">Tips</div>
            <p className="text-sm text-gray-700 italic">
              Gợi ý từ cộng đồng Aura: "Thêm 1 mẫu chân váy tulle màu tím lavender để tủ đồ chuyển tiếp mượt mà sang đầu hè."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleWardrobe;