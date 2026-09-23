const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const env = require('../config/env');

// Helmet hardens HTTP headers (CSP, no-sniff, frameguard, etc.).
const securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // video bytes are consumed by a different origin (backend)
});

// Only the configured frontend/backend origins may call this proxy directly.
const corsPolicy = cors({
  origin: (origin, callback) => {
    if (!origin || env.allowedOrigins.length === 0 || env.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS policy'));
  },
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Range', 'X-Internal-Api-Key', 'Content-Type'],
  exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type'],
});

// Basic abuse protection: caps requests per IP within a rolling window.
const limiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'TooManyRequests', message: 'Rate limit exceeded, please try again later.' },
});

module.exports = { securityHeaders, corsPolicy, limiter };
