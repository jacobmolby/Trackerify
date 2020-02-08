const Board = require('../models/Board');
const User = require('../models/User');
const Card = require('../models/Card');
const mongoose = require('mongoose');

module.exports = {
  async create(req, res) {
    console.log(req.body);

    const { boardId, userId } = req.body;

    try {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).send({ error: 'No user with that id.' });
        }
        const board = await Board.findById(boardId);

        const alreadyInBoard = !!board.users.find(
          user => user._id.toString() === userId
        );

        if (alreadyInBoard) {
          return res
            .status(400)
            .send({ error: 'User is already in the board.' });
        }
        board.users.addToSet(user._id);

        await board.save();
        const response = {
          _id: user._id,
          name: user.name,
          profileImage: user.profileImage
        };
        res.send(response);
      } else {
        res.status(400).send({ error: 'Not a valid ID' });
      }
    } catch (error) {
      res.status(400).send({ error: 'Something went wrong.' });
    }
  },
  async destroy(req, res) {
    const { userId, boardId } = req.params;

    try {
      const board = await Board.findById(boardId);
      board.users.pull(userId);
      //Removes the user from all the cards assigned to the user
      await Card.updateMany(
        { assignedUsers: userId, boardId },
        { $pull: { assignedUsers: { $in: userId } } }
      );

      const response = await board.save();
      res.send(response);
    } catch (error) {
      res.status(400).send({ error: 'Something went wrong.' });
    }
  }
};
