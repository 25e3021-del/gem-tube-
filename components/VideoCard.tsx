
import React from 'react';
import { Video, Modality } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { Share2, Users, Radio, Image as ImageIcon, Zap } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();
  const isReel = video.modality === Modality.REELS;
  const isLive = video.modality === Modality.LIVE;
  const isImage = video.modality === Modality.IMAGE;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Simulate share logic
    navigator.clipboard.writeText(window.location.origin + `/#/watch/${video.id}`);
    alert("Neural Link copied to clipboard");
  };

  return (
    <Link to={`/watch/${video.id}`} className={`group flex flex-col w-full ${isReel ? 'max-w-full' : ''}`}>
      <div className={`relative rounded-2xl md:rounded-[24px] overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-cyan-500/30 transition-all duration-500 shadow-xl group-hover:shadow-cyan-500/5 ${
        isReel ? 'aspect-[9/16]' : isImage ? 'aspect-square' : 'aspect-video'
      }`}>
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Modality Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {isLive && (
          <div className="absolute top-2 left-2 flex items-center space-x-1.5 bg-red-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]">
            <Radio className="w-2.5 h-2.5" />
            <span>Live Sync</span>
          </div>
        )}

        <div className="absolute bottom-2 right-2 glass px-1.5 py-0.5 rounded text-[9px] font-black tracking-tighter border border-white/10 text-white/80">
          {isLive ? (
            <div className="flex items-center space-x-1">
              <Users className="w-2.5 h-2.5 text-cyan-400" />
              <span>{video.liveViewers || '1.2K'}</span>
            </div>
          ) : (
            video.duration
          )}
        </div>
        
        {/* Actions Overlay - Hidden on touch for cleaner UI but visible on hover/focus */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 md:block">
           <button 
            onClick={handleAction}
            className="p-2 glass rounded-full hover:bg-cyan-500/20 text-cyan-400 border border-white/10"
            title="Copy Neural Link"
           >
             <Share2 className="w-3.5 h-3.5" />
           </button>
        </div>
      </div>
      
      <div className="flex mt-3 space-x-3">
        <div className="flex-shrink-0 hidden xs:block">
          <div 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/channel/${video.author.name === 'My Channel' ? 'me' : video.author.name.toLowerCase().replace(' ', '')}`);
            }}
            className="p-[1px] rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 block cursor-pointer"
          >
            <img 
              src={video.author.avatar} 
              alt={video.author.name}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-black"
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className={`font-bold line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors tracking-tight font-futuristic uppercase ${isReel || isImage ? 'text-[10px]' : 'text-xs md:text-sm'}`}>
            {video.title}
          </h3>
          <div className="flex items-center space-x-2 mt-0.5 overflow-hidden">
            <span className="text-[9px] md:text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 transition-colors truncate">
              {video.author.name}
            </span>
            <span className="text-[8px] text-zinc-700 font-bold uppercase whitespace-nowrap hidden sm:inline">• {video.author.subscribers}</span>
          </div>
          <div className="text-[9px] font-bold text-zinc-600 mt-0.5 uppercase tracking-tighter">
            {isLive ? 'Active Protocol' : video.views} • {video.uploadedAt}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
