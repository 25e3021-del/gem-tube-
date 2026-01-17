
import React from 'react';
import { useParams } from 'react-router-dom';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import { Check, Shield, Globe, Terminal } from 'lucide-react';

interface ChannelProps {
  videos: Video[];
}

const Channel: React.FC<ChannelProps> = ({ videos }) => {
  const { id } = useParams<{ id: string }>();
  
  const getChannelData = () => {
    if (id === 'asanix') return { name: "Asanix_Developers", sub: "150M", avatar: "https://i.pravatar.cc/150?u=asanix", banner: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200" };
    if (id === 'lex') return { name: "Aether_Interviews", sub: "12M", avatar: "https://i.pravatar.cc/150?u=lex", banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" };
    return { name: "Unknown_Node", sub: "0", avatar: "https://i.pravatar.cc/150?u=none", banner: "" };
  };

  const channel = getChannelData();
  const channelVideos = videos.filter(v => v.author.name.toLowerCase().includes(id || ''));

  return (
    <div className="flex-1 min-h-screen bg-[#050505]">
      {/* Banner */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden">
        <img src={channel.banner} className="w-full h-full object-cover opacity-40 blur-sm scale-105" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-20 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row items-end gap-8 mb-16">
          <div className="p-1 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-2xl">
            <img src={channel.avatar} className="w-40 h-40 rounded-full border-4 border-black" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-4xl font-black font-futuristic uppercase italic tracking-tighter">{channel.name}</h1>
              <div className="p-1 bg-cyan-400 rounded-full">
                <Check className="w-3 h-3 text-black font-black" />
              </div>
            </div>
            <div className="flex items-center space-x-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              <span>{channel.sub} Subscribers</span>
              <span>1.2K Signals Transmitted</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 pb-4">
             <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all">Subscribe</button>
             <button className="glass p-3 rounded-full border-white/10 hover:bg-white/5 transition-all text-white/50"><Globe className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Channel Navigation */}
        <div className="flex space-x-12 border-b border-white/5 mb-12">
           {['Signals', 'Bursts', 'Fluxes', 'Data Vault'].map((tab, idx) => (
             <button key={idx} className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${idx === 0 ? 'text-white' : 'text-zinc-600 hover:text-white'}`}>
               {tab}
               {idx === 0 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.5)]"></div>}
             </button>
           ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
           {channelVideos.length > 0 ? (
             channelVideos.map(video => <VideoCard key={video.id} video={video} />)
           ) : (
             videos.slice(0, 5).map(video => <VideoCard key={video.id} video={video} />)
           )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
