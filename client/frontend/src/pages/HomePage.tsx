import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { VideoGrid } from '../components/VideoGrid';
import { VideoCardSkeleton } from '../components/VideoCardSkeleton';
import { ErrorAlert } from '../components/ErrorAlert';
import { useVideoSearch } from '../hooks/useVideoSearch';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data: videos, isLoading, isError, error } = useVideoSearch(query);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack spacing={3}>
        {!query && (
          <>
            <Typography variant="h5" fontWeight={700}>
              Search for a video to get started
            </Typography>
            <Alert severity="info">Use the search bar above to find a video to play.</Alert>
          </>
        )}

        {isLoading && (
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <VideoCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {isError && <ErrorAlert message={(error as Error)?.message ?? 'Search failed.'} />}
        {videos && videos.length === 0 && <Alert severity="warning">No results found.</Alert>}
        {videos && videos.length > 0 && <VideoGrid videos={videos} />}
      </Stack>
    </Container>
  );

}
