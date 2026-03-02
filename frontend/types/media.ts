export type MediaType = 'image' | 'video' | 'audio';

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  type: MediaType;
  thumbnailUrl: string;
  duration?: string;
  category: string;
  uploadDate?: string;
}
