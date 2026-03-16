import { MediaItem } from '../types/media';

// Default to port 80 if not specified, but allow easy override
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

    console.log(`Fetching: ${BACKEND_URL}?${params.toString()}`);

    const response = await fetch(`${BACKEND_URL}?${params.toString()}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Search results:', data);
    
    // Return typed array from backend
    return data as MediaItem[];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
