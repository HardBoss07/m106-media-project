'use client';

import { useState, useEffect } from 'react';
import { Heart, Search } from 'lucide-react';
import MediaCard from '@/components/UI/MediaCard';
import { MediaItem } from '@/types/media';

export default function LikedPage() {
  const [likedList, setLikedList] = useState<MediaItem[]>([]);

  useEffect(() => {
    const savedLiked = localStorage.getItem('liked_media');
    if (savedLiked) {
      setLikedList(JSON.parse(savedLiked));
    }
  }, []);

  return (
    <div style={{ padding: '40px 24px' }}>
      <div className="section-hd">
        <div className="section-title flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
          Meine Favoriten
          <span className="cnt">{likedList.length}</span>
        </div>
      </div>
      
      {likedList.length > 0 ? (
        <div className="vgrid" style={{ marginTop: '32px' }}>
          {likedList.map(item => (
            <MediaCard 
              key={item.id} 
              media={item} 
              onClick={() => {}} 
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}
        </div>
      ) : (
        <div className="empty" style={{ marginTop: '60px' }}>
          <div className="empty-ico"><Heart className="w-12 h-12 mb-4 text-bg4" /></div>
          <h3>Noch keine Favoriten</h3>
          <p>Markiere Medien als Favorit, um sie hier schnell wiederzufinden.</p>
        </div>
      )}
    </div>
  );
}
