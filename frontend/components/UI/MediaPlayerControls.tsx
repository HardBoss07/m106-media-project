import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Share2, MoreVertical, Calendar, Tag, ChevronLeft } from 'lucide-react';

interface MediaPlayerControlsProps {
  type: 'image' | 'video' | 'audio';
  duration?: string;
}

const MediaPlayerControls = ({ type, duration }: MediaPlayerControlsProps) => {
  return (
    <div className="w-full bg-gray-950/80 backdrop-blur-md border-t border-white/10 p-4 select-none">
      {/* Progress Bar (Mock) */}
      <div className="relative w-full h-1 bg-white/20 rounded-full mb-4 group cursor-pointer">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-primary-accent rounded-full" />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 bg-primary-accent rounded-full scale-0 group-hover:scale-100 transition-transform" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-primary-accent transition-colors">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary-accent hover:text-white transition-all">
              <Play className="w-5 h-5 fill-current ml-1" />
            </button>
            <button className="text-white hover:text-primary-accent transition-colors">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-white/70" />
            <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-white" />
            </div>
          </div>

          <div className="text-xs font-mono text-white/70">
            0:45 / {duration || '0:00'}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-white transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayerControls;
