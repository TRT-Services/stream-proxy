const axios = require('axios');
const { pipeline } = require('stream/promises');

const PASSTHROUGH_HEADERS = ['content-type', 'content-length', 'accept-ranges', 'content-range'];

/**
 * Streams bytes from the resolved source URL straight through to the HTTP response.
 * No buffering to disk or memory beyond what Node's stream backpressure requires.
 */
async function streamVideo(req, res, target) {
  const rangeHeader = req.headers.range;

  const upstreamResponse = await axios.get(target.streamUrl, {
    responseType: 'stream',
    headers: rangeHeader ? { Range: rangeHeader } : {},
    validateStatus: (status) => status === 200 || status === 206,
  });

  const upstreamHeaders = upstreamResponse.headers;
  const statusCode = upstreamResponse.status === 206 || rangeHeader ? 206 : 200;

  res.status(statusCode);
  res.set('Accept-Ranges', 'bytes');

  PASSTHROUGH_HEADERS.forEach((headerName) => {
    if (upstreamHeaders[headerName]) {
      res.set(headerName, upstreamHeaders[headerName]);
    }
  });

  // Fall back to metadata gathered during resolution when upstream omits headers.
  if (!res.getHeader('Content-Type') && target.contentType) {
    res.set('Content-Type', target.contentType);
  }
  if (!res.getHeader('Content-Length') && target.contentLength) {
    res.set('Content-Length', String(target.contentLength));
  }

  await pipeline(upstreamResponse.data, res);
}

module.exports = { streamVideo };
