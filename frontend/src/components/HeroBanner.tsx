import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative h-64 w-full overflow-hidden bg-gray-200">
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuATOXyuA0HwzDBtxADPsuFv9kWE8lM3aTxGaGWVb9d5YhSQXhRqwgYzGBWJ0KcERcDkDslrD1EACHT8QC8qwONwdCCXaad-kVtkAUSqQQXKE9aHnEMpHctUhiSSZBKUFsVwRatHzYZjPNOTkL4IEkveCQr78o5xatE3K9uHQSpMc1HtkggfO2jPrbKYxHuoPNbcmChDNZ24i4RkL7-6o3AwdguvVAdp-4-IpzWl7jU" 
        alt="Hero Banner" 
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-gray-700 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
        <span>Curated Atelier Collection • Edition No. 28</span>
      </div>
      <div className="absolute bottom-8 left-8 text-white text-lg font-serif italic opacity-90">
        "Thời trang là hơi thở nhẹ của ánh sáng và chất liệu."
      </div>
    </div>
  );
};

export default HeroBanner;