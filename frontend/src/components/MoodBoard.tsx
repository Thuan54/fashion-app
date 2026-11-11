import React from 'react';

const MoodBoard: React.FC = () => {
  const images = [
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArMiF0D8ZrtSSeq0WUJbF3MjPt_oqa6xXiWPn5b2VuuVWadelT2B0mLGncgbNaairTViWN66yTcazI0_I4Eh_T7YL-byKpNhGCxoG9kKqqBlRwaJj3oQoN0VOZ9Mr5nHfcZHdX-y4kGmMAHPui9d_ad2fc4zesMugtye1yW83eoI0epNs8cm2rLgdgneHMQsQ7Y7kk3RpdDoFFs-AokkJ_seIQrWNjQyAD76shWBo', caption: 'Mẫu dệt Lụa Khói' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwEpWQkBVVAvl6ADwc3wHyGuRYAIpHNeSXBmdIcnTLj0uYNrdIE7y1mGVqT6m1EQ9q751ZMEvC_PgUJu5-VVlcey55OtlhFmASu2hsNeOzyW0ZC0gkyeGUBPsKBMXWHfwezvub_prq8H4IAXrdbzu9kaBBhLzlOBhkSan9b9DZxflrYb6AM_z5QJtRWz5SCfNGzTLFCbjwh0N0o9jJuFq8jPwNEN8Dtsrtrj73QJc', caption: 'Trăng Khuyết' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS25O1Kbu6claK_LvmxyUbkqZzvwi1jVDx30dwM2quFSR9WWf1SOfTuiYnTs9y-CiO5ToXv6ok410cazv3ImWpo-67Dyg_8C-m2RoBNKS8yYvbEnuJDx9GYcQ8YrVXnUUyiuAcUIuvEHpic2gue8wA1wKbMfQJnjnfaxxm2MwjH-FJQ-myH75LybDmN1jni39wKhERX57PQJ6_wcpzHqQdFZuU0G4B37NU4sPIVoM', caption: 'Xà Cừ Ánh Trăng' },
    { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_BtvkhBchYdcA7YqE1zC_jGnqFIW5HJQvsAFt9JBKj4gEQD5BMIJ-Vshlf-T5sy3_c0X4Xn1Ug94uB0bu4FD07OyOl7W9_0Cd2zwxkjW5HbV7_jGN2nTIMRCYVxtAAwv74VUJ-1ulnImYZWooCQR32fzXg20Hj7ZKkAGNVFGORHq4c5LkJfMGs8URa9TAaueLYQjW1xk8E81MG-r1hX0-UtkRhVolXOkGHwDQWSQ', caption: 'Kiến Trúc Tối Giản' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="card-base p-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="text-2xl">Brush</div>
          <h2 className="text-subheading">Bảng tâm trạng tháng này</h2>
        </div>
        <p className="text-caption mb-6">Tháng 03 / 2025 • Cảm hứng chủ đạo: Ánh Trăng Cung Chiều & Trời Xanh Mây Trắng.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodBoard;