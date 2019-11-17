const List = require('../models/List');

module.exports = {
  async create(req, res) {
    console.log(req.user);

    const list = new List({
      title: req.body.title
    });

    try {
      const savedList = await list.save();
      res.send(savedList.toJSON());
    } catch (error) {
      res.status(403).send({ error });
    }
  },
  async show(req, res) {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(403).send({ error: "List doesn't exist" });
    }
    res.send(board.populate('cards'));
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
