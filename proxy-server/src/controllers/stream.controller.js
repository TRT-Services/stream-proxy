const { resolveStreamTarget } = require('../services/videoResolver.service');
const { streamVideo } = require('../services/stream.service');

function isValidHttpUrl(candidate) {
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

async function getStream(req, res, next) {
  try {
    const { url } = req.query;

    if (!url || !isValidHttpUrl(url)) {
      const validationError = new Error('Query parameter "url" must be a valid http(s) URL.');
      validationError.statusCode = 400;
      throw validationError;
    }

    const target = await resolveStreamTarget(url);
    await streamVideo(req, res, target);
  } catch (err) {
    next(err);
  }
}

module.exports = { getStream };
