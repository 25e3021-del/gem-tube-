
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Video, Modality } from '../types';
import VideoCard from '../components/VideoCard';
import { Check, Globe, Share2, MoreVertical } from 'lucide-react';

interface ChannelProps {
  videos: Video[];
  subscribedChannels: string[];
  onToggleSubscribe: (name: string) => void;
}

const Channel: React.FC<ChannelProps> = ({ videos, subscribedChannels, onToggleSubscribe }) => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Videos');
  
  const getChannelData = () => {
    if (id === 'asanix') return { name: "Asanix Labs", sub: "150M", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=asanix", banner: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200", isMe: false };
    if (id === 'lex') return { name: "Aether Interviews", sub: "12M", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=lex", banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", isMe: false };
    if (id === 'me') return { name: "My Node", sub: "10.5K", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=me", banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", isMe: true };
    return { name: "Node Identifier", sub: "0", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=node", banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", isMe: true };
  };

  const channel = getChannelData();
  const isSubscribed = subscribedChannels.includes(channel.name);
  
  // Filter videos for this specific author
  const channelVideos = videos.filter(v => {
    const authorLower = v.author.name.toLowerCase();
    const idLower = id?.toLowerCase() || '';
    if (idLower === 'asanix') return authorLower.includes('asanix');
    if (idLower === 'lex') return authorLower.includes('aether');
    if (idLower === 'me') return v.id.startsWith('u-') || authorLower.includes('my channel') || authorLower.includes('node');
    return authorLower.includes('node');
  });

  // Filter based on active tab
  const getFilteredVideos = () => {
    if (activeTab === 'Videos') return channelVideos.filter(v => v.modality === Modality.VIDEO);
    if (activeTab === 'Reels') return channelVideos.filter(v => v.modality === Modality.REELS);
    if (activeTab === 'Live') return channelVideos.filter(v => v.modality === Modality.LIVE);
    if (activeTab === 'Images') return channelVideos.filter(v => v.modality === Modality.IMAGE);
    return channelVideos;
  };

  const filteredDisplay = getFilteredVideos();

  return (
    <div className="flex-1 min-h-screen bg-[#050505]">
      {/* Banner */}
      <div className="h-48 md:h-64 lg:h-80 w-full relative overflow-hidden">
        <img src={channel.banner} className="w-full h-full object-cover opacity-30 blur-[2px] scale-105" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row items-end gap-6 md:gap-8 mb-16">
          <div className="p-1 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_50px_rgba(0,242,255,0.2)]">
            <img src={channel.avatar} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black object-cover bg-zinc-900" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter font-futuristic">{channel.name}</h1>
              {!channel.isMe && (
                <div className="p-1 bg-cyan-400 rounded-full">
                  <Check className="w-3 h-3 text-black font-black" />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              <span className="text-white">{channel.sub} Subscribers</span>
              <span>{channelVideos.length} Uploads</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 pb-4">
             {channel.isMe ? (
               <button className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-white/10 hover:bg-white/20 text-white border border-white/10">
                 Config Node
               </button>
             ) : (
               <button 
                  onClick={() => onToggleSubscribe(channel.name)}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    isSubscribed ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black hover:bg-cyan-400'
                  }`}
               >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
               </button>
             )}
             <button className="glass p-3 rounded-full border-white/10 hover:bg-white/5 transition-all text-white/50"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Channel Navigation */}
        <div className="flex space-x-6 md:space-x-12 border-b border-white/5 mb-12 overflow-x-auto no-scrollbar whitespace-nowrap">
           {['Videos', 'Reels', 'Live', 'Images', 'Library'].map((tab) => (
             <button 
               key={tab} 
               onClick={() => setActiveTab(tab)}
               className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-white'}`}
             >
               {tab}
               {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.5)]"></div>}
             </button>
           ))}
        </div>

        {/* Grid */}
        {filteredDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredDisplay.map(video => <VideoCard key={video.id} video={video} />)}
          </div>
        ) : (
          <div className="py-20 text-center opacity-30">
            <p className="text-xs font-bold uppercase tracking-[0.5em]">No data discovered in this node.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
