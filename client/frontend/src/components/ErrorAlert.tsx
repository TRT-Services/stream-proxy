import { Alert } from '@mui/material';

export function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      {message}
    </Alert>
  );
}
