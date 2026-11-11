import React from 'react';

const CommunityDialogue: React.FC = () => {
  const comments = [
    {
      initials: 'LH',
      name: 'Lan Hương',
      time: '1 giờ trước',
      text: '"Set đầm dạ tiệc satin phối Mary Jane đẹp ngỡ ngàng luôn Mai ơi! Chờ clip hướng dẫn chọn lụa tơ."',
    },
    {
      initials: 'QT',
      name: 'Quỳnh Trang Designer',
      time: '5 giờ trước',
      text: '"Tông baby blue mix moonlight yellow thật sự thanh thoát, chuẩn tinh thần Aura Mode!"',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24">
      <div className="card-base p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="text-2xl">Forum</div>
          <h2 className="text-subheading">Đối thoại Atelier</h2>
        </div>

        <div className="space-y-6 mb-8">
          {comments.map((comment, index) => (
            <div key={index} className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                {comment.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{comment.name}</span>
                  <span className="text-caption">{comment.time}</span>
                </div>
                <p className="text-body italic">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-3 pt-6 border-t border-gray-100">
          <input type="text" placeholder="Phản hồi nhanh..." className="input-text flex-1" />
          <button className="btn-icon text-gray-400 hover:text-red-500">Like</button>
          <button className="btn-icon text-gray-400 hover:text-yellow-500">Inspire</button>
          <button className="btn-icon text-gray-400 hover:text-green-500">Smile</button>
          <button className="btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDialogue;