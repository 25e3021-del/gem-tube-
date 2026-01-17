
import React from 'react';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import { Heart, Zap } from 'lucide-react';

interface LikedProps {
  videos: Video[];
}

const Liked: React.FC<LikedProps> = ({ videos }) => {
  return (
    <div className="flex-1 min-h-screen bg-[#050505] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 mb-16">
          <div className="p-4 glass rounded-2xl border-purple-500/20 shadow-[0_0_20px_rgba(112,0,255,0.1)]">
            <Heart className="w-8 h-8 text-purple-400 fill-purple-400/20" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-futuristic uppercase tracking-tighter italic italic">Liked Videos</h1>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Videos you have liked</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
          {videos.map(video => (
            <div key={video.id} className="relative">
              <div className="absolute top-2 right-2 z-10 p-1.5 glass rounded-full text-purple-400">
                <Zap className="w-3 h-3 fill-current" />
              </div>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
        
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-center opacity-30">
            <Heart className="w-16 h-16 mb-6 text-zinc-800" />
            <p className="text-xs font-bold uppercase tracking-[0.5em]">No liked videos yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Liked;
