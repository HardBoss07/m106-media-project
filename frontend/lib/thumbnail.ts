/**
 * Extracts a thumbnail from a video URL client-side using a canvas element.
 * This approach is lighter than FFmpeg WASM and works well for simple frame extraction.
 * 
 * @param videoUrl The URL of the video to extract a frame from.
 * @returns A data URL of the extracted frame (PNG) or null if failed.
 */
export const extractThumbnail = async (videoUrl: string): Promise<string | null> => {
  return new Promise((resolve) => {
    // Create a temporary video element
    const video = document.createElement('video');
    
    // Set crossOrigin to anonymous to avoid tainted canvas issues
    // The backend must support CORS and return Access-Control-Allow-Origin
    video.crossOrigin = 'anonymous';
    
    // We only need the first frame
    video.preload = 'metadata';
    
    // Use a small timeout to prevent hanging if video fails to load
    const timeoutId = setTimeout(() => {
      console.warn('Thumbnail extraction timed out for:', videoUrl);
      video.onloadeddata = null;
      video.onerror = null;
      resolve(null);
    }, 5000);

    video.onloadeddata = () => {
      // Seek to 1 second (or start) to avoid potential black frames at 0
      video.currentTime = 1;
    };

    video.onseeked = () => {
      try {
        // Create canvas to draw the frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        // Draw current video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const thumbnailUrl = canvas.toDataURL('image/png');
        
        clearTimeout(timeoutId);
        // Cleanup
        video.onloadeddata = null;
        video.onseeked = null;
        video.onerror = null;
        
        resolve(thumbnailUrl);
      } catch (err) {
        console.error('Error drawing video frame to canvas:', err);
        resolve(null);
      }
    };

    video.onerror = (e) => {
      console.error('Error loading video for thumbnail:', videoUrl, e);
      clearTimeout(timeoutId);
      resolve(null);
    };

    video.src = videoUrl;
    video.load();
  });
};
