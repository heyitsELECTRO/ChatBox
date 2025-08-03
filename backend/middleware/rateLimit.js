const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX),
  message: 'Too many requests, please try again later.'
});
