const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const honeypot = require('../middleware/honeypot');
const rateLimit = require('../middleware/rateLimit');

router.post('/signup', honeypot, rateLimit, signup);
router.post('/login', rateLimit, login);

module.exports = router;
