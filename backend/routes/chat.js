const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getHistory, getUnread } = require('../controllers/chatController');

router.get('/history/:room', auth, getHistory);
router.get('/unread/:room', auth, getUnread);

module.exports = router;





