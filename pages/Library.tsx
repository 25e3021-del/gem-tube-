
import React from 'react';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import { Shield, Folder, Star, Clock } from 'lucide-react';

interface LibraryProps {
  videos: Video[];
}

const Library: React.FC<LibraryProps> = ({ videos }) => {
  return (
    <div className="flex-1 min-h-screen bg-[#050505] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 mb-16">
          <div className="p-4 glass rounded-2xl border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-futuristic uppercase tracking-tighter italic">Personal Vault</h1>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Private Data Fragments & Assets</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: <Star className="w-4 h-4" />, label: "Aether Gen Fragments", count: "3" },
              { icon: <Folder className="w-4 h-4" />, label: "Manual Backups", count: "12" },
              { icon: <Clock className="w-4 h-4" />, label: "Temporal Cache", count: "89" },
            ].map((item, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/5 transition-all group">
                <div className="flex items-center space-x-4">
                  <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">{item.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-700">{item.count}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {videos.slice(0, 6).map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
