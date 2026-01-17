
import React, { useState, useEffect } from 'react';
import { MOCK_VIDEOS } from '../constants';
import { Video, Category } from '../types';
import VideoCard from '../components/VideoCard';
import CategoryBar from '../components/CategoryBar';
import { getAISearchResults } from '../services/gemini';
import { Loader2 } from 'lucide-react';

interface HomeProps {
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const filter = async () => {
      let results = MOCK_VIDEOS;

      if (searchQuery) {
        setIsSearching(true);
        results = await getAISearchResults(searchQuery, MOCK_VIDEOS);
        setIsSearching(false);
      } else if (selectedCategory !== Category.All) {
        results = MOCK_VIDEOS.filter(v => v.category === selectedCategory);
      }

      setFilteredVideos(results);
    };

    filter();
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex-1 min-h-screen bg-[#050505] pb-20">
      <CategoryBar 
        selected={selectedCategory} 
        onSelect={setSelectedCategory} 
      />
      
      {isSearching && (
        <div className="px-8 py-6 flex items-center space-x-3 bg-cyan-500/5 border-b border-cyan-500/10 animate-pulse">
          <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
          <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase">Mining Neural Data Layers...</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12 px-8 mt-8">
        {filteredVideos.map((video) => (
          <div key={video.id} className="animate-in fade-in zoom-in-95 duration-500">
            <VideoCard video={video} />
          </div>
        ))}
        {filteredVideos.length === 0 && !isSearching && (
          <div className="col-span-full text-center py-40">
            <div className="text-zinc-800 text-6xl font-black mb-4 font-futuristic">404_VOID</div>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No data nodes found for this frequency.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
