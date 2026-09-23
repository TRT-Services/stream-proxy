import { useState, type FormEvent } from 'react';
import { InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [value, setValue] = useState(initialQuery);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        px: 1,
        borderRadius: 5,
      }}
    >
      <InputBase
        fullWidth
        placeholder="Search videos"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        sx={{ ml: 1, flex: 1 }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
