
import React, { useState } from 'react';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import { Shield, Folder, Star, Clock, Lock } from 'lucide-react';

interface LibraryProps {
  videos: Video[];
}

const Library: React.FC<LibraryProps> = ({ videos }) => {
  const [activeSubTab, setActiveSubTab] = useState('Uploads');

  return (
    <div className="flex-1 min-h-screen bg-[#050505] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 mb-16">
          <div className="p-4 glass rounded-2xl border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <Folder className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-futuristic uppercase tracking-tighter italic">Library</h1>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Your personal media vault</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-3">
            {[
              { id: 'Uploads', icon: <Star className="w-4 h-4" />, label: "My Uploads", count: videos.length.toString() },
              { id: 'Playlists', icon: <Folder className="w-4 h-4" />, label: "Playlists", count: "0" },
              { id: 'Later', icon: <Clock className="w-4 h-4" />, label: "Watch Later", count: "0" },
              { id: 'Locked', icon: <Lock className="w-4 h-4" />, label: "Data Vault", count: "0" },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveSubTab(item.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all group ${
                  activeSubTab === item.id ? 'bg-white/10 border border-white/10' : 'glass hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className={`${activeSubTab === item.id ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-cyan-400'} transition-colors`}>{item.icon}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${activeSubTab === item.id ? 'text-white' : 'text-zinc-500'}`}>{item.label}</span>
                </div>
                <span className="text-[10px] font-black text-zinc-700">{item.count}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
             <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-sm font-black uppercase tracking-widest">{activeSubTab}</h3>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-zinc-600 uppercase">
                  <Shield className="w-3 h-3" />
                  <span>Secured Encryption Active</span>
                </div>
             </div>
             
             {activeSubTab === 'Uploads' ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {videos.map(video => (
                    <div key={video.id} className="animate-in fade-in duration-500">
                      <VideoCard video={video} />
                    </div>
                  ))}
                  {videos.length === 0 && (
                     <div className="col-span-full py-20 text-center opacity-30">
                        <p className="text-xs font-bold uppercase tracking-[0.5em]">No uploads discovered.</p>
                     </div>
                  )}
               </div>
             ) : (
               <div className="py-20 text-center opacity-30">
                  <p className="text-xs font-bold uppercase tracking-[0.5em]">This section is currently empty.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
