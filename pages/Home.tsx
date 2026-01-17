
import React, { useState, useEffect } from 'react';
import { MOCK_VIDEOS } from '../constants';
import { Video, Category } from '../types';
import VideoCard from '../components/VideoCard';
import CategoryBar from '../components/CategoryBar';
import { getAISearchResults } from '../services/gemini';

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
    <div className="flex-1 min-h-screen bg-[#0f0f0f] pb-10">
      <CategoryBar 
        selected={selectedCategory} 
        onSelect={setSelectedCategory} 
      />
      
      {isSearching && (
        <div className="px-4 py-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150" />
          <span className="text-sm text-zinc-400 ml-2">Gemini is searching for the best videos...</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 px-4 mt-2">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
        {filteredVideos.length === 0 && !isSearching && (
          <div className="col-span-full text-center py-20 text-zinc-500">
            No videos found. Try a different search!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
