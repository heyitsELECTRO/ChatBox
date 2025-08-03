const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');

exports.signup = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(201).json({ token, user: { id: user._id, username: user.username }, unreadCount: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const prevLogin = user.lastLogin;
    const unreadCount = await Message.countDocuments({
      room: 'general',
      timestamp: { $gt: prevLogin },
      sender: { $ne: user._id }
    });
   
    user.lastLogin = Date.now();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({
      token,
      user: { id: user._id, username: user.username },
      unreadCount
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
