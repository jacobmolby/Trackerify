const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const { user } = req.query;
    if (!user) {
      return res.send({ error: 'No query.' });
    }
    try {
      const users = await User.find({ $text: { $search: user } })
        .limit(10)
        .select(['name', 'email', 'profileImage'])
        .lean();
      if (users.length < 1) {
        return res.send({ error: 'No users found.' });
      }
      res.send(users);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
