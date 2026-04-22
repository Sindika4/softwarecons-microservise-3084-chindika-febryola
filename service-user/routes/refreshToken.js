const express = require('express');
const router = express.Router();

const tokenHandler = require('./handler/refresh-tokens');

router.post('/', tokenHandler.create);
router.get('/', tokenHandler.getToken);

module.exports = router;