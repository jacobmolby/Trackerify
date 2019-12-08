const Card = require('../models/Card');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
  async create(req, res) {
    const { cardId, userId } = req.body;

    try {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(400).send({ error: 'No user with that id.' });
        }
        const card = await Card.findById(cardId);

        const alreadyInCard = card.assignedUsers.find(user => user == userId);
        //console.log(alreadyInBoard);

        if (alreadyInCard) {
          return res
            .status(200)
            .send({ error: 'User is already assigned to the card.' });
        }
        card.assignedUsers.addToSet(user._id);
        await card.save();
        const response = {
          user: {
            _id: user._id,
            name: user.name,
            profileImage: user.profileImage
          },
          cardId: cardId,
          listId: card.list
        };
        console.log(response);

        res.send(response);
      }
    } catch (error) {
      console.log(error);

      res.status(400).send({ error });
    }
  },
  async destroy(req, res) {
    const { userId, cardId } = req.params;
    try {
      const card = await Card.findById(cardId);
      card.assignedUsers.pull(userId);
      const response = await card.save();
      res.send(response);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
};
