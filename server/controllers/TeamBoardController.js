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
      res.status(400).send({ error: error.message });
    }
  },
  async destroy(req, res) {
    const { teamId, boardId } = req.params;
    try {
      const team = await Team.findByIdAndUpdate(teamId, {
        $pull: { boards: boardId }
      });

      let users = await User.find({
        teams: teamId
      }).lean();
      // console.log(users);
      users = users.filter(user => {
        return user._id.toString() !== req.user._id;
      });

      const board = await Board.findByIdAndUpdate(
        boardId,
        {
          $pullAll: { users }
        },
        { new: true }
      );

      //TODO remove teammembers from cards that they are assigned to. The code underneath doesn't work
      // await Card.updateMany(
      //   { assignedUsers: users, boardId },
      //   { $pullAll: { assignedUsers: users } }
      // );

      res.send(team);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
