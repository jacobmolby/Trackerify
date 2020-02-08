const Card = require('../models/Card');

module.exports = {
  //Archives a given card
  async create(req, res) {
    const { cardId } = req.body;

    try {
      const card = await Card.findOneAndUpdate(
        { _id: cardId },
        { $set: { archived: true } },
        { new: true }
      );
      res.send(card);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  //Un-Archives a given card

  async destroy(req, res) {
    const { cardId } = req.params;

    try {
      const card = await Card.findOneAndUpdate(
        { _id: cardId },
        { $set: { archived: false } },
        { new: true }
      );
      res.send(card);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
