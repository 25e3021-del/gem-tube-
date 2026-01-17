
import React from 'react';
import { Category } from '../types';

interface CategoryBarProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selected, onSelect }) => {
  const categories = Object.values(Category);

  return (
    <div className="sticky top-16 z-40 bg-black/40 backdrop-blur-md py-4 overflow-x-auto no-scrollbar whitespace-nowrap px-6 border-b border-white/5">
      <div className="flex gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
              selected === cat
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                : 'bg-white/5 text-zinc-500 border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-white/10'
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
