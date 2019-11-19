const Board = require('../models/Board');

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
      res.status(400).send({ error });
    }
  },
  async show(req, res) {
    const board = await Board.findById(req.params.id)
      .populate({
        path: 'users',
        select: ['_id', 'name', 'profileImage']
      })
      .populate({
        path: 'lists',
        // model: 'List',
        populate: {
          path: 'cards'
          // model: 'Card'
        }
      });
    if (!board) {
      return res.status(403).send({ error: "Board doesn't exist" });
    }
    res.send(board);
  },
  async destroy(req, res) {
    const id = req.params.id;
    const board = await Board.findById(id);
    if (!board) {
      return res.status(403).send({ error: "Board doesn't exist" });
    }
    try {
      const result = await Board.findByIdAndDelete(id);

      if (result) {
        return res.send(`Board: "${result.title}" deleted`);
      } else {
        return res.status(403).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
