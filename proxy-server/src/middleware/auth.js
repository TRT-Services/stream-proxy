const env = require('../config/env');

// Shared-secret auth between Spring Boot backend and this proxy (not exposed to browsers).
function requireApiKey(req, res, next) {
  const providedKey = req.header('X-Internal-Api-Key');

  if (!env.apiKey || providedKey !== env.apiKey) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Missing or invalid API key.' });
  }

  return next();
}

module.exports = requireApiKey;
