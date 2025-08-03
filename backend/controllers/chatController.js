const Message = require('../models/Message');

exports.getHistory = async (req, res) => {
  const { room } = req.params;
  try {
    const messages = await Message.find({ room })
      .sort({ timestamp: 1 })
      .populate('sender', 'username');
    res.json(messages);
  } catch {
    res.status(500).json({ message: 'Cannot retrieve messages' });
  }
};

exports.getUnread = async (req, res) => {
  const { room } = req.params;
  const user = req.user;
  try {
    const unread = await Message.find({
      room,
      timestamp: { $gt: user.lastLogin },
      sender: { $ne: user._id }
    })
      .sort({ timestamp: 1 })
      .populate('sender', 'username');
    res.json({ count: unread.length, messages: unread });
  } catch {
    res.status(500).json({ message: 'Cannot retrieve unread messages' });
  }
};
