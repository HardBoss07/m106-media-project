import Sidebar from '@/components/layout/Sidebar';
import MediaCard from '@/components/UI/MediaCard';
import { searchMedia } from '@/lib/api-client';

interface PageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const query = params.q || '';
  const type = params.type || '';

  // Fetch real data from PHP Backend
  const mediaList = await searchMedia(query, type);

  return (
    <div className="flex flex-1 w-full max-w-[1920px] mx-auto overflow-hidden">
      {/* Left Sidebar (Filter) */}
      <Sidebar />

      {/* Center Gallery (Main Grid) */}
      <section className="layout-main-content">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-primary-white">Medien entdecken</h1>
            {query && (
              <p className="text-sm text-primary-text/40">
                Ergebnisse für: <span className="text-primary-accent">"{query}"</span>
              </p>
            )}
          </div>
          <div className="text-xs text-primary-text/40">
            {mediaList.length} {mediaList.length === 1 ? 'Eintrag' : 'Einträge'} gefunden
          </div>
        </div>
        
        {mediaList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaList.map((item) => (
              <MediaCard key={item.id} media={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <span className="text-2xl text-primary-text/20">?</span>
            </div>
            <h2 className="text-primary-white font-medium">Keine Medien gefunden</h2>
            <p className="text-sm text-primary-text/40 mt-1">
              Versuche es mit anderen Filtern oder einem anderen Suchbegriff.
            </p>
          </div>
        )}
      </section>

      {/* Right Sidebar (Information) */}
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
