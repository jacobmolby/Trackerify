const Comment = require('../models/Comment');

module.exports = {
  async create(req, res) {
    const comment = new Comment({
      content: req.body.content,
      user: req.user._id
    });
    try {
      const savedComment = await comment.save();
      res.send(savedComment.toJSON());
    } catch (error) {
      res.status(400).send({ error });
    }
  },
  async destroy(req, res) {
    const userid = req.user._id;
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(403).send({ error: "Comment doesn't exist" });
    } else if (comment.user != userid) {
      return res.status(403).send({ error: 'Access Denied' });
    }
    try {
      const result = await Comment.findByIdAndDelete(id);

      if (result) {
        return res.send(`Comment with content: "${result.content}" deleted`);
      } else {
        return res.status(403).send({ error: 'Something went wrong' });
      }
    } catch (error) {
      res.send({ error: error });
    }
  }
};
