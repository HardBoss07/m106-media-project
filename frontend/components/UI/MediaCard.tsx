import { Play, Music, Image as ImageIcon } from 'lucide-react';
import { MediaItem } from '../../types/media';

interface MediaCardProps {
  media: MediaItem;
}

const MediaCard = ({ media }: MediaCardProps) => {
  const Icon = media.type === 'video' ? Play : media.type === 'audio' ? Music : ImageIcon;

  return (
    <div className="media-card">
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
        <h3 className="text-primary-white font-medium truncate mb-1">
          {media.title}
        </h3>
        <p className="text-xs text-primary-text/60">
          {media.category}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
