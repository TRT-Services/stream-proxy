const { searchVideos } = require('../services/youtubeSearch.service');

async function getSearch(req, res, next) {
  try {
    const { q, maxResults } = req.query;

    if (!q || !q.trim()) {
      const validationError = new Error('Query parameter "q" is required.');
      validationError.statusCode = 400;
      throw validationError;
    }

    const results = await searchVideos(q, maxResults ? Number(maxResults) : undefined);
    res.json({ results });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSearch };
