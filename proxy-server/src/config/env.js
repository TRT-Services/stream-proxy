require('dotenv').config();

// Centralized, validated access to environment configuration.
const env = {
  port: parseInt(process.env.PORT, 10) || 4000,
  apiKey: process.env.PROXY_API_KEY || '',
  youtubeApiKey: process.env.YOUTUBE_API_KEY || '',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
};

if (!env.apiKey) {
  // Fail fast: without an API key every request would be rejected anyway.
  // eslint-disable-next-line no-console
  console.warn('[config] PROXY_API_KEY is not set. All authenticated requests will be rejected.');
}

module.exports = env;
