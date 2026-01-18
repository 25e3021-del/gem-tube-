
import React from 'react';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import { Users } from 'lucide-react';

interface SubscriptionsProps {
  videos: Video[];
  subscribedChannels: string[];
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ videos, subscribedChannels }) => {
  const subbedVideos = videos.filter(v => subscribedChannels.includes(v.author.name));

  return (
    <div className="flex-1 min-h-screen bg-[#050505] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 mb-16">
          <div className="p-4 glass rounded-2xl border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <Users className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-futuristic uppercase tracking-tighter italic">Subscriptions</h1>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Updates from your active neural links</p>
          </div>
        </div>

        {subbedVideos.length === 0 ? (
          <div className="py-40 text-center flex flex-col items-center opacity-30">
            <Users className="w-16 h-16 mb-6 text-zinc-800" />
            <p className="text-xs font-black uppercase tracking-[0.5em]">No subscriptions discovered.</p>
            <p className="text-[10px] mt-4 max-w-xs text-zinc-600">Start following channels to see their latest broadcast fragments here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
            {subbedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
