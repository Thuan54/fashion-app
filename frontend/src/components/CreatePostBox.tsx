import React, { useState } from 'react';
import { apiRequest, type ApiPost } from '../api';
import { useAuth } from '../auth/useAuth';

interface CreatePostBoxProps {
  onCreated: () => Promise<void>;
}

const CreatePostBox: React.FC<CreatePostBoxProps> = ({ onCreated }) => {
  const { user, accessToken } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !accessToken) {
      setError('Sign in before publishing a post.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await apiRequest<ApiPost>('/posts', {
        method: 'POST',
        accessToken,
        body: {
          title,
          description,
          imageUrl: imageUrl.trim() || null,
          tags: tagsText.split(',').map((tag) => tag.trim()).filter(Boolean),
        },
      });
      setTitle('');
      setDescription('');
      setImageUrl('');
      setTagsText('');
      await onCreated();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not publish the post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <form className="card-base p-6" onSubmit={createPost}>
        <div className="flex space-x-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
            {user ? (user.email?.slice(0, 1).toUpperCase() ?? 'A') : 'A'}
          </div>
          <div className="flex-1 space-y-3">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Tiêu đề bài đăng"
              className="input-field"
              maxLength={90}
              required
              disabled={!user}
            />
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Bạn đang có ý tưởng phối đồ hay phong cách mới nào cho hôm nay?"
              className="textarea-post"
              rows={3}
              maxLength={3000}
              required
              disabled={!user}
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="Link ảnh (không bắt buộc)"
                className="input-field"
                disabled={!user}
              />
              <input
                value={tagsText}
                onChange={(event) => setTagsText(event.target.value)}
                placeholder="Thẻ, phân cách bằng dấu phẩy"
                className="input-field"
                disabled={!user}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-caption">
                {user ? 'Bài đăng sẽ xuất hiện trong cộng đồng.' : 'Sign in to share with the community.'}
              </p>
              <button type="submit" className="btn-primary text-sm py-2" disabled={!user || submitting}>
                {submitting ? 'Đang đăng…' : 'Chia sẻ ngay'}
              </button>
            </div>
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostBox;
