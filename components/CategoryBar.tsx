
import React from 'react';
import { Category } from '../types';

interface CategoryBarProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selected, onSelect }) => {
  const categories = Object.values(Category);

  return (
    <div className="sticky top-14 z-40 bg-[#0f0f0f] py-3 overflow-x-auto no-scrollbar whitespace-nowrap px-4">
      <div className="flex gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selected === cat
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
