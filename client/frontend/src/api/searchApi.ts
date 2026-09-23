import { apiClient } from '../services/apiClient';

export interface VideoSummary {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string;
}

interface SearchResponse {
  results: VideoSummary[];
}

export async function searchVideos(query: string, maxResults = 12): Promise<VideoSummary[]> {
  const response = await apiClient.get<SearchResponse>('/videos/search', {
    params: { q: query, maxResults },
  });
  return response.data.results;
}

export function buildYoutubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
