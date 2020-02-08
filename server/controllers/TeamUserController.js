const Team = require('../models/Team.model');
const User = require('../models/User');
const Board = require('../models/Board');
const Card = require('../models/Card');

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
    //Removes user from a team
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
        //Removes user from board
        await Board.findByIdAndUpdate(board._id, {
          $pull: { users: userId }
        });
        //Removes user from cards that they are assigned to
        await Card.updateMany(
          { boardId: board._id, assignedUsers: userId },
          { $pull: { assignedUsers: userId } }
        );
      });

      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
