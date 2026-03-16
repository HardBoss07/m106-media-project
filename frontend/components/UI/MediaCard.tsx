'use client';

import { MediaItem } from '@/types/media';
import { Play, Image as ImageIcon, Volume2, MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { extractThumbnail } from '@/lib/thumbnail';

interface MediaCardProps {
  media: MediaItem;
  onClick: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
  batchMode?: boolean;
}

const MediaCard = ({ media, onClick, onContextMenu, isSelected, batchMode }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(media.thumbnail || null);
  const [loadingThumb, setLoadingThumb] = useState(false);

  useEffect(() => {
    if (media.type === 'video' && !thumbnailUrl) {
      const getThumb = async () => {
        setLoadingThumb(true);
        const thumb = await extractThumbnail(media.url);
        if (thumb) setThumbnailUrl(thumb);
        setLoadingThumb(false);
      };
      getThumb();
    }
  }, [media.url, media.type, thumbnailUrl]);

  const getIcon = () => {
    if (media.type === 'image' || media.type === 'foto') return <ImageIcon className="w-[22px] h-[22px] text-white" />;
    if (media.type === 'audio' || media.type === 'sound') return <Volume2 className="w-[22px] h-[22px] text-white" />;
    return <Play className="w-[22px] h-[22px] text-white fill-current ml-[3px]" />;
  };

  const getPlaceholderIcon = () => {
    if (media.type === 'image' || media.type === 'foto') return '🖼';
    if (media.type === 'audio' || media.type === 'sound') return '🎵';
    return '🎬';
  };

  return (
    <div 
      className={`vcard ${isSelected ? 'selected' : ''}`} 
      data-vid={media.id}
      onClick={() => onClick(media.id)}
      onContextMenu={(e) => onContextMenu(e, media.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {batchMode && (
        <div className={`vcard-check ${isSelected ? 'checked' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      )}
      <div className="vthumb">
        {thumbnailUrl && thumbnailUrl !== media.url ? (
          <img src={thumbnailUrl} alt={media.title} loading="lazy" />
        ) : media.type === 'image' || media.type === 'foto' ? (
          <img src={media.url} alt={media.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="vthumb-ph">
            <span style={{ fontSize: '2.5rem' }}>{getPlaceholderIcon()}</span>
            {loadingThumb && <span>Lädt…</span>}
          </div>
        )}
        
        {isHovered && !batchMode && (
          <div className="vth-overlay">
            <div className="play-ov">
              {getIcon()}
            </div>
          </div>
        )}

        {media.duration && <span className="vdur">{media.duration}</span>}
        <button className="vcm" onClick={(e) => { e.stopPropagation(); onContextMenu(e, media.id); }}>
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <div className="vinfo">
        <div className="vtitle">{media.title}</div>
        <div className="vmeta">
          <span className="vcat">{media.signature || 'Allgemein'}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
