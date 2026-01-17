
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_VIDEOS, MOCK_COMMENTS } from '../constants';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, MessageSquare, Sparkles } from 'lucide-react';
import { getVideoSummary } from '../services/gemini';
import VideoCard from '../components/VideoCard';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const video = MOCK_VIDEOS.find(v => v.id === id);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setSummary(null);
    window.scrollTo(0, 0);
  }, [id]);

  const handleSummarize = async () => {
    if (!video) return;
    setIsSummarizing(true);
    const res = await getVideoSummary(video.title, video.description);
    setSummary(res || "Could not generate summary.");
    setIsSummarizing(false);
  };

  if (!video) return <div className="p-10">Video not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:px-6 xl:px-24">
      {/* Primary Content */}
      <div className="flex-1">
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black group relative">
          <img 
            src={video.thumbnail} 
            className="w-full h-full object-cover opacity-50" 
            alt="Player background"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
             </div>
          </div>
        </div>

        <h1 className="text-xl font-bold mt-4 line-clamp-2">{video.title}</h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
          <div className="flex items-center space-x-4">
            <img src={video.author.avatar} className="w-10 h-10 rounded-full" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{video.author.name}</span>
              <span className="text-xs text-zinc-400">{video.author.subscribers} subscribers</span>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors ml-2">
              Subscribe
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-zinc-800 rounded-full">
              <button 
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-2 px-4 py-2 border-r border-zinc-700 hover:bg-zinc-700 rounded-l-full transition-colors ${liked ? 'text-blue-400' : ''}`}
              >
                <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">1.2K</span>
              </button>
              <button className="flex items-center px-4 py-2 hover:bg-zinc-700 rounded-r-full transition-colors">
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
            <button className="flex items-center space-x-2 bg-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
            <button className="hidden sm:flex items-center space-x-2 bg-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors">
              <Download className="w-5 h-5" />
              <span className="text-sm font-medium">Download</span>
            </button>
            <button className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Description & AI Summary */}
        <div className="mt-4 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors group">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold flex items-center">
              <span>{video.views} • {video.uploadedAt}</span>
              <span className="ml-2 text-blue-400 cursor-pointer">#trending</span>
            </div>
            <button 
              onClick={handleSummarize}
              className="flex items-center space-x-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-xs font-bold border border-blue-600/30 hover:bg-blue-600/30 transition-all"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI SUMMARY</span>
            </button>
          </div>
          
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{video.description}</p>
          
          {isSummarizing && (
            <div className="mt-4 p-3 bg-zinc-900 rounded-lg border border-zinc-700 animate-pulse">
              <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
            </div>
          )}

          {summary && (
            <div className="mt-4 p-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30 shadow-lg animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex items-center space-x-2 mb-2 text-blue-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">Gemini Insights</span>
              </div>
              <p className="text-sm text-zinc-100 italic leading-relaxed">"{summary}"</p>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="mt-6">
          <div className="flex items-center space-x-6 mb-6">
            <h3 className="text-xl font-bold">1,402 Comments</h3>
            <div className="flex items-center space-x-2 text-sm font-medium cursor-pointer">
              <MessageSquare className="w-5 h-5" />
              <span>Sort by</span>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <img src="https://picsum.photos/seed/me/100/100" className="w-10 h-10 rounded-full" />
            <div className="flex-1 border-b border-zinc-700 pb-1">
              <input 
                placeholder="Add a comment..." 
                className="w-full bg-transparent outline-none text-sm placeholder-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            {MOCK_COMMENTS.map(comment => (
              <div key={comment.id} className="flex space-x-4">
                <img src={comment.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-bold">@{comment.author.replace(' ', '').toLowerCase()}</span>
                    <span className="text-xs text-zinc-500">{comment.time}</span>
                  </div>
                  <p className="text-sm mb-2">{comment.text}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 hover:bg-zinc-800 p-1 rounded">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs text-zinc-400">{comment.likes}</span>
                    </button>
                    <ThumbsDown className="w-4 h-4 hover:bg-zinc-800 rounded" />
                    <span className="text-xs font-bold hover:bg-zinc-800 px-2 py-1 rounded cursor-pointer">Reply</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="lg:w-[350px] xl:w-[400px] flex-shrink-0">
        <div className="flex flex-col gap-4">
          {MOCK_VIDEOS.filter(v => v.id !== id).map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
