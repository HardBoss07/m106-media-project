'use client';

import { ListMusic, Plus } from 'lucide-react';

export default function PlaylistsPage() {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div className="section-hd" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
        <div className="section-title">
          <ListMusic className="w-6 h-6 mr-2" />
          Meine Playlists
        </div>
        <button className="btn red">
          <Plus className="w-4 h-4 mr-1" />
          Neue Playlist
        </button>
      </div>
      <div className="empty" style={{ marginTop: '60px' }}>
        <div className="empty-ico"><ListMusic className="w-12 h-12 mb-4 text-bg4" /></div>
        <h3>Keine Playlists gefunden</h3>
        <p>Erstelle Playlists, um deine Medien zu organisieren.</p>
      </div>
    </div>
  );
}
