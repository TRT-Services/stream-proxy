import Grid from '@mui/material/Grid2';
import type { VideoSummary } from '../api/searchApi';
import { VideoCard } from './VideoCard';

export function VideoGrid({ videos }: { videos: VideoSummary[] }) {
  return (
    <Grid container spacing={3}>
      {videos.map((video) => (
        <Grid key={video.videoId} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <VideoCard video={video} />
        </Grid>
      ))}
    </Grid>
  );
}
