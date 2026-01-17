
import React, { useState, useEffect } from 'react';
import { Video, Category, Modality } from '../types';
import VideoCard from '../components/VideoCard';
import CategoryBar from '../components/CategoryBar';
import { getAISearchResults } from '../services/gemini';
import { Loader2, Zap, Radio, Home as HomeIcon, Image as ImageIcon } from 'lucide-react';
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
      let results = [...videos];

      if (location.pathname === '/reels') {
        results = results.filter(v => v.modality === Modality.REELS);
      } else if (location.pathname === '/live') {
        results = results.filter(v => v.modality === Modality.LIVE);
      }

      if (searchQuery) {
        setIsSearching(true);
        results = await getAISearchResults(searchQuery, results);
        setIsSearching(false);
      } 
      
      if (!searchQuery && selectedCategory !== Category.All) {
        // If "Photos" category selected, only show images
        if (selectedCategory === Category.Photos) {
           results = results.filter(v => v.modality === Modality.IMAGE || v.category === Category.Photos);
        } else {
           results = results.filter(v => v.category === selectedCategory);
        }
      }

      setFilteredVideos(results);
    };

    filter();
  }, [searchQuery, selectedCategory, location.pathname, videos]);

  const getPageHeader = () => {
    if (location.pathname === '/reels') return { icon: <Zap className="text-cyan-400" />, title: "Reels", sub: "Watch quick videos" };
    if (location.pathname === '/live') return { icon: <Radio className="text-red-500" />, title: "Live", sub: "Watch live streams" };
    if (selectedCategory === Category.Photos) return { icon: <ImageIcon className="text-cyan-400" />, title: "Gallery", sub: "Visual data nodes" };
    return { icon: <HomeIcon className="text-purple-400" />, title: "Home", sub: "Neural feed initialized" };
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
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">{header.sub} ({filteredVideos.length} items)</p>
          </div>
        </div>
      </div>

      {isSearching && (
        <div className="mx-8 py-6 flex items-center space-x-3 bg-cyan-500/5 border-b border-cyan-500/10 animate-pulse rounded-xl mb-6">
          <Loader2 className="w-4 h-4 text-cyan-400 animate-spin ml-4" />
          <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase">Searching...</span>
        </div>
      )}

      <div className={`grid gap-x-6 gap-y-12 px-8 mt-8 ${
        location.pathname === '/reels' 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
          : selectedCategory === Category.Photos
            ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      }`}>
        {filteredVideos.map((video) => (
          <div key={video.id} className="animate-in fade-in zoom-in-95 duration-500">
            <VideoCard video={video} />
          </div>
        ))}
        {filteredVideos.length === 0 && !isSearching && (
          <div className="col-span-full text-center py-40">
            <div className="text-zinc-800 text-6xl font-black mb-4 font-futuristic">EMPTY DATA</div>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No fragments found in this cluster.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
