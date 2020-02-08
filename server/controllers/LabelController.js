const Label = require('../models/Label');
const Board = require('../models/Board');
const Card = require('../models/Card');

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
      res.status(400).send({ error: error.message });
    }
  },
  async update(req, res) {
    const { labelId, color, title } = req.body;

    try {
      const label = await Label.findByIdAndUpdate(
        labelId,
        { $set: { title, color } },
        { new: true }
      ).lean();

      res.send(label);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async destroy(req, res) {
    const { labelId } = req.params;

    try {
      const label = await Label.findByIdAndDelete(labelId);
      await Board.updateMany(
        { labels: { _id: labelId } },
        { $pull: { labels: { _id: labelId } } }
      );
      await Card.updateMany(
        { labels: { _id: labelId } },
        { $pull: { labels: { _id: labelId } } }
      );

      if (label) {
        return res.send(`Label: "${label.title}" deleted`);
      } else {
        return res.status(400).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
