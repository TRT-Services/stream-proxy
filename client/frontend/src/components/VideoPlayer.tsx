import { useState } from 'react';
import { Box } from '@mui/material';
import { ErrorAlert } from './ErrorAlert';

interface VideoPlayerProps {
  streamUrl: string;
}

/**
 * Plain HTML5 video element - it only ever receives our backend's /api/videos/stream URL,
 * never the original upstream source, so the browser never sees youtube.com/googlevideo.com.
 */
export function VideoPlayer({ streamUrl }: VideoPlayerProps) {
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  return (
    <Box sx={{ width: '100%' }}>
      {playbackError && <ErrorAlert message={playbackError} />}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 4,
          backgroundColor: '#000',
        }}
      >
        <video
          key={streamUrl}
          controls
          width="100%"
          height="100%"
          preload="metadata"
          src={streamUrl}
          style={{ display: 'block', backgroundColor: '#000' }}
          onError={() => setPlaybackError('Unable to play this video. The source may be invalid or unreachable.')}
        />
      </Box>
    </Box>
  );
}
