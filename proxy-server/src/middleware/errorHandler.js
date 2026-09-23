// Centralized error handler - must be registered last and keep 4 arguments for Express to recognize it.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    // Streaming had already started; we can only destroy the connection, not send a JSON body.
    return req.destroy(err);
  }

  const status = err.statusCode || 500;
  const errorName = err.name || 'InternalServerError';

  // eslint-disable-next-line no-console
  console.error(`[error] ${req.method} ${req.originalUrl} -> ${status} ${err.message}`);

  return res.status(status).json({
    error: errorName,
    message: err.message || 'An unexpected error occurred.',
  });
}

module.exports = errorHandler;
