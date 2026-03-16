import { searchMedia } from '@/lib/api-client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  Heart,
  Share2,
  MoreVertical,
  FolderOpen,
  ExternalLink,
  Trash2,
  Scissors,
  Zap,
  Tag,
  Calendar
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MediaPage({ params }: PageProps) {
  const { id } = await params;
  
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
    <div className="fixed inset-0 bg-black/92 backdrop-blur-xl z-[500] flex items-center justify-center p-4 sm:p-5 overflow-y-auto font-outfit">
      <div className="w-full max-w-[1260px] flex flex-col md:flex-row bg-bg1 border border-line2 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[calc(100vh-40px)]">
        
        {/* Left Section: Player */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-black">
          <div className="relative aspect-video bg-black flex items-center justify-center group">
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
                autoPlay
                className="w-full h-full outline-none"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-bg2">
                <audio 
                  src={media.url} 
                  controls 
                  className="w-3/4 h-10 accent-red"
                />
              </div>
            )}

            {/* Top Buttons (Floating) */}
            <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-9 h-9 rounded-full bg-black/70 flex items-center justify-center text-white backdrop-blur-md border border-white/10 hover:bg-red transition-colors">
                <Scissors className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-5 md:p-6 bg-bg1 flex-1">
             <div className="flex items-center gap-2.5 text-text3 text-[0.82rem] mb-3 pb-3 border-b border-line flex-wrap">
                <span className="bg-bg3 text-text2 px-2.5 py-0.5 rounded font-semibold text-[0.78rem]">
                  {typeLabels[media.type as keyof typeof typeLabels] || media.type}
                </span>
                <span className="w-1 h-1 rounded-full bg-bg4" />
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-red" />
                  <span className="text-red font-medium">{media.signature || 'Allgemein'}</span>
                </div>
                {media.uploadDate && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-bg4" />
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(media.uploadDate).toLocaleDateString('de-DE')}</span>
                    </div>
                  </>
                )}
             </div>

             <h1 className="text-xl font-bold text-text leading-[1.35] mb-4">
               {media.title}
             </h1>

             {media.description && (
               <div className="p-4 bg-bg2 border border-line rounded-xl text-[0.875rem] leading-[1.65] text-text2">
                 {media.description}
               </div>
             )}
          </div>
        </div>

        {/* Right Section: Actions & Info */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col border-l border-line bg-bg2 overflow-y-auto">
          <div className="flex items-center justify-between p-3 border-b border-line sticky top-0 bg-bg2 z-10">
             <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg border border-line2 bg-bg3 text-text2 flex items-center justify-center hover:bg-bg4 hover:text-text disabled:opacity-30">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg border border-line2 bg-bg3 text-text2 flex items-center justify-center hover:bg-bg4 hover:text-text disabled:opacity-30">
                  <ChevronRight className="w-4 h-4" />
                </button>
             </div>
             <div className="flex gap-1">
                <Link 
                  href="/"
                  className="w-8 h-8 rounded-lg bg-bg3 text-text3 flex items-center justify-center hover:bg-red hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </Link>
             </div>
          </div>

          <div className="p-4">
             <h2 className="text-sm font-bold text-text3 uppercase tracking-wider mb-3">Aktionen</h2>
             <div className="flex flex-col gap-1">
                <button className="flex items-center gap-3 p-2.5 rounded-lg text-text2 font-semibold text-[0.85rem] hover:bg-bg3 hover:text-text transition-colors text-left group">
                  <div className="w-8 h-8 rounded-lg bg-bg3 flex items-center justify-center shrink-0 group-hover:bg-bg4">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span>Zu Favoriten hinzufügen</span>
                </button>
                <button className="flex items-center gap-3 p-2.5 rounded-lg text-text2 font-semibold text-[0.85rem] hover:bg-bg3 hover:text-text transition-colors text-left group">
                  <div className="w-8 h-8 rounded-lg bg-bg3 flex items-center justify-center shrink-0 group-hover:bg-bg4">
                    <FolderOpen className="w-4 h-4" />
                  </div>
                  <span>In Ordner anzeigen</span>
                </button>
                <button className="flex items-center gap-3 p-2.5 rounded-lg text-text2 font-semibold text-[0.85rem] hover:bg-bg3 hover:text-text transition-colors text-left group">
                  <div className="w-8 h-8 rounded-lg bg-bg3 flex items-center justify-center shrink-0 group-hover:bg-bg4">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <span>Mit App öffnen</span>
                </button>
                <button className="flex items-center gap-3 p-2.5 rounded-lg text-text2 font-semibold text-[0.85rem] hover:bg-bg3 hover:text-text transition-colors text-left group">
                  <div className="w-8 h-8 rounded-lg bg-bg3 flex items-center justify-center shrink-0 group-hover:bg-bg4">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <span>Video trimmen</span>
                </button>
                <button className="flex items-center gap-3 p-2.5 rounded-lg text-text2 font-semibold text-[0.85rem] hover:bg-bg3 hover:text-text transition-colors text-left group">
                  <div className="w-8 h-8 rounded-lg bg-bg3 flex items-center justify-center shrink-0 group-hover:bg-bg4 text-red">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-red">Komprimieren</span>
                </button>
                <div className="h-px bg-line my-1" />
                <button className="flex items-center gap-3 p-2.5 rounded-lg text-red font-semibold text-[0.85rem] hover:bg-red/10 transition-colors text-left group">
                  <div className="w-8 h-8 rounded-lg bg-bg3 flex items-center justify-center shrink-0 group-hover:bg-red/20 text-red">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <span>Löschen</span>
                </button>
             </div>
          </div>

          <div className="mt-auto p-4 border-t border-line">
            <h2 className="text-[0.72rem] font-bold text-text3 uppercase tracking-wider mb-3">Datei-Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-bg3">
                <div className="text-[0.65rem] text-text3 uppercase font-bold mb-0.5">Format</div>
                <div className="text-[0.82rem] text-text font-semibold uppercase">{media.url.split('.').pop()}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-bg3">
                <div className="text-[0.65rem] text-text3 uppercase font-bold mb-0.5">Dauer</div>
                <div className="text-[0.82rem] text-text font-semibold">{media.duration || '—'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
