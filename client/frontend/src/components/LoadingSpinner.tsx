import { CircularProgress, Stack, Typography } from '@mui/material';

export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 6 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  );
}
