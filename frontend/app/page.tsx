import Sidebar from '@/components/layout/Sidebar';
import MediaCard from '@/components/UI/MediaCard';
import { MOCK_MEDIA } from '@/constants/mockData';

export default function Home() {
  return (
    <div className="flex flex-1 w-full max-w-[1920px] mx-auto overflow-hidden">
      {/* Linke Seitenleiste (Filter) */}
      <Sidebar />

      {/* Galerie (Hauptbereich) */}
      <section className="layout-main-content">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-white">Medien entdecken</h1>
          <div className="text-xs text-primary-text/40">
            {MOCK_MEDIA.length} Einträge gefunden
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MEDIA.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      </section>

      {/* Rechte Seitenleiste (Informationen) */}
      <aside className="layout-sidebar-right">
        <div className="placeholder-box">
          <h2 className="text-lg font-semibold text-primary-white mb-2">Informationen/Aktionen</h2>
          <p className="text-sm text-primary-text/60 leading-relaxed">
            Wähle ein Element aus der Galerie aus, um detaillierte Metadaten und verfügbare Aktionen anzuzeigen.
          </p>
          <div className="mt-6 w-full space-y-3">
            <div className="h-10 w-full bg-primary-brand/20 border border-primary-brand/30 rounded-lg animate-pulse" />
            <div className="h-10 w-full bg-primary-accent/20 border border-primary-accent/30 rounded-lg animate-pulse" />
          </div>
        </div>
      </aside>
    </div>
  );
}
