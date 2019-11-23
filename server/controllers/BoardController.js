const Board = require('../models/Board');
const mongoose = require('mongoose');
module.exports = {
  async create(req, res) {
    const board = new Board({
      title: req.body.title,
      users: req.user._id
    });
    try {
      const savedBoard = await board.save();
      res.send(savedBoard.toJSON());
    } catch (error) {
      console.log(error);

      res.status(400).send({ error });
    }
  },
  async show(req, res) {
    const { id } = req.params;
    console.log(mongoose.Types.ObjectId.isValid(id));

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        const board = await Board.findById(id)
          .populate({
            path: 'users',
            select: ['_id', 'name', 'profileImage']
          })
          .populate({
            path: 'lists',
            // model: 'List',
            populate: {
              path: 'cards',
              // model: 'Card'
              populate: {
                path: 'comments',
                populate: {
                  path: 'user'
                }
              }
            }
          });
        if (!board) {
          return res.status(400).send({ error: "Board doesn't exist" });
        }
        res.send(board);
      } catch (error) {
        res.send(error);
      }
    } else {
      return res.status(400).send({ error: "ID isn't valid" });
    }
  },
  async destroy(req, res) {
    const id = req.params.id;
    const board = await Board.findById(id);
    if (!board) {
      return res.status(400).send({ error: "Board doesn't exist" });
    }
    try {
      const result = await Board.findByIdAndDelete(id);

      if (result) {
        return res.send(`Board: "${result.title}" deleted`);
      } else {
        return res.status(400).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
