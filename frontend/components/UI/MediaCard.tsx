import { Play, Music, Image as ImageIcon, Calendar } from 'lucide-react';
import { MediaItem } from '../../types/media';
import Link from 'next/link';

interface MediaCardProps {
  media: MediaItem;
}

const MediaCard = ({ media }: MediaCardProps) => {
  const Icon = media.type === 'video' ? Play : media.type === 'audio' ? Music : ImageIcon;

  return (
    <Link href={`/media/${media.id}`} className="media-card cursor-pointer block">
      <div className="media-card-image-container">
        <img
          src={media.thumbnailUrl}
          alt={media.title}
          className="media-card-image"
        />
        <div className="media-card-overlay">
          <div className="media-card-icon-wrapper">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        {media.duration && (
          <span className="media-card-badge">
            {media.duration}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-primary-white font-medium truncate flex-1">
            {media.title}
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-accent/10 text-primary-accent border border-primary-accent/20">
            {media.type}
          </span>
        </div>
        
        {media.description && (
          <p className="text-xs text-primary-text/60 line-clamp-2 mb-2 leading-relaxed">
            {media.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-primary-text/5">
          <span className="text-[10px] text-primary-brand font-semibold tracking-wide uppercase">
            {media.category}
          </span>
          {media.uploadDate && (
            <div className="flex items-center gap-1 text-[10px] text-primary-text/40">
              <Calendar className="w-3 h-3" />
              {new Date(media.uploadDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
