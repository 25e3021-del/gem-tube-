
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_COMMENTS } from '../constants';
import { Video } from '../types';
import { Zap, Share2, Activity, MoreHorizontal, Sparkles, Terminal, User, Check } from 'lucide-react';
import { getVideoSummary } from '../services/gemini';
import VideoCard from '../components/VideoCard';

interface WatchProps {
  videos: Video[];
  onWatch: (video: Video) => void;
  likedIds: string[];
  onToggleLike: (id: string) => void;
}

const Watch: React.FC<WatchProps> = ({ videos, onWatch, likedIds, onToggleLike }) => {
  const { id } = useParams<{ id: string }>();
  const video = videos.find(v => v.id === id);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const isBoosted = likedIds.includes(id || '');

  useEffect(() => {
    if (video) onWatch(video);
    setSummary(null);
    setIsSubscribed(false);
    window.scrollTo(0, 0);
  }, [id, video]);

  const handleSummarize = async () => {
    if (!video) return;
    setIsSummarizing(true);
    const res = await getVideoSummary(video.title, video.description);
    setSummary(res || "Signal lost. Summary corrupted.");
    setIsSummarizing(false);
  };

  if (!video) return <div className="p-20 font-futuristic text-center text-zinc-800">DATA FRAGMENT NOT FOUND</div>;

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>

      <div className="flex flex-col xl:flex-row gap-8 p-6 md:px-12 xl:px-24">
        <div className="flex-1">
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-zinc-950 border border-white/5 relative group shadow-[0_0_50px_rgba(0,242,255,0.05)]">
            <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s]" alt="Player" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
               <button className="w-24 h-24 glass rounded-full flex items-center justify-center border-white/10 group-hover:border-cyan-500/50 transition-all shadow-2xl">
                  <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-cyan-400 border-b-[14px] border-b-transparent ml-2"></div>
               </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 w-1/3"></div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <h1 className="text-3xl font-black font-futuristic uppercase italic tracking-tighter bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              {video.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <img src={video.author.avatar} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <span className="font-bold text-lg block">{video.author.name}</span>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{video.author.subscribers} Nodes</span>
                </div>
                <button onClick={() => setIsSubscribed(!isSubscribed)} className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest transition-all uppercase ${isSubscribed ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black'}`}>
                  {isSubscribed ? 'Synced' : 'Sync Node'}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button onClick={() => onToggleLike(id!)} className={`flex items-center space-x-2 px-6 py-3 glass rounded-full border border-white/10 transition-all ${isBoosted ? 'text-cyan-400 border-cyan-500/50' : 'text-zinc-500'}`}>
                  <Zap className={`w-5 h-5 ${isBoosted ? 'fill-current' : ''}`} />
                  <span className="text-xs font-black uppercase tracking-widest">{isBoosted ? 'Boosted' : 'Boost'}</span>
                </button>
                <button className="glass p-3 rounded-full border-white/10"><Share2 className="w-5 h-5" /></button>
                <button className="glass p-3 rounded-full border-white/10"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="mt-4 p-6 glass rounded-[32px] border border-cyan-500/10">
              <div className="flex items-center justify-between mb-6 text-[11px] font-black text-zinc-500 tracking-widest">
                <span>{video.views} // {video.uploadedAt}</span>
                <button onClick={handleSummarize} className="text-cyan-400 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Insight</span>
                </button>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{video.description}</p>
              {summary && <div className="mt-6 pt-6 border-t border-white/5 text-cyan-50 italic text-sm">"{summary}"</div>}
            </div>
          </div>
        </div>
        <div className="xl:w-[400px] flex-shrink-0">
          <h4 className="text-xs font-black tracking-widest text-zinc-500 mb-6 uppercase">Mesh Suggestions</h4>
          <div className="flex flex-col gap-6">
            {videos.filter(v => v.id !== id).slice(0, 10).map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
