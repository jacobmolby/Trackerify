const List = require('../models/List');
const Board = require('../models/Board');

module.exports = {
  async create(req, res) {
    const boardId = req.body.boardId;

    const parentBoard = await Board.findById(boardId);
    if (!parentBoard) {
      return res.status(403).send('A list needs a parent board');
    }
    const list = new List({
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

      if (result) {
        return res.send(`List: "${result.title}" deleted`);
      } else {
        return res.status(403).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
