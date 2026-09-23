import { useQuery } from '@tanstack/react-query';
import { searchVideos } from '../api/searchApi';

export function useVideoSearch(query: string | null) {
  return useQuery({
    queryKey: ['videoSearch', query],
    queryFn: () => searchVideos(query as string),
    enabled: !!query && query.trim().length > 0,
    staleTime: 60_000,
  });
}
