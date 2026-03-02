import Sidebar from '@/components/layout/Sidebar';
import MediaCard from '@/components/UI/MediaCard';
import { MOCK_MEDIA } from '@/constants/mockData';

export default function Home() {
  return (
    <div className="flex flex-1 w-full max-w-[1920px] mx-auto overflow-hidden">
      {/* Left Sidebar (Filter) */}
      <Sidebar />

      {/* Center Gallery (Main Grid) */}
      <section className="layout-main-content">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-white">Discover Media</h1>
          <div className="text-xs text-primary-text/40">
            {MOCK_MEDIA.length} items found
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MEDIA.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      </section>

      {/* Right Sidebar (Section) */}
      <aside className="layout-sidebar-right">
        <div className="placeholder-box">
          <h2 className="text-lg font-semibold text-primary-white mb-2">Information/Actions</h2>
          <p className="text-sm text-primary-text/60 leading-relaxed">
            Select an item from the gallery to view more detailed metadata and available actions.
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
