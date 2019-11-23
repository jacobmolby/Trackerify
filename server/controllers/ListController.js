const List = require('../models/List');
const Board = require('../models/Board');
const Card = require('../models/Card');

module.exports = {
  async create(req, res) {
    const boardId = req.body.boardId;

    const parentBoard = await Board.findById(boardId);
    if (!parentBoard) {
      return res.status(403).send('A list needs a parent board');
    }
    const list = new List({
      boardId,
      title: req.body.title,
      color: req.body.color
    });

    try {
      const savedList = await list.save();
      const listId = savedList._id;
      parentBoard.lists.addToSet(listId);
      await parentBoard.save();
      res.send(savedList.toJSON());
    } catch (error) {
      res.status(403).send({ error });
    }
  },
  async show(req, res) {
    const list = await List.findById(req.params.id).populate('cards');
    if (!list) {
      return res.status(403).send({ error: "List doesn't exist" });
    }
    res.send(list.toJSON());
  },
  async destroy(req, res) {
    const id = req.params.id;
    const list = await List.findById(id);
    if (!list) {
      return res.status(403).send({ error: "List doesn't exist" });
    }
    try {
      const result = await List.findByIdAndDelete(id);
      //removiung the list from the board
      await Board.updateOne(
        { _id: result._doc.boardId },
        { $pullAll: { lists: [id] } }
      );

      const { deletedCount } = await Card.deleteMany({ list: id });
      const response = {
        ...result._doc,
        deletedCount
      };

      if (response) {
        return res.send(response);
      } else {
        return res.status(403).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      console.log(error);

      res.send({ error: error });
    }
  }
};
