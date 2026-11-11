import React from 'react';

const ColorOfMonth: React.FC = () => {
  const colors = [
    { name: 'Baby Sky Blue', desc: 'Xanh mây trời nhẹ', hex: '#90CDF4', bg: 'bg-blue-200' },
    { name: 'Moonlight Yellow', desc: 'Vàng ánh trăng thơ', hex: '#EFE680', bg: 'bg-yellow-200' },
    { name: 'Lilac Haze', desc: 'Tím sương chiều mờ', hex: '#CFBFE3', bg: 'bg-purple-200' },
    { name: 'Pure Pearl Ivory', desc: 'Trắng ngọc trai thanh', hex: '#F9F9FF', bg: 'bg-gray-100' },
  ];

  return (
    <div className="sidebar-card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-subheading">Bảng màu của tháng</h3>
        <span className="badge-secondary">Tháng 3</span>
      </div>
      <p className="text-caption mb-4">
        Sắc thái dịu êm tượng trưng cho bình minh trên mây và ánh trăng vàng hoàng hôn. Nhấn vào mã màu để sao chép hex:
      </p>
      <div className="space-y-3">
        {colors.map((color) => (
          <div key={color.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${color.bg} border border-gray-200`}></div>
              <div>
                <span className="font-medium text-gray-900 text-sm block">{color.name}</span>
                <span className="text-caption">{color.desc}</span>
              </div>
            </div>
            <span className="text-xs font-mono text-gray-500">{color.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorOfMonth;