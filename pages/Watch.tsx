
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Video } from '../types';
import { Zap, Share2, MoreHorizontal, Sparkles } from 'lucide-react';
import { aiService } from '../services/gemini';
import VideoCard from '../components/VideoCard';

interface WatchProps {
  videos: Video[];
  onWatch: (video: Video) => void;
  likedIds: string[];
  onToggleLike: (id: string) => void;
  subscribedChannels: string[];
  onToggleSubscribe: (name: string) => void;
}

const Watch: React.FC<WatchProps> = ({ videos, onWatch, likedIds, onToggleLike, subscribedChannels, onToggleSubscribe }) => {
  const { id } = useParams<{ id: string }>();
  const video = videos.find(v => v.id === id);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const isLiked = likedIds.includes(id || '');
  const isSubscribed = video ? subscribedChannels.includes(video.author.name) : false;

  useEffect(() => {
    if (video) {
      onWatch(video);
      setIsPlaying(false);
    }
    setSummary(null);
    window.scrollTo(0, 0);
  }, [id, video, onWatch]);

  const handleSummarize = async () => {
    if (!video) return;
    setIsSummarizing(true);
    const res = await aiService.summarizeVideo(video.title, video.description);
    setSummary(res);
    setIsSummarizing(false);
  };

  if (!video) return <div className="p-20 text-center text-zinc-800">VIDEO NOT FOUND</div>;

  return (
    <div className="relative min-h-screen bg-[#050505]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>

      <div className="flex flex-col xl:flex-row gap-8 p-6 md:px-12 xl:px-24">
        <div className="flex-1">
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-zinc-950 border border-white/5 relative group shadow-[0_0_50px_rgba(0,242,255,0.05)]">
            {video.videoUrl && isPlaying ? (
              <video src={video.videoUrl} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <>
                <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s]" alt="Player" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                   <button onClick={() => setIsPlaying(true)} className="w-24 h-24 glass rounded-full flex items-center justify-center border-white/10 group-hover:border-cyan-500/50 transition-all shadow-2xl hover:scale-110">
                      <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-cyan-400 border-b-[14px] border-b-transparent ml-2"></div>
                   </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="text-3xl font-bold uppercase tracking-tight font-futuristic">{video.title}</h1>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <img src={video.author.avatar} className="w-12 h-12 rounded-full border border-white/10" alt="Avatar" />
                <div>
                  <span className="font-bold text-lg block">{video.author.name}</span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{video.author.subscribers} Subscribers</span>
                </div>
                <button onClick={() => onToggleSubscribe(video.author.name)} className={`px-6 py-2.5 rounded-full text-xs font-black transition-all uppercase tracking-widest ${isSubscribed ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black hover:bg-cyan-400'}`}>
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => onToggleLike(id!)} className={`flex items-center space-x-2 px-6 py-3 glass rounded-full border border-white/10 transition-all ${isLiked ? 'text-cyan-400 border-cyan-500/50' : 'text-zinc-500 hover:text-white'}`}>
                  <Zap className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs font-black uppercase tracking-widest">{isLiked ? 'Liked' : 'Like'}</span>
                </button>
                <button className="glass p-3 rounded-full border-white/10 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                <button className="glass p-3 rounded-full border-white/10 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 glass rounded-[32px] border border-cyan-500/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-6 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                <span>{video.views} • {video.uploadedAt}</span>
                <button onClick={handleSummarize} className={`text-cyan-400 flex items-center space-x-2 hover:scale-105 transition-transform ${isSummarizing ? 'animate-pulse' : ''}`}>
                  <Sparkles className="w-4 h-4" />
                  <span>{isSummarizing ? 'Summarizing...' : 'AI Summary'}</span>
                </button>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium">{video.description}</p>
              {summary && <div className="mt-6 pt-6 border-t border-white/5 text-cyan-50/70 italic text-sm animate-in fade-in slide-in-from-top-2">"{summary}"</div>}
            </div>
          </div>
        </div>
        <div className="xl:w-[400px] flex-shrink-0">
          <h4 className="text-[10px] font-black text-zinc-500 mb-6 uppercase tracking-[0.4em]">Recommended</h4>
          <div className="flex flex-col gap-6">
            {videos.filter(v => v.id !== id).slice(0, 10).map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
