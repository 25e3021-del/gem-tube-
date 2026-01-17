
import React from 'react';
import { Video } from '../types';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group cursor-pointer">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="flex mt-3 space-x-3">
        <div className="flex-shrink-0">
          <img 
            src={video.author.avatar} 
            alt={video.author.name}
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          <div className="text-xs text-zinc-400 mt-1 hover:text-white transition-colors">
            {video.author.name}
          </div>
          <div className="text-xs text-zinc-400">
            {video.views} • {video.uploadedAt}
          </div>
        </div>
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
