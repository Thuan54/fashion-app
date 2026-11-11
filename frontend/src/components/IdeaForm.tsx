import React, { useState } from 'react';

interface IdeaFormProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  images: string[];
  setImages: (val: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (val: string[]) => void;
  tags: string[];
  setTags: (val: string[]) => void;
  enableEmotions: boolean;
  setEnableEmotions: (val: boolean) => void;
  enableComments: boolean;
  setEnableComments: (val: boolean) => void;
  onPublish: () => void;
  isPublishing?: boolean;
}

const Toggle: React.FC<{ active: boolean; onClick: () => void }> = ({ active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`toggle-switch ${active ? 'toggle-switch-active' : ''}`}
  >
    <span className={`toggle-knob ${active ? 'toggle-knob-active' : ''}`}></span>
  </button>
);

const IdeaForm: React.FC<IdeaFormProps> = ({
  title, setTitle, description, setDescription, images, setImages,
  selectedColors, setSelectedColors, tags, setTags,
  enableEmotions, setEnableEmotions, enableComments, setEnableComments, onPublish, isPublishing = false
}) => {
  const [newTag, setNewTag] = useState('');

  const colors = [
    { name: 'Baby Blue', hex: '#90CDF4' },
    { name: 'Moonlight Yellow', hex: '#EFE680' },
    { name: 'Soft Ivory', hex: '#F0F3FF' },
    { name: 'Lilac Mist', hex: '#CFBFE3' },
  ];

  const toggleColor = (name: string) => {
    if (selectedColors.includes(name)) {
      setSelectedColors(selectedColors.filter(c => c !== name));
    } else {
      setSelectedColors([...selectedColors, name]);
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="form-section">
        <div className="flex justify-between items-center mb-2">
          <label className="text-label">Tiêu đề ý tưởng <span className="text-red-500">*</span></label>
          <span className="text-caption">{title.length}/90 ký tự</span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 90))}
          placeholder="Bản phối dạo phố cuối tuần cùng tông Baby Blue & Vàng Trăng"
          className="input-field"
          required
        />
      </div>

      {/* Images */}
      <div className="form-section">
        <div className="flex justify-between items-center mb-4">
          <label className="text-label">Ảnh Lookbook / Moodboard</label>
          <span className="text-caption">Dán liên kết ảnh (không bắt buộc)</span>
        </div>
        <input
          type="url"
          value={images[0] ?? ''}
          onChange={(event) => setImages(event.target.value ? [event.target.value] : [])}
          placeholder="https://example.com/your-lookbook.jpg"
          className="input-field"
        />
        {images.length > 0 && (
          <div className="relative mt-4 aspect-[3/4] max-w-xs overflow-hidden rounded-xl bg-gray-100">
            <img src={images[0]} alt="Lookbook preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setImages([])}
              className="absolute right-2 top-2 rounded-full bg-white p-2 text-xs font-bold text-gray-600 hover:text-red-500"
              aria-label="Remove image"
            >
              X
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="form-section">
        <div className="flex justify-between items-center mb-2">
          <label className="text-label">Mô tả phong cách & Cảm hứng thiết kế</label>
          <span className="text-caption">Gợi ý: chất liệu, form dáng, dịp mặc</span>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Lấy cảm hứng từ bảng màu dịu ngọt của bình minh ven biển..."
          className="textarea-field"
          rows={5}
        />
      </div>

      {/* Color Palette */}
      <div className="form-section">
        <div className="flex justify-between items-center mb-4">
          <label className="text-label">Bảng màu chủ đạo (Color Palette)</label>
          <span className="text-caption">Chọn 2-4 gam màu đại diện</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`color-chip ${selectedColors.includes(color.name) ? 'color-chip-selected' : ''}`}
            >
              <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: color.hex }}></div>
              <div className="text-left">
                <div className="text-xs font-medium text-gray-900">{color.name}</div>
                <div className="text-[10px] text-gray-500">{color.hex}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="form-section">
        <label className="text-label mb-4">Gắn thẻ xu hướng & phong cách</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span key={tag} className="tag-chip">
              <span>{tag}</span>
              <button onClick={() => removeTag(tag)} className="ml-1 text-blue-500 hover:text-red-500 font-bold">x</button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
            placeholder="#Thêm thẻ..."
            className="input-field py-2"
          />
          <button onClick={addTag} className="btn-outline py-2 px-4">Thêm</button>
        </div>
      </div>

      {/* Settings */}
      <div className="form-section">
        <label className="text-label mb-4">Cài đặt đối thoại & tương tác</label>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-gray-900">Kích hoạt cảm xúc Aura Delight</div>
              <div className="text-caption">Cho phép cộng đồng thả biểu tượng Tim, Wow và Sparkle</div>
            </div>
            <Toggle active={enableEmotions} onClick={() => setEnableEmotions(!enableEmotions)} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-gray-900">Mở bình luận & góp ý phối đồ</div>
              <div className="text-caption">Cho phép thành viên để lại nhận xét và gợi ý phụ kiện</div>
            </div>
            <Toggle active={enableComments} onClick={() => setEnableComments(!enableComments)} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-end">
        <button className="btn-ghost">Lưu bản nháp</button>
        <button className="btn-outline">Xem trước</button>
        <button type="button" onClick={onPublish} className="btn-primary px-8" disabled={isPublishing}>
          {isPublishing ? 'Đang xuất bản…' : 'Xuất bản ý tưởng'}
        </button>
      </div>
    </div>
  );
};

export default IdeaForm;