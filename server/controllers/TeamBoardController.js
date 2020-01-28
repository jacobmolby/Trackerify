const Team = require('../models/Team.model');
const User = require('../models/User');
const Board = require('../models/Board');

module.exports = {
  async create(req, res) {
    const { teamId, boardId } = req.body;
    try {
      const team = await Team.findOneAndUpdate(
        { _id: teamId },
        { $addToSet: { boards: boardId } }
      );
      const users = await User.find({ teams: teamId }).lean();
      await Board.findByIdAndUpdate(boardId, { $addToSet: { users } });
      res.send(team);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
};
