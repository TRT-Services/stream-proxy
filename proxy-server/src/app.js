const express = require('express');
const { securityHeaders, corsPolicy, limiter } = require('./middleware/security');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const streamRoutes = require('./routes/stream.routes');
const healthRoutes = require('./routes/health.routes');
const searchRoutes = require('./routes/search.routes');

const app = express();

app.use(securityHeaders);
app.use(corsPolicy);
app.use(limiter);
app.use(requestLogger);

app.use('/', healthRoutes);
app.use('/', streamRoutes);
app.use('/', searchRoutes);

// 404 handler for unknown routes.
app.use((req, res) => {
  res.status(404).json({ error: 'NotFound', message: `Route ${req.originalUrl} not found.` });
});

app.use(errorHandler);

module.exports = app;
