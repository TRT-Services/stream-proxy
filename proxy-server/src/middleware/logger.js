const morgan = require('morgan');

// Structured request logging; format includes response time for streaming latency visibility.
const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms'
);

module.exports = requestLogger;
