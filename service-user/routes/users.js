const express = require('express');
const router = express.Router();

const userHandler = require('./handler/users');

router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.post('/logout', userHandler.logout);
router.get('/', userHandler.getUsers);
router.get('/:id', userHandler.getUser);
router.put('/:id', userHandler.update);

module.exports = router;