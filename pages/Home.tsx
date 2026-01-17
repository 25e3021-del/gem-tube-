
import React, { useState, useEffect } from 'react';
import { Video, Category, Modality } from '../types';
import VideoCard from '../components/VideoCard';
import CategoryBar from '../components/CategoryBar';
import { getAISearchResults } from '../services/gemini';
import { Loader2, Zap, Radio, Globe } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HomeProps {
  searchQuery: string;
  videos: Video[];
}

const Home: React.FC<HomeProps> = ({ searchQuery, videos }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(videos);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const filter = async () => {
      let results = videos;

      // Filter by Modality based on Route
      if (location.pathname === '/bursts') {
        results = results.filter(v => v.modality === Modality.BURST);
      } else if (location.pathname === '/live') {
        results = results.filter(v => v.modality === Modality.LIVE);
      }

      // Filter by Search
      if (searchQuery) {
        setIsSearching(true);
        results = await getAISearchResults(searchQuery, results);
        setIsSearching(false);
      } 
      
      // Filter by Category (only if not searching)
      if (!searchQuery && selectedCategory !== Category.All) {
        results = results.filter(v => v.category === selectedCategory);
      }

      setFilteredVideos(results);
    };

    filter();
  }, [searchQuery, selectedCategory, location.pathname, videos]);

  const getPageHeader = () => {
    if (location.pathname === '/bursts') return { icon: <Zap className="text-cyan-400" />, title: "Burst Feed", sub: "Quick-sync neural fragments" };
    if (location.pathname === '/live') return { icon: <Radio className="text-red-500" />, title: "Live Flux", sub: "Real-time global transmissions" };
    return { icon: <Globe className="text-purple-400" />, title: "The Nexus", sub: "Aggregated universal feed" };
  };

  const header = getPageHeader();

  return (
    <div className="flex-1 min-h-screen bg-[#050505] pb-20">
      <CategoryBar 
        selected={selectedCategory} 
        onSelect={setSelectedCategory} 
      />
      
      <div className="px-8 mt-10 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 glass rounded-2xl border-white/10 shadow-lg">
            {header.icon}
          </div>
          <div>
            <h2 className="text-2xl font-black font-futuristic uppercase tracking-tighter italic">{header.title}</h2>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">{header.sub}</p>
          </div>
        </div>
      </div>

      {isSearching && (
        <div className="mx-8 py-6 flex items-center space-x-3 bg-cyan-500/5 border-b border-cyan-500/10 animate-pulse rounded-xl mb-6">
          <Loader2 className="w-4 h-4 text-cyan-400 animate-spin ml-4" />
          <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase">Mining Neural Data Layers...</span>
        </div>
      )}

      <div className={`grid gap-x-6 gap-y-12 px-8 mt-8 ${location.pathname === '/bursts' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}`}>
        {filteredVideos.map((video) => (
          <div key={video.id} className="animate-in fade-in zoom-in-95 duration-500">
            <VideoCard video={video} />
          </div>
        ))}
        {filteredVideos.length === 0 && !isSearching && (
          <div className="col-span-full text-center py-40">
            <div className="text-zinc-800 text-6xl font-black mb-4 font-futuristic">404_VOID</div>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No active streams found on this frequency.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
