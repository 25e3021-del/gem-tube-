
import React from 'react';
import { Video } from '../types';
import { Link } from 'react-router-dom';
import { MoreVertical, Share2 } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group flex flex-col">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl group-hover:shadow-cyan-500/10">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-3 right-3 glass px-2 py-1 rounded-md text-[10px] font-black tracking-tighter border border-white/10">
          {video.duration}
        </div>
        
        {/* Hover Action Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
           <button className="p-2 glass rounded-full hover:bg-cyan-500/20 text-cyan-400 border border-white/10">
             <Share2 className="w-4 h-4" />
           </button>
        </div>
      </div>
      
      <div className="flex mt-4 space-x-3">
        <div className="flex-shrink-0">
          <div className="p-[1px] rounded-full bg-gradient-to-br from-cyan-400 to-purple-600">
            <img 
              src={video.author.avatar} 
              alt={video.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-black"
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-sm font-bold line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors tracking-tight font-futuristic uppercase">
            {video.title}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-[11px] font-semibold text-zinc-500 hover:text-white transition-colors">
              {video.author.name}
            </span>
          </div>
          <div className="text-[10px] font-bold text-zinc-600 mt-0.5 uppercase tracking-tighter">
            {video.views} // {video.uploadedAt}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
