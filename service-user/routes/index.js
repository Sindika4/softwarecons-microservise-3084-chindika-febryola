const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('service-user aktif');
});

module.exports = router;
