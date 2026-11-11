import React, { useState } from 'react';
import { apiRequest, type ApiPost } from '../api';
import { useAuth } from '../auth/useAuth';
import IdeaForm from '../components/IdeaForm';
import LivePreview from '../components/LivePreview';
import Toast from '../components/Toast';

const CreateIdeaPage: React.FC = () => {
  const { user, accessToken } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [enableEmotions, setEnableEmotions] = useState(true);
  const [enableComments, setEnableComments] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!user || !accessToken) {
      setPublishError('Sign in before publishing an idea.');
      return;
    }
    if (!title.trim()) {
      setPublishError('Enter a title before publishing.');
      return;
    }

    setPublishError('');
    setIsPublishing(true);
    try {
      await apiRequest<ApiPost>('/posts', {
        method: 'POST',
        accessToken,
        body: {
          title,
          description,
          imageUrl: images[0] ?? null,
          tags,
          category: 'Style inspiration',
          commentsEnabled: enableComments,
        },
      });
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : 'Could not publish the idea.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer">Khám phá</span> / <span className="text-gray-900 font-medium">Tạo ý tưởng thời trang mới</span>
        </div>
        <div className="flex space-x-3">
          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Bản nháp tự động lưu lúc 10:42</span>
          <button className="text-xs text-gray-600 hover:text-blue-600 font-medium">Lịch sử nháp</button>
        </div>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">Aura Mode Atelier Studio</span>
        <h1 className="text-heading mb-3">Đăng tải bản phối & cảm hứng thời trang</h1>
        <p className="text-body max-w-3xl">Chia sẻ phong cách độc bản, bảng hòa sắc và những rung động thẩm mỹ tới cộng đồng mộ điệu Aura Mode.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <IdeaForm
            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            images={images} setImages={setImages}
            selectedColors={selectedColors} setSelectedColors={setSelectedColors}
            tags={tags} setTags={setTags}
            enableEmotions={enableEmotions} setEnableEmotions={setEnableEmotions}
            enableComments={enableComments} setEnableComments={setEnableComments}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
          {publishError && <p role="alert" className="mt-4 text-sm text-red-600">{publishError}</p>}
        </div>
        <div className="lg:col-span-1">
          <LivePreview
            title={title} description={description}
            images={images} selectedColors={selectedColors}
            tags={tags} enableEmotions={enableEmotions}
          />
        </div>
      </div>
      <Toast message="Ý tưởng thời trang đã được xuất bản thành công!" visible={showToast} />
    </main>
  );
};

export default CreateIdeaPage;