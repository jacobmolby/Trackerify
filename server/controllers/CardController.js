const Card = require('../models/Card');

module.exports = {
  async create(req, res) {
    const card = new Card({
      title: req.body.title
    });

    try {
      const savedCard = await card.save();
      res.send(savedCard.toJSON());
    } catch (error) {
      res.status(403).send({ error });
    }
  },
  async destroy(req, res) {
    const id = req.params.id;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(403).send({ error: "Card doesn't exist" });
    }
    try {
      const result = await Card.findByIdAndDelete(id);

      if (result) {
        return res.send(`Card: "${result.title}" deleted`);
      } else {
        return res.status(403).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
