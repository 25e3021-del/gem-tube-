
import React, { useState, useEffect, useCallback } from 'react';
import { Video, Category, Modality } from '../types';
import VideoCard from '../components/VideoCard';
import CategoryBar from '../components/CategoryBar';
import { aiService } from '../services/gemini';
import { Loader2, Zap, Radio, Home as HomeIcon, Image as ImageIcon, Sparkles, RefreshCcw } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HomeProps {
  searchQuery: string;
  videos: Video[];
}

const Home: React.FC<HomeProps> = ({ searchQuery, videos }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isNeuralSyncing, setIsNeuralSyncing] = useState(false);
  const location = useLocation();

  const applyFilters = useCallback(async () => {
    setIsSearching(true);
    let results = [...videos];

    if (location.pathname === '/reels') {
      results = results.filter(v => v.modality === Modality.REELS);
    } else if (location.pathname === '/live') {
      results = results.filter(v => v.modality === Modality.LIVE);
    }

    if (searchQuery) {
      results = await aiService.searchVideos(searchQuery, results);
    } else if (selectedCategory !== Category.All) {
      results = results.filter(v => 
        selectedCategory === Category.Photos 
          ? (v.modality === Modality.IMAGE || v.category === Category.Photos)
          : v.category === selectedCategory
      );
    }

    setFilteredVideos(results);
    setIsSearching(false);
  }, [searchQuery, selectedCategory, location.pathname, videos]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleNeuralRefresh = useCallback(async () => {
    setIsNeuralSyncing(true);
    const historyData = localStorage.getItem('AETHEX_V8_HISTORY');
    const history = historyData ? JSON.parse(historyData) : [];
    
    const recommendations = await aiService.getNeuralFeed(history, videos);
    setFilteredVideos(recommendations);
    setIsNeuralSyncing(false);
  }, [videos]);

  const getPageHeader = () => {
    if (location.pathname === '/reels') return { icon: <Zap className="text-cyan-400" />, title: "Reels", sub: "Quick-fire fragments" };
    if (location.pathname === '/live') return { icon: <Radio className="text-red-500" />, title: "Live", sub: "Real-time sync" };
    if (selectedCategory === Category.Photos) return { icon: <ImageIcon className="text-cyan-400" />, title: "Gallery", sub: "Visual data nodes" };
    return { icon: <HomeIcon className="text-purple-400" />, title: "Home", sub: "Neural cluster primary" };
  };

  const header = getPageHeader();

  return (
    <div className="flex-1 min-h-screen bg-[#050505] pb-20">
      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />
      
      <div className="px-4 md:px-8 mt-10 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 glass rounded-2xl border-white/10 shadow-lg hidden sm:block">
            {header.icon}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black font-futuristic uppercase tracking-tighter italic">{header.title}</h2>
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">{header.sub} • {filteredVideos.length} NODES</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button onClick={applyFilters} className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 glass rounded-xl border-white/5 hover:border-white/20 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
            <RefreshCcw className={`w-3 h-3 ${isSearching ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button onClick={handleNeuralRefresh} disabled={isNeuralSyncing} className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-purple-600 text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/10 hover:brightness-110 transition-all disabled:opacity-50">
            {isNeuralSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            <span>Neural Sync</span>
          </button>
        </div>
      </div>

      {(isSearching || isNeuralSyncing) && (
        <div className="mx-4 md:mx-8 py-4 flex items-center space-x-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl mb-6 px-4 animate-pulse">
          <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
          <span className="text-[9px] font-black text-cyan-400 tracking-[0.4em] uppercase">Optimizing Cluster Feed...</span>
        </div>
      )}

      <div className={`grid gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12 px-4 md:px-8 mt-8 ${
        location.pathname === '/reels' 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      }`}>
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
        {filteredVideos.length === 0 && !isSearching && !isNeuralSyncing && (
          <div className="col-span-full text-center py-40">
            <div className="text-zinc-800 text-4xl md:text-6xl font-black mb-4 font-futuristic">EMPTY SECTOR</div>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">No data discovered in this cluster.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
