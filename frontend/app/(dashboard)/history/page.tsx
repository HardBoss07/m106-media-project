'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import MediaCard from '@/components/UI/MediaCard';
import { MediaItem } from '@/types/media';

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState<MediaItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('media_history');
    if (savedHistory) {
      setHistoryList(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div style={{ padding: '40px 24px' }}>
      <div className="section-hd">
        <div className="section-title flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Verlauf
          <span className="cnt">{historyList.length}</span>
        </div>
      </div>
      
      {historyList.length > 0 ? (
        <div className="vgrid" style={{ marginTop: '32px' }}>
          {historyList.map(item => (
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
          <div className="empty-ico"><Clock className="w-12 h-12 mb-4 text-bg4" /></div>
          <h3>Verlauf ist leer</h3>
          <p>Deine zuletzt angesehenen Medien werden hier angezeigt.</p>
        </div>
      )}
    </div>
  );
}
