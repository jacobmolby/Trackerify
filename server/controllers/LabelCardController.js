const Label = require('../models/Label');
const Card = require('../models/Card');

module.exports = {
  async create(req, res) {
    const { cardId, labelId } = req.body;
    // console.log(cardId, labelId);

    try {
      const card = await Card.findById(cardId);
      card.labels.addToSet(labelId);
      const response = await card.save();
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  },
  async destroy(req, res) {
    const { cardId, labelId } = req.params;
    // console.log(cardId, labelId);

    try {
      const card = await Card.findById(cardId);
      card.labels.pull(labelId);
      const response = await card.save();
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  }
};
