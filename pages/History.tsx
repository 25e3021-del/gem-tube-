
import React from 'react';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import { Activity, Trash2, Clock } from 'lucide-react';

interface HistoryProps {
  videos: Video[];
  setHistory: (v: Video[]) => void;
}

const History: React.FC<HistoryProps> = ({ videos, setHistory }) => {
  const handleClear = () => {
    if (confirm("Confirm Neural Wipe? All history will be purged.")) {
      setHistory([]);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#050505] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-6">
            <div className="p-4 glass rounded-2xl border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black font-futuristic uppercase tracking-tighter italic">Core Log</h1>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Neural Session History</p>
            </div>
          </div>
          <button onClick={handleClear} className="flex items-center space-x-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3 rounded-full border border-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest">
            <Trash2 className="w-4 h-4" />
            <span>Wipe Core Buffer</span>
          </button>
        </div>

        {videos.length === 0 ? (
          <div className="py-40 text-center opacity-20">
            <Clock className="w-16 h-16 mx-auto mb-6" />
            <p className="text-xs font-black uppercase tracking-[0.5em]">No recent activity logged.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {videos.map((video, i) => (
              <div key={`${video.id}-${i}`} className="animate-in fade-in duration-500">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
