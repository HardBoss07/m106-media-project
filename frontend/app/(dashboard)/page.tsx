'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import MediaCard from '@/components/UI/MediaCard';
import { searchMedia } from '@/lib/api-client';
import { MediaItem } from '@/types/media';
import { Video, Image, Volume2, Heart, ListMusic, Settings, Search, Info, Folder, LayoutGrid, Clock, Play } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const activeCategory = searchParams.get('cat') || '';
  
  const [mediaType, setMediaType] = useState('video');
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [curMedia, setCurMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Stats
  const [stats, setStats] = useState({
    videos: 0,
    images: 0,
    sounds: 0,
    total: 0,
    liked: 0,
    playlists: 0,
    categories: 0,
    folders: 1
  });

  const categories = ['Allgemein', 'Natur', 'Technik', 'Menschen'];

  const updateStats = useCallback(async () => {
    const finalQuery = activeCategory ? activeCategory : searchQuery;
    
    // Fetch counts based on current search/category
    const v = await searchMedia(finalQuery, 'Video');
    const i = await searchMedia(finalQuery, 'Foto');
    const s = await searchMedia(finalQuery, 'Sound');
    
    // Get liked count from localStorage
    const savedLiked = localStorage.getItem('liked_media');
    const likedArr = savedLiked ? JSON.parse(savedLiked) : [];

    setStats(prev => ({
      ...prev,
      videos: v.length,
      images: i.length,
      sounds: s.length,
      total: v.length + i.length + s.length,
      liked: likedArr.length,
      categories: categories.length
    }));
  }, [searchQuery, activeCategory]);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    const backendType = mediaType === 'video' ? 'Video' : mediaType === 'image' ? 'Foto' : 'Sound';
    const finalQuery = activeCategory ? activeCategory : searchQuery;
    
    // Always filter by type, even when searching
    const results = await searchMedia(finalQuery, backendType);
    setMediaList(results);
    setLoading(false);
  }, [mediaType, searchQuery, activeCategory]);

  useEffect(() => {
    fetchMedia();
    updateStats();
  }, [fetchMedia, updateStats]);

  const handleMediaClick = (id: string) => {
    const media = mediaList.find(m => m.id === id);
    if (media) {
      setCurMedia(media);
      setPlayerOpen(true);
      
      // Add to history (localStorage)
      const savedHistory = localStorage.getItem('media_history');
      let historyArr = savedHistory ? JSON.parse(savedHistory) : [];
      // Remove if exists to move to top
      historyArr = historyArr.filter((item: any) => item.id !== media.id);
      historyArr.unshift(media);
      // Keep last 50
      if (historyArr.length > 50) historyArr.pop();
      localStorage.setItem('media_history', JSON.stringify(historyArr));
    }
  };

  const toggleFavorite = (media: MediaItem) => {
    const savedLiked = localStorage.getItem('liked_media');
    let likedArr = savedLiked ? JSON.parse(savedLiked) : [];
    const isLiked = likedArr.some((item: any) => item.id === media.id);
    
    if (isLiked) {
      likedArr = likedArr.filter((item: any) => item.id !== media.id);
    } else {
      likedArr.push(media);
    }
    
    localStorage.setItem('liked_media', JSON.stringify(likedArr));
    updateStats(); // Refresh stats
    alert(isLiked ? 'Von Favoriten entfernt' : 'Zu Favoriten hinzugefügt');
  };

  const closePlayer = () => {
    setPlayerOpen(false);
    setCurMedia(null);
  };

  return (
    <>
      {/* Media type tabs */}
      <div className="mtype-bar">
        <button 
          className={`mtype-tab ${mediaType === 'video' ? 'active' : ''}`} 
          onClick={() => setMediaType('video')}
        >
          <Video className="w-[17px] h-[17px]" />
          Videos <span className="mtcnt">{stats.videos}</span>
        </button>
        <button 
          className={`mtype-tab ${mediaType === 'image' ? 'active' : ''}`} 
          onClick={() => setMediaType('image')}
        >
          <Image className="w-[17px] h-[17px]" />
          Bilder <span className="mtcnt">{stats.images}</span>
        </button>
        <button 
          className={`mtype-tab ${mediaType === 'sound' ? 'active' : ''}`} 
          onClick={() => setMediaType('sound')}
        >
          <Volume2 className="w-[17px] h-[17px]" />
          Sounds <span className="mtcnt">{stats.sounds}</span>
        </button>
      </div>

      {/* Chips / filter bar */}
      <div id="chips" className="chips">
        <div className="chip active">Neueste</div>
        <button className="chip">Name</button>
        <button className="chip">Größe</button>
      </div>

      <div style={{ padding: '20px 24px 60px' }}>
        {/* Stats row */}
        {mediaType === 'video' && !searchQuery && !activeCategory && (
          <div id="stats-row" className="stats-row">
            <div className="stat-tile">
              <div className="stat-val">{stats.videos}</div>
              <div className="stat-lbl flex items-center gap-1"><Video className="w-3 h-3" /> Videos</div>
            </div>
            <div className="stat-tile">
              <div className="stat-val">{stats.total}</div>
              <div className="stat-lbl flex items-center gap-1"><Info className="w-3 h-3" /> Gesamt</div>
            </div>
            <div className="stat-tile clickable">
              <div className="stat-val">{stats.liked}</div>
              <div className="stat-lbl flex items-center gap-1"><Heart className="w-3 h-3" /> Favoriten</div>
            </div>
            <div className="stat-tile clickable">
              <div className="stat-val">{stats.playlists}</div>
              <div className="stat-lbl flex items-center gap-1"><ListMusic className="w-3 h-3" /> Playlists</div>
            </div>
            <div className="stat-tile clickable">
              <div className="stat-val">{stats.categories}</div>
              <div className="stat-lbl flex items-center gap-1"><LayoutGrid className="w-3 h-3" /> Kategorien</div>
            </div>
            <div className="stat-tile clickable">
              <div className="stat-val">{stats.folders}</div>
              <div className="stat-lbl flex items-center gap-1"><Folder className="w-3 h-3" /> Ordner</div>
            </div>
          </div>
        )}

        <div className="section-hd" style={{ marginBottom: '16px' }}>
          <div id="sec-title" className="section-title flex items-center gap-2">
            {searchQuery ? <Search className="w-5 h-5" /> : mediaType === 'video' ? <Video className="w-5 h-5" /> : mediaType === 'image' ? <Image className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            {searchQuery ? `Suche: "${searchQuery}"` : mediaType === 'video' ? 'Videos' : mediaType === 'image' ? 'Bilder' : 'Sounds'} 
            <span className="cnt">{mediaList.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="spin-wrap">
            <div className="spinner"></div>
          </div>
        ) : mediaList.length > 0 ? (
          <div id="vgrid" className="vgrid">
            {mediaList.map(item => (
              <MediaCard 
                key={item.id} 
                media={item} 
                onClick={handleMediaClick}
                onContextMenu={(e) => e.preventDefault()}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <div className="empty-ico"><Search className="w-12 h-12 mb-4" /></div>
            <h3>Keine Medien gefunden</h3>
            <p>Versuche es mit einem anderen Filter oder einer anderen Suche.</p>
          </div>
        )}
      </div>

      {/* Player Overlay */}
      {playerOpen && curMedia && (
        <div id="player-ov" className="overlay">
          <div className="pbox">
            <div className="pleft">
              <div className="pvideo-wrap">
                {curMedia.type === 'video' ? (
                  <video id="pvideo" controls playsInline src={curMedia.url} autoPlay></video>
                ) : curMedia.type === 'image' ? (
                  <img src={curMedia.url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt={curMedia.title} />
                ) : (
                  <audio controls src={curMedia.url} autoPlay style={{ width: '80%', margin: 'auto' }}></audio>
                )}
              </div>
              <div className="pleft-body">
                <div className="ptitle">{curMedia.title}</div>
                <div className="pmeta-row">
                  <span className="pmeta-cat">{curMedia.signature || 'Allgemein'}</span>
                  <span className="dot">·</span>
                  <span>{curMedia.type}</span>
                </div>
                <div className="pdesc" style={{ display: curMedia.description ? 'block' : 'none' }}>
                  {curMedia.description}
                </div>
              </div>
            </div>
            <div className="pright">
              <div className="pright-hd">
                <div className="pnav-row">
                  <button className="pnav-btn" disabled>✕</button>
                </div>
                <div className="pwin-row">
                  <button className="pwin-btn close" onClick={closePlayer}>✕</button>
                </div>
              </div>
              <div className="pright-title">{curMedia.title}</div>
              <div className="pright-actions">
                <button className="pact-btn" onClick={() => toggleFavorite(curMedia)}>
                  <span className="pact-ico"><Heart className="w-4 h-4" /></span>
                  Favorit
                </button>
                <button className="pact-btn" onClick={() => alert('Bearbeiten-Modus wird geladen')}>
                  <span className="pact-ico"><Settings className="w-4 h-4" /></span>
                  Bearbeiten
                </button>
                <button className="pact-btn" onClick={() => alert('Zu Playlist hinzugefügt')}>
                  <span className="pact-ico"><ListMusic className="w-4 h-4" /></span>
                  Zur Playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
