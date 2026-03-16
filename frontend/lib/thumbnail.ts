import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export const getFFmpeg = async () => {
  if (ffmpeg) return ffmpeg;

  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
};

export const extractThumbnail = async (videoUrl: string): Promise<string | null> => {
  try {
    const ffmpeg = await getFFmpeg();
    const inputName = 'input.mp4';
    const outputName = 'output.png';

    await ffmpeg.writeFile(inputName, await fetchFile(videoUrl));

    // Extract first frame
    await ffmpeg.exec(['-i', inputName, '-ss', '00:00:01', '-frames:v', '1', outputName]);

    const data = await ffmpeg.readFile(outputName);
    const blob = new Blob([data], { type: 'image/png' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Thumbnail extraction failed:', error);
    return null;
  }
};
