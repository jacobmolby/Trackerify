const mongoose = require('mongoose');
const Board = require('../models/Board');

module.exports = {
  async show(req, res) {
    const { board } = req.query;
    const userId = req.user._id;
    if (!board) {
      return res.send({ error: 'No query.' });
    }
    try {
      let boards;
      if (mongoose.Types.ObjectId.isValid(board)) {
        boards = await Board.find({ id: board, owner: userId })
          .select(['title'])
          .lean();
      } else {
        boards = await Board.find({
          $text: { $search: board },
          owner: userId
        })
          .limit(10)
          .select(['title owner lists'])
          .lean();
      }

      if (boards.length < 1) {
        return res.send({ error: 'No boards found.' });
      }
      res.send(boards);
    } catch (error) {
      console.log(error);

      res.status(400).send({ error });
    }
  }
};
