
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Video, Modality } from '../types';
import VideoCard from '../components/VideoCard';
import { Check, Share2, Users } from 'lucide-react';

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
    
    // Default or Current User
    const userDataStr = localStorage.getItem('AETHEX_V8_USER');
    const user = userDataStr ? JSON.parse(userDataStr) : null;
    
    return { 
      name: user?.name || "Neural Node", 
      sub: user?.subscribers || "10.5K", 
      avatar: user?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=node", 
      banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", 
      isMe: true 
    };
  };

  const channel = getChannelData();
  const isSubscribed = subscribedChannels.includes(channel.name);
  
  const channelVideos = videos.filter(v => {
    const authorLower = v.author.name.toLowerCase();
    const idLower = id?.toLowerCase() || '';
    if (idLower === 'asanix') return authorLower.includes('asanix');
    if (idLower === 'lex') return authorLower.includes('aether');
    return v.id.startsWith('u-') || authorLower.includes(channel.name.toLowerCase());
  });

  const mockSubscribers = [
    { name: "PixelPilot", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=PixelPilot" },
    { name: "NeuralNomad", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=NeuralNomad" },
    { name: "DataGhost", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DataGhost" },
    { name: "FluxEngineer", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=FluxEngineer" },
    { name: "CyberScribe", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CyberScribe" }
  ];

  const getFilteredVideos = () => {
    if (activeTab === 'Videos') return channelVideos.filter(v => v.modality === Modality.VIDEO);
    if (activeTab === 'Reels') return channelVideos.filter(v => v.modality === Modality.REELS);
    return channelVideos;
  };

  const filteredDisplay = getFilteredVideos();

  return (
    <div className="flex-1 min-h-screen bg-[#050505]">
      <div className="h-48 md:h-64 lg:h-80 w-full relative overflow-hidden bg-zinc-900">
        <img src={channel.banner} className="w-full h-full object-cover opacity-20" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row items-end gap-6 md:gap-8 mb-16">
          <div className="p-1 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-2xl">
            <img src={channel.avatar} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black object-cover bg-zinc-900" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-2xl md:text-4xl font-bold uppercase font-futuristic tracking-tighter">{channel.name}</h1>
              {!channel.isMe && <div className="p-1 bg-cyan-400 rounded-full"><Check className="w-3 h-3 text-black" /></div>}
            </div>
            <div className="flex items-center space-x-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              <span className="text-white">{channel.sub} Subscribers</span>
              <span>{channelVideos.length} Uploads</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 pb-4">
             {channel.isMe ? (
               <button className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10">Manage Node</button>
             ) : (
               <button 
                  onClick={() => onToggleSubscribe(channel.name)}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isSubscribed ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black hover:bg-cyan-400'}`}
               >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
               </button>
             )}
          </div>
        </div>

        <div className="flex space-x-12 border-b border-white/5 mb-12">
           {['Videos', 'Reels', 'Live', 'Subscribers'].map((tab) => (
             <button 
               key={tab} 
               onClick={() => setActiveTab(tab)}
               className={`pb-4 text-[10px] font-black uppercase tracking-widest relative ${activeTab === tab ? 'text-white' : 'text-zinc-600'}`}
             >
               {tab}
               {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.5)]"></div>}
             </button>
           ))}
        </div>

        {activeTab === 'Subscribers' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockSubscribers.map((sub) => (
              <div key={sub.name} className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center space-y-4">
                <img src={sub.avatar} className="w-16 h-16 rounded-full border border-white/10" />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest">{sub.name}</h3>
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mt-1">Verified Node</p>
                </div>
                <button className="w-full py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-white/10">View Profile</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredDisplay.map(v => <VideoCard key={v.id} video={v} />)}
            {filteredDisplay.length === 0 && (
              <div className="col-span-full py-40 text-center opacity-30 flex flex-col items-center">
                <Users className="w-12 h-12 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">No broadcast data in this sector</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
