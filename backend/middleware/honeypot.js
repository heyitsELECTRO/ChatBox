module.exports = (req, res, next) => {
  if (req.body.honeypot) {
    return res.status(400).json({ message: 'Bot detected' });
  }
  next();
};
