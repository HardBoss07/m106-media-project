import { searchMedia } from '@/lib/api-client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Tag, Share2, MoreVertical } from 'lucide-react';
import MediaPlayerControls from '@/components/UI/MediaPlayerControls';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MediaPage({ params }: PageProps) {
  const { id } = await params;
  
  // Since we don't have a single-item endpoint, we'll use our search results 
  // and filter for the specific ID. In a real-world app, a dedicated 
  // detail endpoint like getMediaById.php?id=X would be more efficient.
  const mediaList = await searchMedia();
  const media = mediaList.find((item) => item.id === id);

  if (!media) {
    notFound();
  }

  const typeLabels: Record<string, string> = {
    image: 'Bild',
    video: 'Video',
    audio: 'Audio'
  };

  return (
    <div className="flex-1 flex flex-col bg-background min-h-0">
      {/* Kopfzeile / Zurück-Button */}
      <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-primary-black/40">
        <Link 
          href="/" 
          className="p-2 rounded-full hover:bg-white/5 transition-colors text-primary-text"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-sm font-medium text-primary-white truncate max-w-md">
            {media.title}
          </h1>
          <p className="text-[10px] text-primary-text/40">Zurück zur Übersicht</p>
        </div>
      </div>

      {/* Hauptbereich */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        {/* Player-Bereich */}
        <div className="flex-1 flex flex-col bg-background relative">
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-5xl aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl relative group">
              {media.type === 'image' ? (
                <img 
                  src={media.url} 
                  className="w-full h-full object-contain"
                  alt={media.title}
                />
              ) : media.type === 'video' ? (
                <video 
                  src={media.url} 
                  controls 
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <audio 
                    src={media.url} 
                    controls 
                    className="w-3/4"
                  />
                </div>
              )}
              
              {/* Typ-Anzeige */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-xs font-medium text-primary-accent uppercase tracking-widest">
                {typeLabels[media.type] || media.type}
              </div>
            </div>
          </div>

          {/* Steuerung - Nur für Video/Audio (Mock Controls for visual) */}
          {media.type !== 'image' && (
            <MediaPlayerControls type={media.type as any} duration={media.duration} />
          )}
        </div>

        {/* Info-Seitenleiste */}
        <div className="w-full xl:w-[400px] border-l border-white/5 bg-primary-black/20 p-6 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-primary-white leading-tight">
              {media.title}
            </h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Share2 className="w-5 h-5 text-primary-text" />
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <MoreVertical className="w-5 h-5 text-primary-text" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-xs text-primary-text/60 bg-white/5 px-3 py-1.5 rounded-full">
              <Tag className="w-3.5 h-3.5 text-primary-brand" />
              {media.signature || 'Ohne Kategorie'}
            </div>
            {media.uploadDate && (
              <div className="flex items-center gap-2 text-xs text-primary-text/60 bg-white/5 px-3 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-primary-accent" />
                {new Date(media.uploadDate).toLocaleDateString('de-DE')}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-text/40">
              Beschreibung
            </h3>
            <p className="text-sm text-primary-text/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {media.description || "Keine Beschreibung verfügbar."}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-text/40 mb-4">
              Metadaten
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-[10px] text-primary-text/40 mb-1">Typ</div>
                <div className="text-sm text-primary-white font-medium capitalize">
                  {typeLabels[media.type] || media.type}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-[10px] text-primary-text/40 mb-1">Dauer</div>
                <div className="text-sm text-primary-white font-medium">{media.duration || "N/A"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
