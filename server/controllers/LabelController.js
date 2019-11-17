const Label = require('../models/Label');

module.exports = {
  async create(req, res) {
    const label = new Label({
      title: req.body.title
    });

    try {
      const savedLabel = await label.save();
      res.send(savedLabel.toJSON());
    } catch (error) {
      res.status(403).send(error);
    }
  },
  // async show(req, res) {
  //   const list = await List.findById(req.params.id);
  //   if (!list) {
  //     return res.status(403).send({ error: "List doesn't exist" });
  //   }
  //   res.send(board.populate('cards'));
  // },
  async destroy(req, res) {
    const id = req.params.id;
    const label = await Label.findById(id);
    if (!label) {
      return res.status(403).send({ error: "Label doesn't exist" });
    }
    try {
      const result = await Label.findByIdAndDelete(id);

      if (result) {
        return res.send(`Label: "${result.title}" deleted`);
      } else {
        return res.status(403).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
