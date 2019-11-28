const Board = require('../models/Board');
const User = require('../models/User');
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
        console.log(board.users);

        const alreadyInBoard = board.users.find(user => user == userId);
        console.log(alreadyInBoard);

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
      }
    } catch (error) {
      console.log(error);

      res.status(400).send({ error });
    }
  }
};
