const Board = require('../models/Board');
const User = require('../models/User');
const Card = require('../models/Card');
const mongoose = require('mongoose');

module.exports = {
  async create(req, res) {
    const { boardId, userId } = req.body;

    try {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).send({ error: 'No user with that id.' });
        }
        const board = await Board.findById(boardId);

        const alreadyInBoard = board.users.find(user => user == userId);

        if (alreadyInBoard) {
          return res
            .status(400)
            .send({ error: 'User is already in the board.' });
        }
        board.users.addToSet(user._id);
        user.boards.addToSet(board._id);
        await board.save();
        const savedUser = await user.save();
        const response = {
          _id: savedUser._id,
          name: savedUser.name,
          profileImage: savedUser.profileImage
        };
        res.send(response);
      } else {
        console.log('not valid');

        res.status(400).send({ error: 'Not a valid ID' });
      }
    } catch (error) {
      console.log(error);

      res.status(400).send({ error: 'Something went wrong.' });
    }
  },
  async destroy(req, res) {
    const { userId, boardId } = req.params;
    try {
      const user = await User.findById(userId);
      user.boards.pull(boardId);
      await user.save();
      const board = await Board.findById(boardId);
      board.users.pull(userId);
      //Removes the user from all the cards assigned to the user
      await Card.updateMany(
        { assignedUsers: userId },
        { $pull: { assignedUsers: { $in: userId } } }
      );

      const response = await board.save();
      res.send(response);
    } catch (error) {
      res.status(400).send({ error: 'Something went wrong.' });
    }
  }
};
