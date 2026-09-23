const axios = require('axios');
const env = require('../config/env');

const YOUTUBE_SEARCH_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

/**
 * Searches public videos via the official YouTube Data API v3 (metadata only, no scraping).
 * Requires a Google Cloud API key with the "YouTube Data API v3" enabled.
 */
async function searchVideos(query, maxResults = 12) {
  if (!env.youtubeApiKey) {
    const configError = new Error('YOUTUBE_API_KEY is not configured on the proxy server.');
    configError.statusCode = 503;
    throw configError;
  }

  const response = await axios.get(YOUTUBE_SEARCH_ENDPOINT, {
    params: {
      part: 'snippet',
      type: 'video',
      maxResults,
      q: query,
      key: env.youtubeApiKey,
    },
  });

  return response.data.items.map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
  }));
}

module.exports = { searchVideos };
