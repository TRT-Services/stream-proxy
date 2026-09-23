import { createTheme, type ThemeOptions } from '@mui/material';
import type { ColorMode } from './ColorModeContext';

const YOUTUBE_RED = '#FF0000';

export function buildTheme(mode: ColorMode) {
  const base: ThemeOptions = {
    palette: {
      mode,
      primary: { main: YOUTUBE_RED },
      background:
        mode === 'dark'
          ? { default: '#0f0f0f', paper: '#181818' }
          : { default: '#f9f9f9', paper: '#ffffff' },
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Roboto", "Segoe UI", Arial, sans-serif',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: { boxShadow: 'none', borderBottom: '1px solid rgba(128,128,128,0.2)' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
    },
  };

  return createTheme(base);
}
