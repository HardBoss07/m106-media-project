export type MediaType = 'image' | 'video' | 'audio';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  thumbnailUrl: string;
  duration?: string;
  category: string;
}
