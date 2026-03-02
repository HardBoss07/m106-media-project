import { FileVideo, FileAudio, FileImage, Calendar, Tag } from 'lucide-react';
import { MediaItem, MediaType } from '../../types/media';
import Link from 'next/link';

interface MediaCardProps {
  media: MediaItem;
}

const MediaCard = ({ media }: MediaCardProps) => {
  // Determine which icon to show based on type
  const renderIcon = () => {
    const iconClass = "w-16 h-16 text-primary-accent";
    switch (media.type) {
      case 'video':
      case MediaType.VIDEO:
        return <FileVideo className={iconClass} />;
      case 'audio':
      case MediaType.AUDIO:
        return <FileAudio className={iconClass} />;
      default:
        return <FileImage className={iconClass} />;
    }
  };

  const typeLabels: Record<string, string> = {
    image: 'Bild',
    video: 'Video',
    audio: 'Audio'
  };

  return (
    <Link href={`/media/${media.id}`} className="media-card cursor-pointer block group">
      <div className="media-card-image-container flex items-center justify-center bg-gray-950/50">
        <div className="flex flex-col items-center gap-2">
          {renderIcon()}
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
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-accent/10 text-primary-accent border border-primary-accent/20 uppercase font-bold">
            {typeLabels[media.type] || media.type}
          </span>
        </div>
        
        {media.description && (
          <p className="text-xs text-primary-text/60 line-clamp-2 mb-2 leading-relaxed">
            {media.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-primary-text/5">
          <div className="flex items-center gap-1 overflow-hidden">
            <Tag className="w-3 h-3 text-primary-brand shrink-0" />
            <span className="text-[10px] text-primary-brand font-semibold tracking-wide uppercase truncate">
              {media.signature || 'Ohne Kategorie'}
            </span>
          </div>
          {media.uploadDate && (
            <div className="flex items-center gap-1 text-[10px] text-primary-text/40 shrink-0">
              <Calendar className="w-3 h-3" />
              {new Date(media.uploadDate).toLocaleDateString('de-DE')}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
