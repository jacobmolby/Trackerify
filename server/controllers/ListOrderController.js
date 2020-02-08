const Board = require('../models/Board');

module.exports = {
  async update(req, res) {
    const { listIds, boardId } = req.body;
    try {
      const board = await Board.findOneAndUpdate(
        { _id: boardId },
        { $set: { lists: listIds } }
      );
      res.send(board);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
