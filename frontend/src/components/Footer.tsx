import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">img</div>
            <span className="text-xl font-serif font-bold text-gray-900">Aura Mode</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Quy chuẩn cộng đồng</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Tạp chí thời trang</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Chính sách bảo mật</a>
          </div>
          <p className="text-caption text-gray-400">© 2025. Không gian sáng tạo & đối thoại thời trang thanh lịch.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;