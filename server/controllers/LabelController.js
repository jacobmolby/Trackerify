const Label = require('../models/Label');
const Board = require('../models/Board');

module.exports = {
  async create(req, res) {
    const { title, color, boardId } = req.body;
    const label = new Label({
      title,
      color: color || undefined
    });
    //Maybe boardId should be part of the label model
    try {
      const board = await Board.findById(boardId);
      board.labels.push(label);
      board.save();
      const savedLabel = await label.save();
      res.send(savedLabel.toJSON());
    } catch (error) {
      res.status(403).send(error);
    }
  },
  async destroy(req, res) {
    const { boardId, labelId } = req.params;

    try {
      const label = await Label.findByIdAndDelete(labelId);
      const board = await Board.findById(boardId);
      board.labels.pull(labelId);
      await board.save();

      if (label) {
        return res.send(`Label: "${label.title}" deleted`);
      } else {
        return res.status(403).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      console.log(error);

      res.send({ error: error });
    }
  }
};
