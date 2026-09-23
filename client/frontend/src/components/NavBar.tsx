import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useColorMode } from '../theme/ColorModeContext';

export function NavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode, toggleColorMode } = useColorMode();

  function handleSearch(query: string) {
    navigate(`/?q=${encodeURIComponent(query)}`);
  }

  return (
    <AppBar position="fixed" color="default" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', flexShrink: 0 }}
        >
          <PlayCircleFilledIcon color="primary" fontSize="large" />
          {!isSmallScreen && (
            <Typography variant="h6" fontWeight={700} noWrap>
              StreamProxy
            </Typography>
          )}
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <SearchBar onSearch={handleSearch} />
        </Box>

        <IconButton aria-label="toggle dark mode" onClick={toggleColorMode}>
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
