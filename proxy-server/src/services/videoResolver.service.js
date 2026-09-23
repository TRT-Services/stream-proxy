const ytdl = require('@distube/ytdl-core');

const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be']);

function isYoutubeUrl(targetUrl) {
  try {
    const hostname = new URL(targetUrl).hostname.toLowerCase();
    return YOUTUBE_HOSTS.has(hostname);
  } catch {
    return false;
  }
}

/**
 * Resolves a public-facing video URL into a directly-streamable media URL.
 * YouTube watch/short URLs are resolved via ytdl-core into a googlevideo.com CDN URL;
 * any other URL is assumed to already point at a playable media resource.
 */
async function resolveStreamTarget(targetUrl) {
  if (!isYoutubeUrl(targetUrl)) {
    return { streamUrl: targetUrl, contentType: undefined, contentLength: undefined };
  }

  const info = await ytdl.getInfo(targetUrl);
  // Prefer a progressive (audio+video combined) format so a single stream can be piped as-is.
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });

  if (!format || !format.url) {
    const notFoundError = new Error('No playable format found for this YouTube video.');
    notFoundError.statusCode = 422;
    throw notFoundError;
  }

  return {
    streamUrl: format.url,
    contentType: format.mimeType ? format.mimeType.split(';')[0] : 'video/mp4',
    contentLength: format.contentLength ? Number(format.contentLength) : undefined,
  };
}

module.exports = { resolveStreamTarget, isYoutubeUrl };
