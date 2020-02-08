const List = require('../models/List');
const Card = require('../models/Card');

module.exports = {
  async update(req, res) {
    //Its for updating the listorder, should be put into its own controller when you should be able to change the title and color of a list
    const { listId, cards } = req.body;
    const updatedOrder = [];

    try {
      for (let i = 0; i < cards.length; i++) {
        //Updates the listid for the each of cards in the moved list
        const cardId = cards[i]._id;
        updatedOrder.push(cardId);
        await Card.updateOne({ _id: cardId }, { $set: { list: listId } });
      }
      const list = await List.findById(listId);
      list.cards = updatedOrder;
      const response = await list.save();

      res.send(response);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
