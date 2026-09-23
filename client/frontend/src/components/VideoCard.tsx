import { Avatar, Box, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { VideoSummary } from '../api/searchApi';
import { formatRelativeTime } from '../utils/formatRelativeTime';

export function VideoCard({ video }: { video: VideoSummary }) {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        backgroundColor: 'transparent',
        transition: 'transform 0.15s ease',
        '&:hover': { transform: 'translateY(-2px)' },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/watch/${video.videoId}`, { state: { video } })}
        sx={{ borderRadius: 2 }}
      >
        <CardMedia
          component="img"
          image={video.thumbnailUrl}
          alt={video.title}
          sx={{ aspectRatio: '16 / 9', borderRadius: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 16 }}>
            {video.channelTitle.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {video.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap component="div">
              {video.channelTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap component="div">
              {formatRelativeTime(video.publishedAt)}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
