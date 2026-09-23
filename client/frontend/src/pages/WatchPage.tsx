import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Container, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { VideoSummary } from '../api/searchApi';
import { buildYoutubeWatchUrl } from '../api/searchApi';
import { useVideoStream } from '../hooks/useVideoStream';
import { VideoPlayer } from '../components/VideoPlayer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';
import { formatRelativeTime } from '../utils/formatRelativeTime';

export function WatchPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const video = (location.state as { video?: VideoSummary } | null)?.video;
  const sourceUrl = videoId ? buildYoutubeWatchUrl(videoId) : null;

  const { data: streamUrl, isLoading, isError, error } = useVideoStream(sourceUrl);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={2}>
        <IconButton onClick={() => navigate(-1)} aria-label="back" sx={{ alignSelf: 'flex-start' }}>
          <ArrowBackIcon />
        </IconButton>

        {isLoading && <LoadingSpinner label="Preparing stream..." />}
        {isError && <ErrorAlert message={(error as Error)?.message ?? 'Unable to load this video.'} />}
        {streamUrl && <VideoPlayer streamUrl={streamUrl} />}

        {video ? (
          <Stack spacing={1.5} sx={{ pt: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              {video.title}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.main' }}>{video.channelTitle.charAt(0).toUpperCase()}</Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {video.channelTitle}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatRelativeTime(video.publishedAt)}
                </Typography>
              </Box>
            </Stack>
            {video.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: 'pre-wrap', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {video.description}
              </Typography>
            )}
          </Stack>
        ) : (
          <Typography variant="h6">Now Playing</Typography>
        )}
      </Stack>
    </Container>
  );
}
