const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const { teamId, userId } = req.body;

    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { teams: teamId } }
      );
      res.send(user);
    } catch (error) {
      res.status(403).send({ error });
    }
  }
};
