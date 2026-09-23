const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Builds the backend URL used as the <video> source. The browser only ever talks to our
 * own backend - the real upstream video URL is resolved server-side and never reaches the client.
 */
export function buildStreamUrl(sourceUrl: string): string {
  return `${API_BASE_URL}/videos/stream?url=${encodeURIComponent(sourceUrl)}`;
}

export function isValidHttpUrl(candidate: string): boolean {
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
