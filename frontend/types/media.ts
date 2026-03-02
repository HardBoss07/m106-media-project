export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio'
}

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  type: MediaType | string;
  signature: string; // "Category1 > Category2"
  url: string;
  thumbnail: string;
  duration?: string;
  uploadDate?: string;
}
