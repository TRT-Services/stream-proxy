import { Box, Skeleton } from '@mui/material';

export function VideoCardSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" sx={{ aspectRatio: '16 / 9', width: '100%' }} />
      <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
        <Skeleton variant="circular" width={36} height={36} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="60%" />
        </Box>
      </Box>
    </Box>
  );
}
