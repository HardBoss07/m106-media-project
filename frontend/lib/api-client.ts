import { MediaItem } from '../types/media';

const BACKEND_URL = 'http://localhost/backend/api/search.php';

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

    const response = await fetch(`${BACKEND_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return typed array from backend
    return data as MediaItem[];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
