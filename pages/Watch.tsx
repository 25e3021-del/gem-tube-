
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_VIDEOS, MOCK_COMMENTS } from '../constants';
import { Zap, Share2, Activity, MoreHorizontal, MessageSquare, Sparkles, Terminal, User } from 'lucide-react';
import { getVideoSummary } from '../services/gemini';
import VideoCard from '../components/VideoCard';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const video = MOCK_VIDEOS.find(v => v.id === id);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    setSummary(null);
    window.scrollTo(0, 0);
  }, [id]);

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
      {/* Background Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>

      <div className="flex flex-col xl:flex-row gap-8 p-6 md:px-12 xl:px-24">
        {/* Primary Stream */}
        <div className="flex-1">
          <div className="aspect-video w-full rounded-3xl overflow-hidden bg-zinc-950 border border-white/5 relative group shadow-[0_0_50px_rgba(0,242,255,0.05)]">
            <img 
              src={video.thumbnail} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3s]" 
              alt="Player background"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
               <button className="w-24 h-24 glass rounded-full flex items-center justify-center border-white/10 group-hover:border-cyan-500/50 group-hover:scale-110 transition-all shadow-2xl">
                  <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-cyan-400 border-b-[14px] border-b-transparent ml-2 shadow-[0_0_20px_rgba(0,242,255,0.5)]"></div>
               </button>
            </div>
            {/* Player Controls Mock */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 w-1/3 shadow-[0_0_10px_rgba(0,242,255,0.5)]"></div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <h1 className="text-3xl font-black tracking-tight font-futuristic uppercase bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent italic">
              {video.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 p-1">
              <div className="flex items-center space-x-4">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500">
                  <img src={video.author.avatar} className="w-12 h-12 rounded-full border-2 border-black" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight">{video.author.name}</span>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{video.author.subscribers} NODE FOLLOWERS</span>
                </div>
                <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-cyan-400 transition-all ml-4 uppercase">
                  Subscribe
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex glass rounded-full border-white/10">
                  <button className="flex items-center space-x-2 px-6 py-3 border-r border-white/5 hover:bg-white/5 rounded-l-full transition-colors">
                    <Zap className="w-5 h-5 text-cyan-400 fill-current" />
                    <span className="text-xs font-black tracking-widest uppercase">Boost</span>
                  </button>
                  <button className="flex items-center px-6 py-3 hover:bg-white/5 rounded-r-full transition-colors">
                    <Activity className="w-5 h-5 text-zinc-600" />
                  </button>
                </div>
                <button className="flex items-center space-x-2 glass px-6 py-3 rounded-full hover:bg-white/5 border-white/10 transition-all">
                  <Share2 className="w-5 h-5 text-white/50" />
                  <span className="text-xs font-black tracking-widest uppercase">Link</span>
                </button>
                <button className="p-3 glass rounded-full border-white/10">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* AI Insight Panel */}
            <div className="mt-4 p-6 glass rounded-[32px] border border-cyan-500/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Terminal className="w-32 h-32" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="text-[11px] font-black tracking-widest text-zinc-500 flex items-center space-x-4">
                  <span className="bg-white/5 px-2 py-1 rounded">SECURE_STREAM: OK</span>
                  <span>{video.views} FLOWS</span>
                  <span>RECORDED: {video.uploadedAt}</span>
                </div>
                <button 
                  onClick={handleSummarize}
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] border border-cyan-500/30 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>NEURAL SUMMARY</span>
                </button>
              </div>
              
              <p className="text-sm text-zinc-400 leading-relaxed max-w-4xl">{video.description}</p>
              
              {isSummarizing && (
                <div className="mt-8 pt-8 border-t border-white/5">
                   <div className="flex items-center space-x-2 mb-4">
                     <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                     <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase">Mining Data Nodes...</span>
                   </div>
                   <div className="space-y-2">
                     <div className="h-3 bg-white/5 rounded-full w-full animate-pulse"></div>
                     <div className="h-3 bg-white/5 rounded-full w-2/3 animate-pulse delay-75"></div>
                   </div>
                </div>
              )}

              {summary && (
                <div className="mt-8 pt-8 border-t border-cyan-500/20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="flex items-center space-x-3 mb-4 text-cyan-400">
                    <Sparkles className="w-5 h-5 animate-spin-slow" />
                    <span className="text-xs font-black tracking-[0.4em] uppercase">Gemini Spectral Analysis</span>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
                    <p className="text-sm text-cyan-50/80 italic font-medium leading-loose">"{summary}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12 mb-20">
            <div className="flex items-center space-x-8 mb-8">
              <h3 className="text-2xl font-black font-futuristic italic tracking-tighter uppercase">Signal Feedback</h3>
              <div className="text-[10px] font-bold text-zinc-500 tracking-widest bg-white/5 px-3 py-1 rounded">
                ACTIVE_USERS: 1.4K
              </div>
            </div>

            <div className="flex space-x-4 mb-12">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center border-cyan-500/20">
                <User className="w-6 h-6 text-zinc-700" />
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 group focus-within:border-cyan-500/40 transition-all">
                <input 
                  placeholder="Transmit message to current..." 
                  className="w-full bg-transparent outline-none text-sm placeholder-zinc-700 font-medium"
                />
              </div>
            </div>

            <div className="space-y-8">
              {MOCK_COMMENTS.map(comment => (
                <div key={comment.id} className="flex space-x-5 group">
                  <img src={comment.avatar} className="w-12 h-12 rounded-full border border-white/10 shadow-lg" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1.5">
                      <span className="text-sm font-black tracking-tight text-white/90 uppercase">{comment.author}</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{comment.time}</span>
                    </div>
                    <p className="text-sm text-zinc-400 bg-white/20 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl inline-block border border-white/5">
                      {comment.text}
                    </p>
                    <div className="flex items-center space-x-6 mt-3">
                      <button className="flex items-center space-x-1.5 text-zinc-600 hover:text-cyan-400 transition-colors">
                        <Zap className="w-4 h-4" />
                        <span className="text-[10px] font-bold">{comment.likes}</span>
                      </button>
                      <button className="text-[10px] font-black uppercase tracking-widest text-zinc-700 hover:text-white transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Neural Suggestions */}
        <div className="xl:w-[400px] flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-black tracking-[0.4em] text-zinc-500 uppercase">Synchronized Streams</h4>
              <button className="text-[10px] font-bold text-cyan-400/50 hover:text-cyan-400 tracking-widest uppercase transition-colors">Refresh Nodes</button>
            </div>
            <div className="flex flex-col gap-6">
              {MOCK_VIDEOS.filter(v => v.id !== id).map(v => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
