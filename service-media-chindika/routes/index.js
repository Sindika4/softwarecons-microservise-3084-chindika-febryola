const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'Service Media - Chindika Febryola - 232410103084' 
  });
});

module.exports = router;