const User = require('../models/User');

module.exports = {
  async update(req, res) {
    const userId = req.user._id;
    const { hasReadWelcomeMessage } = req.body;
    try {
      await User.findByIdAndUpdate(userId, { hasReadWelcomeMessage });
      res.send({ message: 'Succes' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
