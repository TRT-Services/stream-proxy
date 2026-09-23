const { Router } = require('express');
const requireApiKey = require('../middleware/auth');
const { getStream } = require('../controllers/stream.controller');

const router = Router();

router.get('/stream', requireApiKey, getStream);

module.exports = router;
