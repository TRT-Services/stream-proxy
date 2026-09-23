const { Router } = require('express');
const requireApiKey = require('../middleware/auth');
const { getSearch } = require('../controllers/search.controller');

const router = Router();

router.get('/search', requireApiKey, getSearch);

module.exports = router;
