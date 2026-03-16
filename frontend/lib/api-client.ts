import { MediaItem } from '../types/media';

const BASE_URL = 'http://localhost/backend/api';

/**
 * Searches media from the PHP backend.
 * @param query Search text or signature (e.g., "Heilkunde > Natur")
 * @param type Filter by type: Foto, Video, Sound
 */
export async function searchMedia(query: string = '', type: string = ''): Promise<MediaItem[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (type) params.append('type', type);

    const url = `${BASE_URL}/search.php?${params.toString()}`;
    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as MediaItem[];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}

export interface StatsData {
  total_media: number;
  total_size_mb: number;
  avg_size_kb: number;
  by_type: {
    image: number;
    video: number;
    audio: number;
    [key: string]: number;
  };
  latest_upload: string;
}

/**
 * Fetches database statistics.
 */
export async function getStats(): Promise<StatsData | null> {
  try {
    const response = await fetch(`${BASE_URL}/stats.php`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Stats fetch failed');
    return await response.json();
  } catch (error) {
    console.error("Stats failed:", error);
    return null;
  }
}
