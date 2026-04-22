const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Gateway aktif',
    services: {
      user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
      media: process.env.MEDIA_SERVICE_URL || 'http://localhost:8080',
    },
  });
});

module.exports = router;
