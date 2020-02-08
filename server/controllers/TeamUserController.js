const Team = require('../models/Team.model');
const User = require('../models/User');
const Board = require('../models/Board');

module.exports = {
  async create(req, res) {
    const { teamId, userId } = req.body;

    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { teams: teamId } }
      )
        .select('name profileImage')
        .lean();
      const team = await Team.findById(teamId).lean();
      team.boards.forEach(async board => {
        //maybe not necessary to await this operation
        await Board.findByIdAndUpdate(board._id, {
          $addToSet: { users: userId }
        });
      });
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async destroy(req, res) {
    const { teamId, userId } = req.params;

    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { teams: teamId } }
      )
        .select('name profileImage')
        .lean();

      const team = await Team.findById(teamId).lean();
      team.boards.forEach(async board => {
        //maybe not necessary to await this operation
        await Board.findByIdAndUpdate(board._id, {
          $pull: { users: userId }
        });
      });

      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
