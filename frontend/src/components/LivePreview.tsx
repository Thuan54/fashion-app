import React from 'react';

interface LivePreviewProps {
  title: string;
  description: string;
  images: string[];
  selectedColors: string[];
  tags: string[];
  enableEmotions: boolean;
}

const LivePreview: React.FC<LivePreviewProps> = ({ title, description, images, selectedColors, tags, enableEmotions }) => {
  const colorsMap: Record<string, string> = {
    'Baby Blue': '#90CDF4',
    'Moonlight Yellow': '#EFE680',
    'Soft Ivory': '#F0F3FF',
    'Lilac Mist': '#CFBFE3',
  };

  return (
    <div className="space-y-6 sticky top-24">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          <span className="text-sm font-medium text-gray-700">Xem trước thời gian thực</span>
        </div>
        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">Giao diện Bảng tin</span>
      </div>

      {/* Preview Card */}
      <div className="card-base p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG_Xpk8xTuzTbZPsHx5r3-64Jv56IQSklqpDJBvVacj5vo8z08RH_1AcXJJ1nJAvDawKB0blABLrziXU7ewmeOhMkwu1wjXoJ-SHoZqyUHsqv3qZLw2Q-Fbhvq_fw6LvVrWBQBWGIKxkqJ6MHXtFZfyKAYmZFpOG_9hUUcpwn-DHZvOEmJyBnTBzq6pmmeAsIvlY4XipbG5ENPuh9D_SwAmH_bha_dcZuWjqjsWLk" alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-sm text-gray-900">Hương Mai Vũ</span>
              <span className="text-blue-500 text-xs">Verified</span>
            </div>
            <span className="text-caption">Nhà tạo mẫu @ Aura Atelier • Vừa xong</span>
          </div>
          <button className="ml-auto btn-icon text-gray-400">...</button>
        </div>

        <div className="mb-4">
          <span className="badge-primary mb-2 inline-block">Runway Edit</span>
          <h3 className="text-subheading mb-2">{title || 'Tiêu đề ý tưởng của bạn...'}</h3>
          <p className="text-body line-clamp-3">{description || 'Mô tả phong cách sẽ hiển thị ở đây...'}</p>
        </div>

        {selectedColors.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2" aria-label="Selected color palette">
            {selectedColors.map((color) => (
              <span key={color} className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-700">
                <span
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: colorsMap[color] ?? '#e5e7eb' }}
                />
                {color}
              </span>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className="rounded-xl overflow-hidden mb-4 aspect-[3/4] bg-gray-100">
            <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <span key={tag} className="text-xs text-blue-600 font-medium">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {enableEmotions && (
              <>
                <button className="text-xs text-gray-500 hover:text-red-500">Like 148</button>
                <button className="text-xs text-gray-500 hover:text-yellow-500">Sparkle 89</button>
              </>
            )}
            <button className="text-xs text-gray-500 hover:text-blue-500">Comment 34</button>
          </div>
          <div className="flex space-x-2">
            <button className="btn-icon text-gray-400 text-xs">Save</button>
            <button className="btn-icon text-gray-400 text-xs">Share</button>
          </div>
        </div>

        {/* Preview Comments */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-gray-900">Đối thoại phong cách (12)</span>
            <button className="text-xs text-blue-600">Xem tất cả</button>
          </div>
          <div className="flex space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3">
              <span className="text-xs font-bold text-gray-900 block">Linh Trần</span>
              <p className="text-xs text-gray-600 mt-1">Màu vàng trăng phối cùng chất len baby blue nhìn mềm mại mà cực kỳ sang trọng luôn!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="text" placeholder="Để lại nhận xét phong cách của bạn..." className="input-field py-2 text-xs" />
            <button className="btn-primary py-2 px-4 text-xs">Send</button>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="card-base p-6 bg-yellow-50 border-yellow-100">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xs">Tip</div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Bí quyết tăng tương tác tại Aura Mode</h4>
            <p className="text-xs text-gray-600">
              Các bài đăng có ảnh rõ nét chất liệu vải dệt cùng bảng màu đồng điệu nhận được hơn 2.4x lượt thả cảm xúc Sparkle và thảo luận chuyên sâu từ các nhà thiết kế.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;