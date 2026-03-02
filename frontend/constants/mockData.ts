import { MediaItem } from '../types/media';

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: 'Beautiful Sunset',
    type: 'image',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Sunset',
    category: 'Kräuter',
  },
  {
    id: '2',
    title: 'City Life',
    type: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=City+Video',
    duration: '0:45',
    category: 'Heilkunde',
  },
  {
    id: '3',
    title: 'Ambient Forest',
    type: 'audio',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Forest+Audio',
    duration: '3:20',
    category: 'Natur',
  },
  {
    id: '4',
    title: 'Abstract Shapes',
    type: 'image',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Abstract',
    category: 'Kräuter',
  },
  {
    id: '5',
    title: 'Crowd Noise',
    type: 'audio',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Crowd+Audio',
    duration: '1:15',
    category: 'Heilkunde',
  },
  {
    id: '6',
    title: 'Night Skyline',
    type: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Night+Video',
    duration: '1:30',
    category: 'Kopfschmerzen',
  },
];
