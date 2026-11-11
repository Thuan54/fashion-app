import React, { useState } from 'react';

const FilterBar: React.FC = () => {
  const [season, setSeason] = useState('Tất cả');
  const [color, setColor] = useState('');
  const [sort, setSort] = useState('Mới cập nhật');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="card-base p-4 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <input type="text" placeholder="Tìm bản phối, đầm dạ tiệc, áo len cashmere..." className="input-search" />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Mùa:</span>
            <select value={season} onChange={(e) => setSeason(e.target.value)} className="select-input">
              <option>Tất cả</option>
              <option>Xuân Hè '25</option>
              <option>Thu Đông</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Tông sắc:</span>
            <div className="flex space-x-2">
              {['Baby Blue', 'Moonlight Yellow', 'Soft Lilac'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c === color ? '' : c)}
                  className={color === c ? 'tag-active' : 'tag-chip'}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sắp xếp:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select-input">
              <option>Mới cập nhật</option>
              <option>Phổ biến nhất</option>
              <option>Cũ nhất</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;