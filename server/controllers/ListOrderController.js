const List = require('../models/List');
const Board = require('../models/Board');
const Card = require('../models/Card');

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
      res.status(400).send({ error });
      console.log(error);
    }
  }
};
