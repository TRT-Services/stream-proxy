import { useQuery } from '@tanstack/react-query';
import { buildStreamUrl, isValidHttpUrl } from '../api/videoApi';

/**
 * Resolves a submitted source URL into the backend-proxied stream URL.
 * Kept as a query (rather than a raw string) so React Query drives the
 * loading/error UI states shown while the request is being prepared.
 */
export function useVideoStream(submittedUrl: string | null) {
  return useQuery({
    queryKey: ['videoStream', submittedUrl],
    queryFn: async () => {
      if (!submittedUrl || !isValidHttpUrl(submittedUrl)) {
        throw new Error('Please enter a valid http(s) video URL.');
      }
      return buildStreamUrl(submittedUrl);
    },
    enabled: submittedUrl !== null,
    retry: false,
    staleTime: Infinity,
  });
}
