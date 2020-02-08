const Comment = require('../models/Comment');
const Card = require('../models/Card');

module.exports = {
  async create(req, res) {
    const comment = new Comment({
      content: req.body.content,
      cardId: req.body.cardId,
      user: req.user._id
    });

    try {
      const card = await Card.findById(req.body.cardId);
      if (!card) {
        return res.status(400).send({ error: 'A comment needs a card' });
      }
      let savedComment = await comment.save();
      savedComment = await savedComment
        .populate({
          path: 'user',
          select: ['name', '_id']
        })
        .lean();
      const commentId = savedComment._id;
      card.comments.addToSet(commentId);
      await card.save();

      res.send(savedComment);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async destroy(req, res) {
    const userid = req.user._id;
    const { commentId } = req.params;

    try {
      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(400).send({ error: "Comment doesn't exist" });
      } else if (comment.user != userid) {
        return res.status(401).send({ error: 'Access Denied' });
      }
      const card = await Card.findById(comment.cardId);
      card.comments.pull(commentId);
      await card.save();
      const result = await comment.remove();

      if (result) {
        return res.send(`Comment with content: "${result.content}" deleted`);
      } else {
        return res.status(400).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
