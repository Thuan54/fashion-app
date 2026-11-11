import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';

const ProfileHeader: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const openEditor = () => {
    setDisplayName(profile?.display_name ?? '');
    setUsername(profile?.username ?? '');
    setBio(profile?.bio ?? '');
    setError('');
    setEditing(true);
  };

  const saveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await updateProfile({ display_name: displayName, username, bio });
      setEditing(false);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not update your profile.');
    } finally {
      setSaving(false);
    }
  };

  const colors = [
    { name: 'Baby Sky', hex: '#90CDF4' },
    { name: 'Moonlight', hex: '#FAF089' },
    { name: 'Morning Mist', hex: '#EBF8FF' },
    { name: 'Luminous Silk', hex: '#FDF6B2' },
  ];

  return (
    <div className="relative -mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
      <div className="card-base p-8">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          <div className="relative flex-shrink-0 mb-6 md:mb-0">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG_Xpk8xTuzTbZPsHx5r3-64Jv56IQSklqpDJBvVacj5vo8z08RH_1AcXJJ1nJAvDawKB0blABLrziXU7ewmeOhMkwu1wjXoJ-SHoZqyUHsqv3qZLw2Q-Fbhvq_fw6LvVrWBQBWGIKxkqJ6MHXtFZfyKAYmZFpOG_9hUUcpwn-DHZvOEmJyBnTBzq6pmmeAsIvlY4XipbG5ENPuh9D_SwAmH_bha_dcZuWjqjsWLk" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">Verified</div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-heading">{profile?.display_name ?? 'Hương Mai Vũ'}</h1>
              <span className="badge-secondary">Aura Creator</span>
              <span className="badge-primary">Atelier Stylist</span>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-blue-600 font-medium">@{profile?.username ?? 'huongmai.atelier'}</span>
              <span className="text-gray-400">•</span>
              <span className="text-body">Nhà tạo mẫu độc lập & Người yêu thích thời trang Pastel Chic</span>
            </div>

            <p className="text-body mb-6 max-w-2xl">
              {profile?.bio || 'Lấy cảm hứng từ sắc trời buổi sớm và ánh trăng thanh khiết. Chia sẻ các bản phối may đo, chất liệu tự nhiên lụa tơ tằm dệt thủ công & len cashmere mềm mại.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Bảng màu cá nhân:</span>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <div key={color.name} className="group relative">
                    <div className="w-6 h-6 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: color.hex }}></div>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{color.name}</span>
                  </div>
                ))}
              </div>
              <span className="text-caption italic">Curated for 2025</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {user && (
                <button type="button" className="btn-ghost flex items-center space-x-2" onClick={openEditor}>
                  <span>Edit</span>
                  <span>Chỉnh sửa hồ sơ</span>
                </button>
              )}
              <button className="btn-icon border border-gray-200">Share</button>
              <button className="btn-secondary flex items-center space-x-2">
                <span>Palette</span>
                <span>Tạo bộ sưu tập mới</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
          {[
            { label: 'Followers', value: '12.8k', icon: 'Group' },
            { label: 'Following', value: '340', icon: 'Check' },
            { label: 'Outfits', value: '86', icon: 'Apparel' },
            { label: 'Likes', value: '24.5k', icon: 'Like' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold">{stat.icon}</div>
              <div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={saveProfile}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold text-gray-900">Edit your profile</h2>
            <label className="block text-sm font-medium text-gray-700">
              Display name
              <input
                className="input-field mt-1"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                maxLength={80}
                required
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Username
              <input
                className="input-field mt-1"
                value={username}
                onChange={(event) => setUsername(event.target.value.toLowerCase())}
                pattern="[a-z0-9_]{3,30}"
                maxLength={30}
                required
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Bio
              <textarea
                className="textarea-field mt-1"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                maxLength={280}
                rows={4}
              />
            </label>
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save profile'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;